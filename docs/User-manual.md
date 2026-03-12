# User Manual: Lecturer Appointment Booking System (AppointBook)

## 1. Welcome & Getting Started

### Overview
AppointBook is an easy-to-use appointment scheduling system designed for educational institutions. The application allows:

- **Students** to browse available lecturers, view their free time slots, and book appointments
- **Lecturers** to set their availability and manage appointment requests from students

The system provides a clean, modern interface that works on both desktop computers and mobile devices, with support for light and dark themes.

---

### Creating Your Account

If you don't have an account yet, follow these steps to register:

1. Open the application in your web browser.
2. On the login page, click the **"Sign up"** link below the sign-in button.
3. Fill out the registration form with the following information:
   * **Full Name:** Enter your complete name (minimum 2 characters)
   * **Email:** Enter your university or institutional email address
   * **Password:** Create a secure password (minimum 6 characters)
   * **Confirm Password:** Re-enter your password to confirm
   * **Role:** Select your role from the dropdown menu:
     - Choose **"Student"** if you want to book appointments with lecturers
     - Choose **"Lecturer"** if you want to offer appointment slots to students
4. Click the **"Create Account"** button.
5. Upon successful registration, you will see a confirmation message and be redirected to the login page.

[INSERT SCREENSHOT HERE]

---

### Logging Into Your Account

1. Open the application in your web browser.
2. On the login page, enter your credentials:
   * **Email:** Your registered email address
   * **Password:** Your account password
3. Click the **"Sign In"** button.
4. After successful login, you will be automatically redirected to your dashboard based on your role (Student Dashboard or Lecturer Dashboard).

[INSERT SCREENSHOT HERE]

---

### Logging Out

To sign out of your account:
1. Look for the **logout icon** (arrow pointing right) in the top-right corner of the navigation bar.
2. Click the logout icon.
3. You will see a confirmation message "Logged out successfully" and be redirected to the login page.

---

## 2. Navigating the Interface

After logging in, you'll see a navigation bar at the top of the screen. The menu options depend on whether you're a student or lecturer.

### For Students

The main menu includes:
* **Dashboard** - Your home page with appointment statistics and quick actions
* **Lecturers** - Browse and search for available lecturers
* **My Appointments** - View and manage all your booked appointments

[INSERT SCREENSHOT HERE]

### For Lecturers

The main menu includes:
* **Dashboard** - Your home page with statistics and pending requests
* **Time Slots** - Create and manage your available appointment times
* **Appointments** - View and manage all student appointment requests

[INSERT SCREENSHOT HERE]

### Dashboard Overview

**Student Dashboard displays:**
- **Statistics cards** showing:
  - Total Appointments (all your appointments)
  - Pending (appointments awaiting lecturer approval)
  - Approved (confirmed appointments)
  - Completed (past appointments that were attended)
- **Recent Appointments** - Quick view of your latest bookings
- **Available Lecturers** - Quick access to browse lecturers
- **Notifications** - Recent system updates

