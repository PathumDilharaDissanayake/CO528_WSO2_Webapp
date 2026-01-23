[CmdletBinding()]
param(
  [Parameter()]
  [string]$BaseUrl = "http://localhost:5000/api",

  [Parameter()]
  [string]$Password = "password123",

  [Parameter()]
  [string]$StudentEmail,

  [Parameter()]
  [string]$LecturerEmail,

  [Parameter()]
  [switch]$Cleanup
)

$ErrorActionPreference = 'Stop'

function Write-Step([string]$Message) {
  Write-Host "\n==> $Message" -ForegroundColor Cyan
}

function Invoke-CurlRaw {
  param(
    [Parameter(Mandatory)]
    [string]$Method,

    [Parameter(Mandatory)]
    [string]$Path,

    [Parameter()]
    [hashtable]$Headers,

    [Parameter()]
    [object]$Body,

    [Parameter()]
    [switch]$IgnoreErrors
  )

  $uri = if ($Path.StartsWith('http')) { $Path } else { "$BaseUrl$Path" }

  $args = @('-sS', '-X', $Method, $uri)

  if ($null -ne $Headers) {
    foreach ($k in $Headers.Keys) {
      $args += @('-H', "$k: $($Headers[$k])")
    }
  }

  if ($null -ne $Body) {
    $json = $Body
    if ($Body -isnot [string]) {
      $json = ($Body | ConvertTo-Json -Compress)
    }
    $args += @('-H', 'Content-Type: application/json', '-d', $json)
  }

  $output = & curl.exe @args
  $exit = $LASTEXITCODE

  if ($exit -ne 0 -and -not $IgnoreErrors) {
    throw "curl.exe failed (exit=$exit) for $Method $uri. Output: $output"
  }

  return $output
}

function Invoke-CurlJson {
  param(
    [Parameter(Mandatory)]
    [string]$Method,

    [Parameter(Mandatory)]
    [string]$Path,

    [Parameter()]
    [hashtable]$Headers,

    [Parameter()]
    [object]$Body,

    [Parameter()]
    [switch]$IgnoreErrors
  )

  $raw = Invoke-CurlRaw -Method $Method -Path $Path -Headers $Headers -Body $Body -IgnoreErrors:$IgnoreErrors

  if ([string]::IsNullOrWhiteSpace($raw)) {
    return $null
  }

  try {
    return $raw | ConvertFrom-Json
  } catch {
    # Some endpoints return plain text messages; return raw in that case.
    return $raw
  }
}

# Generate unique emails if not provided (avoids duplicate-register failures)
$suffix = (Get-Date -Format "yyyyMMddHHmmss")
if ([string]::IsNullOrWhiteSpace($StudentEmail)) { $StudentEmail = "student+$suffix@uni.edu" }
if ([string]::IsNullOrWhiteSpace($LecturerEmail)) { $LecturerEmail = "lecturer+$suffix@uni.edu" }

Write-Step "Using BaseUrl: $BaseUrl"
Write-Host "StudentEmail:  $StudentEmail"
Write-Host "LecturerEmail: $LecturerEmail"

# 1) Register users (ignore if already exists)
Write-Step "Register student"
Invoke-CurlJson -Method 'POST' -Path '/auth/register' -Body @{
  name = 'Test Student'
  email = $StudentEmail
  password = $Password
  role = 'student'
} -IgnoreErrors | Out-Null

Write-Step "Register lecturer"
Invoke-CurlJson -Method 'POST' -Path '/auth/register' -Body @{
  name = 'Test Lecturer'
  email = $LecturerEmail
  password = $Password
  role = 'lecturer'
} -IgnoreErrors | Out-Null

# 2) Login and capture tokens
Write-Step "Login student"
$studentLogin = Invoke-CurlJson -Method 'POST' -Path '/auth/login' -Body @{
  email = $StudentEmail
  password = $Password
}
$studentToken = $studentLogin.token
if ([string]::IsNullOrWhiteSpace($studentToken)) { throw "Student login did not return a token." }

Write-Step "Login lecturer"
$lecturerLogin = Invoke-CurlJson -Method 'POST' -Path '/auth/login' -Body @{
  email = $LecturerEmail
  password = $Password
}
$lecturerToken = $lecturerLogin.token
if ([string]::IsNullOrWhiteSpace($lecturerToken)) { throw "Lecturer login did not return a token." }

