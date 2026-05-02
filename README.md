# Notification System Design

## 1. Overview

This project is a full-stack notification system that fetches notifications from an external API, processes them based on priority, and displays them in a user-friendly interface.

The system includes:

* Backend API (Node.js + Express)
* Logging Middleware
* Frontend Application (React)

---

## 2. Architecture

Frontend (React) → Backend (Express API) → External Notification API

* Frontend fetches data from backend
* Backend handles authentication and data processing
* External API provides raw notifications
* Logging middleware logs events to external logging service

---

## 3. Backend Flow

1. Client sends request to:
   GET /notifications

2. Backend:

   * Calls external notifications API using access token
   * Receives raw notification data

3. Processing:

   * Applies priority sorting:
     Placement > Result > Event
   * Sorts by latest timestamp within same type
   * Selects top 10 notifications

4. Returns structured response:
   {
   "success": true,
   "data": [...]
   }

---

## 4. Frontend Flow

1. React app loads
2. Calls backend API:
   http://localhost:5000/notifications
3. Stores notifications in state
4. Displays notifications in UI

Features:

* Filter by type (Placement, Result, Event)
* Pagination (5 items per page)
* Styled UI with cards

---

## 5. Logging System

A reusable logging middleware is implemented:

Log(stack, level, package, message)

Features:

* Sends logs to external logging API
* Supports structured logging
* Used across backend routes

Example:
Log("backend", "info", "route", "Fetching notifications")

Logging ensures traceability and debugging capability.

---

## 6. Priority Logic

Notifications are sorted using:

Placement > Result > Event

Implementation:

* Priority map assigned to each type
* Higher priority appears first
* Within same type → sorted by latest timestamp

---

## 7. Pagination Logic

Frontend handles pagination:

* Items per page: 5
* Current page state maintained
* Slice used to display subset

Logic:
indexOfLast = currentPage * itemsPerPage
indexOfFirst = indexOfLast - itemsPerPage

Navigation:

* Next / Previous buttons
* Disabled at limits

---

## 8. UI Design

Frontend UI includes:

* Card-based layout
* Color-coded notification types:

  * Placement → Green
  * Result → Blue
  * Event → Orange
* Filter buttons
* Pagination controls

---

## 9. Challenges Faced

1. CORS issues between frontend and backend
   → Solved using cors middleware

2. Token expiration
   → Regenerated tokens when needed

3. API structure mismatch
   → Adjusted frontend to match backend response

4. Logging failures affecting API
   → Handled logging errors safely

---

## 10. Conclusion

This project demonstrates:

* Full-stack integration
* API handling and authentication
* Middleware usage
* Clean UI design with React
* Real-world problem-solving approach

The system is scalable, modular, and production-ready.