**Lecturer Dashboard displays:**
- **Statistics cards** showing:
  - Total Appointments (all appointment requests)
  - Pending Requests (appointments needing your action)
  - Total Time Slots (all slots you've created)
  - Available Slots (unbooked time slots)
- **Pending Appointment Requests** - Quick approve/reject actions
- **Notifications** - Recent booking alerts

### Theme Toggle

The application supports both light and dark modes:
1. Look for the **sun/moon icon** in the top-right corner of the navigation bar.
2. Click the icon to switch between light and dark themes.
3. Your preference is saved automatically.

---

## 3. Core Workflows

### 3.1 How to Book an Appointment (For Students)

Follow these steps to schedule an appointment with a lecturer:

#### Step 1: Browse Lecturers
1. Click **"Lecturers"** in the navigation menu.
2. You'll see a list of all available lecturers with their names and email addresses.
3. Use the **search box** to find a specific lecturer by typing their name or email.
4. The number of results is shown below the search box (e.g., "5 lecturers found").

[INSERT SCREENSHOT HERE]

#### Step 2: View Available Time Slots
1. Find the lecturer you want to meet.
2. Click the **"Book Appointment"** button on their card.
3. You'll be taken to the booking page showing:
   - The lecturer's profile information (name and email)
   - A list of their available time slots

[INSERT SCREENSHOT HERE]

#### Step 3: Select a Time Slot
1. Browse through the available time slots, which show:
   - **Date** (e.g., "Mon, Mar 15, 2026")
   - **Time range** (e.g., "10:00 - 10:30")
2. Click on your preferred time slot to select it. The selected slot will be highlighted.
3. To change your selection, click on a different time slot.

#### Step 4: Confirm Your Booking
1. After selecting a time slot, a summary panel appears at the bottom of the screen.
2. Review your selected date and time.
3. Click the **"Book Appointment"** button.
4. You'll see a success message: "Appointment booked successfully!"
5. You'll be automatically redirected to your Appointments page.

[INSERT SCREENSHOT HERE]

> **Note:** Your appointment will have a "Pending" status until the lecturer approves it.

---

### 3.2 How to Manage Your Appointments (For Students)

#### Viewing Your Appointments
1. Click **"My Appointments"** in the navigation menu.
2. You'll see a list of all your appointments, each showing:
   - Lecturer's name
   - Appointment date and time
   - Status badge (Pending, Approved, Rejected, Cancelled, or Completed)

#### Filtering Appointments
1. Use the **status dropdown** at the top of the page to filter appointments:
   - All Status (shows everything)
   - Pending (awaiting approval)
   - Approved (confirmed)
   - Rejected (declined by lecturer)
   - Cancelled (cancelled by you)
   - Completed (past appointments)
2. The number of appointments matching your filter is displayed below the dropdown.

[INSERT SCREENSHOT HERE]

#### Cancelling an Appointment
You can cancel appointments that are either "Pending" or "Approved":
1. Find the appointment you want to cancel.
2. Click the **"Cancel"** button on the appointment card.
3. You'll see a confirmation message: "Appointment cancelled"
4. The appointment status will change to "Cancelled," and the time slot becomes available again.

> **Note:** You cannot cancel appointments that are already "Rejected" or "Completed."

---

### 3.3 How to Create Time Slots (For Lecturers)

As a lecturer, you need to create available time slots before students can book appointments with you.

#### Step 1: Navigate to Time Slots
1. Click **"Time Slots"** in the navigation menu.
2. You'll see a list of all your existing time slots (or an empty state if you haven't created any).

#### Step 2: Add a New Time Slot
1. Click the **"Add Time Slot"** button in the top-right corner.
2. A dialog window will appear with the following fields:
   * **Date:** Select a future date for the appointment slot (past dates are not allowed)
   * **Start Time:** Enter the start time (e.g., 10:00)
   * **End Time:** Enter the end time (e.g., 10:30)
3. Click the **"Create Slot"** button.
4. You'll see a success message: "Time slot created successfully"
5. The new slot appears in your list.

[INSERT SCREENSHOT HERE]

#### Deleting a Time Slot
You can delete time slots that haven't been booked yet:
1. Find the unbooked time slot you want to remove.
2. Click the **"Delete"** button (trash icon) on the time slot card.
3. A confirmation dialog will ask: "Are you sure you want to delete this time slot?"
4. Click **"OK"** to confirm.
5. You'll see a message: "Time slot deleted"

> **Important:** You cannot delete a time slot that has already been booked by a student.

---

### 3.4 How to Manage Appointment Requests (For Lecturers)

#### Viewing Appointment Requests
1. Click **"Appointments"** in the navigation menu.
2. You'll see all appointment requests from students, sorted by priority:
   - Pending requests appear first
   - Then approved, completed, rejected, and cancelled

#### Filtering Appointments
Use the **status dropdown** to filter by:
- All Status
- Pending (needs your response)
- Approved (confirmed appointments)
- Rejected (appointments you declined)
- Cancelled (cancelled by students)
- Completed (past appointments)

[INSERT SCREENSHOT HERE]

#### Approving an Appointment
1. Find a pending appointment request.
2. Review the student's name and requested time slot.
3. Click the **"Approve"** button.
4. You'll see a message: "Appointment approved"
5. The status changes to "Approved."

#### Rejecting an Appointment
1. Find a pending appointment request.
2. Click the **"Reject"** button.
3. You'll see a message: "Appointment rejected"
4. The status changes to "Rejected," and the time slot becomes available for other students.

#### Marking an Appointment as Complete
After an approved appointment has taken place:
1. Find the approved appointment.
2. Click the **"Mark Complete"** button.
3. You'll see a message: "Appointment completed"
4. The status changes to "Completed."

[INSERT SCREENSHOT HERE]

> **Quick Actions:** You can also approve or reject pending appointments directly from your Dashboard using the quick action buttons.

---

## 4. Settings & Account Management

### Profile Information
Your profile information (name, email, and role) is displayed in the navigation bar when logged in. Currently, the system does not support editing profile information after registration.

### Theme Preferences
1. Click the **sun/moon icon** in the navigation bar to toggle between light and dark modes.
2. Your preference is remembered even after logging out.

