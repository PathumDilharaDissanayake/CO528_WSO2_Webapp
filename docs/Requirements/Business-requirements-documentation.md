# Business Requirements Document: Lecturer Appointment Booking System - DECP

## 1. Executive Summary

* **Business Problem:** Educational institutions face significant inefficiencies in coordinating appointment scheduling between students and lecturers. The traditional methods—email exchanges, physical sign-up sheets, or ad-hoc office visits—result in scheduling conflicts, missed appointments, wasted time, and frustration for both parties. Lecturers spend valuable time managing their availability manually, while students struggle to find convenient meeting times, often requiring multiple back-and-forth communications.

* **Proposed Solution:** A centralized web-based appointment booking platform that enables lecturers to publish their available time slots and allows students to self-service book appointments. The system automates the scheduling workflow, provides real-time availability visibility, and implements an approval process that gives lecturers control over their commitments while reducing administrative overhead.

## 2. Business Objectives & Goals

* **Objective 1:** Eliminate manual scheduling overhead by providing a self-service booking platform that reduces email/phone coordination between students and lecturers.

* **Objective 2:** Improve appointment attendance rates by providing clear confirmation workflows, status visibility, and automated notifications that ensure both parties are informed of appointment details.

* **Objective 3:** Maximize lecturer time utilization by enabling structured availability management, preventing double-bookings, and providing visibility into appointment demand patterns.

* **Objective 4:** Enhance student experience by providing 24/7 access to lecturer availability, reducing wait times for securing appointments, and enabling appointment management from any device.

* **Objective 5:** Provide institutional oversight through centralized tracking of appointment data, enabling analysis of student-lecturer engagement patterns and resource allocation decisions.

## 3. Project Scope

### In Scope
* **User Account Management:** Registration and authentication for students and lecturers with role-based access control
* **Availability Management:** Lecturers can create, view, and delete available time slots
* **Appointment Booking:** Students can browse lecturers, view availability, and book appointments
* **Appointment Lifecycle Management:** Full workflow support for pending, approved, rejected, cancelled, and completed states
* **Approval Workflow:** Lecturers can approve or reject appointment requests
* **Cancellation Handling:** Students can cancel appointments; cancelled slots become available again
* **Dashboard & Reporting:** Role-specific dashboards showing appointment statistics and recent activity
* **Real-time Notifications:** Event-driven notification system for appointment status changes
* **Search & Discovery:** Students can search and filter lecturers by name or email

### Out of Scope
* **Calendar Integration:** No synchronization with external calendars (Google Calendar, Outlook)
* **Video Conferencing Integration:** No built-in virtual meeting links (Zoom, Teams)


## 4. Stakeholders & Users

* **Students:** Primary end users who use the system to discover available lecturers, view their availability, book appointments for academic consultations, and manage their scheduled meetings. Their key success metrics are ease of booking and reduced time to secure appointments.

* **Lecturers:** Service providers who use the system to publish their availability, review incoming appointment requests, approve or reject bookings based on their capacity, and track their scheduled consultations. Their key success metrics are reduced scheduling overhead and better control over their time.

* **System Administrators:** Manage user accounts, monitor system health, access analytics, and handle escalated issues. Their key success metrics would be system uptime and user satisfaction.

## 5. Business Rules & Logic

### User & Authentication Rules
* **Rule 1:** All users must provide a valid email address in standard format during registration.
* **Rule 2:** User passwords must be a minimum of 6 characters in length.
* **Rule 3:** Each email address can only be associated with one account (unique constraint).
* **Rule 4:** Users must select their role (student or lecturer) at registration; roles cannot be changed post-registration.
* **Rule 5:** All protected operations require authentication via valid session token.

### Time Slot Management Rules
* **Rule 6:** Only users with the "lecturer" role can create time slots.
* **Rule 7:** Time slot end time must be after the start time (no zero-duration or negative-duration slots).
* **Rule 8:** Lecturers can only delete their own time slots; they cannot modify or delete other lecturers' slots.
* **Rule 9:** A time slot that has been booked cannot be deleted; it must remain until the associated appointment is cancelled or completed.
* **Rule 10:** Each time slot can only be associated with one appointment (one-to-one relationship).

### Appointment Booking Rules
* **Rule 11:** Only users with the "student" role can create appointment bookings.
* **Rule 12:** Students can only book time slots that are currently available (not already booked).
* **Rule 13:** Students can only book future time slots; past dates are not available for booking.
* **Rule 14:** The selected time slot must belong to the specified lecturer (validation against mismatched data).
* **Rule 15:** Upon successful booking, the time slot is immediately marked as unavailable to prevent double-booking.

### Appointment Lifecycle Rules
* **Rule 16:** New appointments are created with "pending" status by default.
* **Rule 17:** Only lecturers can change appointment status to "approved," "rejected," or "completed."
* **Rule 18:** Only students can change appointment status to "cancelled."
* **Rule 19:** Users can only modify appointments they are party to (students: their bookings; lecturers: bookings for their slots).
* **Rule 20:** Only pending appointments can be approved.
* **Rule 21:** Only pending appointments can be rejected.
* **Rule 22:** Only pending or approved appointments can be cancelled.
* **Rule 23:** Only approved appointments can be marked as completed.
* **Rule 24:** When an appointment is cancelled or rejected, the associated time slot becomes available again for new bookings.

### Authorization Rules
* **Rule 25:** Students cannot access lecturer management features (time slot creation, appointment approval).
* **Rule 26:** Lecturers cannot access student booking features (appointment creation for other lecturers).
* **Rule 27:** Users are automatically redirected to their role-appropriate dashboard after login.

## 6. High-Level Process Flow

### Student Appointment Booking Journey
1. **Registration/Login:** Student creates an account or logs into existing account with email and password.
2. **Lecturer Discovery:** Student browses the list of available lecturers, optionally using search to filter by name or email.
3. **Availability Review:** Student selects a lecturer and views their published available time slots, filtered to show only future, unbooked slots.
4. **Appointment Request:** Student selects a desired time slot and submits a booking request.
5. **Confirmation:** System confirms the booking, marks the time slot as booked, and creates a pending appointment record.
6. **Await Approval:** Student monitors their appointments dashboard for status updates.
7. **Notification Receipt:** Student receives notification when lecturer approves or rejects the request.
8. **Appointment Attendance:** If approved, student attends the appointment at the scheduled time.
9. **Completion/Cancellation:** Appointment concludes (marked complete by lecturer) or student cancels if unable to attend.

### Lecturer Availability & Appointment Management Journey
1. **Login:** Lecturer logs into the system with credentials.
2. **Availability Setup:** Lecturer navigates to time slot management and creates available appointment windows by specifying date, start time, and end time.
3. **Request Review:** Lecturer monitors dashboard for incoming appointment requests from students.
4. **Decision Making:** Lecturer reviews pending requests and approves or rejects each based on their discretion.
5. **Appointment Delivery:** Lecturer conducts approved appointments at scheduled times.
6. **Completion Recording:** Lecturer marks completed appointments to maintain accurate records.
7. **Ongoing Management:** Lecturer removes unused time slots or creates new availability as needed.

## 7. Financial & Market Context (Human Input Required)

* **Target Market:** Higher education institutions in Sri Lanka with 500+ students /Individual departments within large universities needing standalone scheduling solutions.

* **Expected ROI/Success Metrics:** Reduce average time to book an appointment from 3 days to same-day," 

* **Revenue Model:** SaaS subscription per institution

---