$studentHeaders = @{ Authorization = "Bearer $studentToken" }
$lecturerHeaders = @{ Authorization = "Bearer $lecturerToken" }

# 3) Student lists lecturers and selects the created lecturer by email
Write-Step "GET /users/lecturers (student)"
$lecturers = Invoke-CurlJson -Method 'GET' -Path '/users/lecturers' -Headers $studentHeaders
if ($null -eq $lecturers) { throw "No lecturers returned from /users/lecturers" }

$lecturer = $lecturers | Where-Object { $_.email -eq $LecturerEmail } | Select-Object -First 1
if ($null -eq $lecturer) {
  Write-Host "Warning: could not find lecturer by email in /users/lecturers output. Using first lecturer returned." -ForegroundColor Yellow
  $lecturer = $lecturers | Select-Object -First 1
}
$lecturerId = $lecturer._id
if ([string]::IsNullOrWhiteSpace($lecturerId)) { throw "Lecturer _id missing from lecturers list." }
Write-Host "Selected LecturerId: $lecturerId"

# 4) Lecturer creates a timeslot
Write-Step "POST /timeslots (lecturer creates availability)"
Invoke-CurlJson -Method 'POST' -Path '/timeslots' -Headers $lecturerHeaders -Body @{
  date = '2026-02-01'
  startTime = '10:00'
  endTime = '10:30'
} | Out-Null

# 5) List lecturer timeslots and select one unbooked slot
Write-Step "GET /timeslots/lecturer/:lecturerId"
$timeslots = Invoke-CurlJson -Method 'GET' -Path "/timeslots/lecturer/$lecturerId" -Headers $studentHeaders
if ($null -eq $timeslots) { throw "No timeslots returned for lecturer $lecturerId" }

$timeslot = $timeslots | Where-Object { $_.isBooked -eq $false } | Select-Object -First 1
if ($null -eq $timeslot) { throw "No unbooked timeslot found to book." }
$timeSlotId = $timeslot._id
Write-Host "Selected TimeSlotId: $timeSlotId"

# 6) Student books appointment
Write-Step "POST /appointments (student books)"
$bookResp = Invoke-CurlJson -Method 'POST' -Path '/appointments' -Headers $studentHeaders -Body @{
  lecturerId = $lecturerId
  timeSlotId = $timeSlotId
}
Write-Host ("Book response: " + ($bookResp | ConvertTo-Json -Compress))

# 7) Lecturer views appointments and picks the newest pending one
Write-Step "GET /appointments/lecturer (lecturer views)"
$lecturerAppointments = Invoke-CurlJson -Method 'GET' -Path '/appointments/lecturer' -Headers $lecturerHeaders
if ($null -eq $lecturerAppointments) { throw "No lecturer appointments returned." }

$appointment = $lecturerAppointments | Where-Object { $_.status -eq 'pending' } | Select-Object -First 1
if ($null -eq $appointment) {
  Write-Host "Warning: no pending appointment found; using first appointment returned." -ForegroundColor Yellow
  $appointment = $lecturerAppointments | Select-Object -First 1
}
$appointmentId = $appointment._id
if ([string]::IsNullOrWhiteSpace($appointmentId)) { throw "Appointment _id missing." }
Write-Host "Selected AppointmentId: $appointmentId"

# 8) Lecturer approves appointment
Write-Step "PUT /appointments/:id (approve)"
Invoke-CurlJson -Method 'PUT' -Path "/appointments/$appointmentId" -Headers $lecturerHeaders -Body @{ status = 'approved' } | Out-Null

# 9) Lecturer completes appointment
Write-Step "PUT /appointments/:id (complete)"
Invoke-CurlJson -Method 'PUT' -Path "/appointments/$appointmentId" -Headers $lecturerHeaders -Body @{ status = 'completed' } | Out-Null

# 10) Student views appointments
Write-Step "GET /appointments/student (student views)"
$studentAppointments = Invoke-CurlJson -Method 'GET' -Path '/appointments/student' -Headers $studentHeaders
$studentAppointments | ConvertTo-Json -Depth 6

if ($Cleanup) {
  Write-Step "Cleanup: DELETE /timeslots/:id (lecturer)"
  Invoke-CurlJson -Method 'DELETE' -Path "/timeslots/$timeSlotId" -Headers $lecturerHeaders -IgnoreErrors | Out-Null
}

Write-Step "Smoke test completed successfully"
Write-Host "Tip: re-run with -Cleanup to delete the created timeslot." -ForegroundColor DarkGray