### Changing Your Password
[FEATURE NOT AVAILABLE] - Contact your system administrator if you need to reset your password.

### Deleting Your Account
[FEATURE NOT AVAILABLE] - Contact your system administrator if you need to delete your account.

---

## 5. Troubleshooting & FAQs

### Login & Registration Issues

**Q: Why am I seeing "Email is required" or "Please enter a valid email"?**
* **A:** Make sure you've entered a properly formatted email address (e.g., `yourname@university.edu`). Don't leave the email field empty.

**Q: Why does it say "Password must be at least 6 characters"?**
* **A:** Your password must contain at least 6 characters. Try creating a longer password that combines letters and numbers for better security.

**Q: Why do I see "Passwords do not match" during registration?**
* **A:** The password and confirm password fields must be exactly the same. Re-type both passwords carefully, ensuring they match character-for-character.

**Q: Why does it say "User already exists" when I try to register?**
* **A:** An account with this email address is already registered. Try logging in instead, or use a different email address to create a new account.

**Q: Why am I seeing "Invalid email or password"?**
* **A:** Either your email or password is incorrect. Double-check your credentials and try again. Remember that passwords are case-sensitive.

**Q: I'm seeing "Session expired. Please login again." Why?**
* **A:** For security, your login session expires after a period of inactivity. Simply log in again with your email and password to continue.

---

### Time Slot Issues (For Lecturers)

**Q: Why does it say "Date cannot be in the past"?**
* **A:** You can only create time slots for today or future dates. Select a date that hasn't passed yet.

**Q: Why do I see "End time must be after start time"?**
* **A:** The end time of your appointment slot must be later than the start time. For example, if start time is 10:00, end time should be something like 10:30 or 11:00.

**Q: Why can't I delete a time slot?**
* **A:** Time slots that have been booked by students cannot be deleted. If you need to cancel, ask the student to cancel their appointment first, or wait until the appointment status changes.

**Q: Why do I see "Failed to create time slot"?**
* **A:** There may be a connection issue. Check your internet connection and try again. If the problem persists, try refreshing the page.

---

### Booking Issues (For Students)

**Q: Why does it say "Please select a time slot" when I click Book?**
* **A:** You must select an available time slot before booking. Click on one of the time slot cards to select it (it will be highlighted), then click the Book button.

**Q: Why do I see "Time slot is already booked"?**
* **A:** Another student has already booked this time slot while you were viewing it. The page will refresh automatically—please select a different available time.

**Q: Why does it say "No available time slots"?**
* **A:** This lecturer hasn't created any future time slots yet, or all existing slots have been booked. Check back later or try a different lecturer.

**Q: Why can't I cancel my appointment?**
* **A:** You can only cancel appointments that are "Pending" or "Approved." Appointments that have been "Rejected," "Cancelled," or "Completed" cannot be cancelled.

---

### General Issues

**Q: Why do I see "You do not have permission to perform this action"?**
* **A:** You're trying to access a feature that's not available for your role. Students cannot access lecturer features (like creating time slots), and lecturers cannot book appointments.

**Q: Why does the page show "404 - Page Not Found"?**
* **A:** The page you're looking for doesn't exist. Use the navigation menu to return to a valid page, or click the "Go to Home" button.

**Q: Why am I seeing "Server error. Please try again later"?**
* **A:** There's a temporary problem with the server. Wait a few moments and try again. If the problem continues, contact your system administrator.

**Q: Why isn't the page loading or showing "Failed to load data"?**
* **A:** Check your internet connection. Try refreshing the page. If you're using a slow connection, the page may take longer to load.

**Q: How do I switch between light and dark mode?**
* **A:** Click the sun (☀️) or moon (🌙) icon in the top-right corner of the navigation bar to toggle between themes.

---

## Quick Reference

### Appointment Status Guide

| Status | Meaning | Who Can Change It |
|--------|---------|-------------------|
| **Pending** | Awaiting lecturer approval | Lecturer can approve/reject; Student can cancel |
| **Approved** | Confirmed by lecturer | Lecturer can mark complete; Student can cancel |
| **Rejected** | Declined by lecturer | Cannot be changed |
| **Cancelled** | Cancelled by student | Cannot be changed |
| **Completed** | Appointment finished | Cannot be changed |

### Keyboard Shortcuts

Currently, the application does not support keyboard shortcuts. Navigation is done through clicking menu items and buttons.

---

## Getting Help

If you encounter issues not covered in this manual:
1. Try refreshing your browser page
2. Clear your browser cache and cookies
3. Try using a different web browser
4. Contact your institution's IT support team

---

*Last Updated: March 2026*
*Version: 1.0*
