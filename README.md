# Patient Portal

The **Patient Portal** is an independent healthcare microservice that allows patients to access and manage healthcare-related information such as patient profiles, appointments, consultation summaries, and pharmacy orders.

The system securely communicates with external healthcare services through the **HAS Adapter Layer**, ensuring centralized integration with the Legacy HAS while maintaining service independence and modularity.

---

# 🚀 Base URL

All Patient Portal API requests should be prefixed with:

```text
http://localhost:6767
```

---

# 🏗️ System Architecture

```text
Patient Portal
    ↓
Authentication & Authorization System
    ↓
Adapter Layer
    ↓
Legacy System / Online Appointment System / Pharmacy Management System
```

---

# 🔐 Authentication & Authorization

The Patient Portal uses a centralized **Authentication and Authorization System** for:

- User Login
- JWT Authentication
- Identity Verification
- Access Control

---

## 🔑 Authentication Base URL

```text
https://has-auth.onrender.com/api
```

---

# 🔒 Protected Routes

All protected endpoints require a Bearer Token in the request headers.

## Authorization Header

```text
Authorization: Bearer <your_token>
```

---

# 🔑 Login User

Authenticates the patient and generates a JWT token.

## Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/auth/login`

---

## Request Body

```json
{
  "email": "patient@gmail.com",
  "password": "password123"
}
```

---

## Integration Flow

```text
Patient Portal
→ Authentication and Authorization System
```

---

# 🧑‍⚕️ Patient Endpoints

## Fetch Patient Profile

Retrieves the authenticated patient's profile information.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/patient/profile`

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

# 📅 Appointment Endpoints

## Fetch Upcoming Appointments

Retrieves all upcoming appointments of the authenticated patient.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/upcoming`

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

## Fetch Appointment History

Retrieves all completed and previous appointments of the authenticated patient.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/history`

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

## Fetch Available Doctors

Retrieves all available doctors for a specific date.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/doctors?date=2026-05-20`

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

## Fetch Doctor Schedule

Retrieves the available schedule of a specific doctor.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/doctors/:doctorId/schedule?date=2026-05-20`

---

## Example

```text
http://localhost:6767/api/appointments/doctors/doctor123/schedule?date=2026-05-20
```

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

## Schedule Appointment

Creates and schedules a new appointment.

### Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/appointments/schedule`

---

## Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

---

## Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "doctorId": "doctor123",
  "date": "2026-05-20",
  "time": "10:00 AM",
  "reason": "General Consultation"
}
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

# 🩺 Consultation Endpoints

## Fetch Consultation Summary Per Appointment

Retrieves the consultation summary of a specific appointment including diagnosis, prescriptions, and doctor notes.

### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/patient/consultations/:appointmentId`

---

## Example

```text
http://localhost:6767/api/patient/consultations/appointment123
```

---

## Headers

```text
Authorization: Bearer <your_token>
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

# 💊 Pharmacy Endpoints

## Place Pharmacy Order

Creates a pharmacy order request.

### Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/pharmacy/order`

---

## Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

---

## Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "medicine": "Paracetamol",
  "quantity": 2
}
```

---

## Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Pharmacy Management System
→ Legacy System
```

---

# 🔗 Integration Requirements

## Adapter Layer

The Patient Portal communicates with external healthcare systems through the HAS Adapter Layer.

### Connected Service

```env
ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter
```

---

## Responsibilities

- Patient Profile Retrieval
- Consultation Summary Retrieval
- Appointment Management
- Doctor Schedule Retrieval
- Pharmacy Order Integration
- Legacy System Synchronization

---

# 🔐 Authentication and Authorization System

Used for centralized authentication and user identity verification.

## Connected Service

```env
AUTH_SYSTEM_URL=https://has-auth.onrender.com/api
```

---

## Responsibilities

- Login Authentication
- JWT Token Generation
- JWT Token Validation
- Access Control
- Identity Verification

---

# 🛡️ Middleware

## Authentication Middleware

Protected routes use JWT middleware validation before accessing services.

### Middleware File

```text
authMiddleware.js
```

---

## Responsibilities

- Verify JWT Token
- Reject Unauthorized Requests
- Attach Authenticated User Information to Requests

---

## Error Middleware

Handles failures and unavailable integrated services using centralized error handling.

### Middleware File

```text
errorMiddleware.js
```

---

## Example Error Response

```json
{
  "success": false,
  "message": "Integrated system unavailable or internal server error"
}
```

---

# ⚠️ Constraints

## Independent System

The Patient Portal operates as an independent healthcare microservice with its own:

- Controllers
- Services
- Routes
- Middleware
- Environment Configuration

---

## Integrated System Failure Handling

The system gracefully handles errors when integrated services become unavailable.

---

## No Direct Legacy System Access

The Patient Portal does not directly communicate with the Legacy System.

### Allowed Communication Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

# 🛠️ Environment Variables

```env
PORT=6767

JWT_SECRET=wkzg15151515@

AUTH_SYSTEM_URL=https://has-auth.onrender.com/api

ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter
```

---

# ▶️ Running the System

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Start Production Server

```bash
npm start
```

---

# 📦 Standard Response Format

All Patient Portal responses follow a standardized JSON structure.

---

## Success Response

```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

---

## Example Success Responses

### Profile Response

```json
{
  "success": true,
  "profile": {}
}
```

### Appointment Response

```json
{
  "success": true,
  "appointments": []
}
```

### History Response

```json
{
  "success": true,
  "history": []
}
```

### Consultation Summary Response

```json
{
  "success": true,
  "summary": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🚦 Common HTTP Status Codes

| Code | Status | Description |
| --- | --- | --- |
| **200** | OK | Request succeeded |
| **201** | Created | Resource successfully created |
| **400** | Bad Request | Validation error |
| **401** | Unauthorized | Missing or invalid token |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource not found |
| **500** | Internal Server Error | Server or integrated system error |

---

# 📚 Functional Requirements Coverage

The current implementation fully supports the following Patient Portal functional requirements:

- Fetch patient profile
- Fetch upcoming appointments
- Fetch appointment history
- Fetch consultation summary per appointment
- Schedule appointments
- Place pharmacy orders
- Prevent unauthorized access

---

# ✅ Current System Status

The Patient Portal is currently aligned with:

- Functional Requirements
- Integration Requirements
- System Constraints
- Microservice Architecture
- JWT Authentication Flow
- Adapter Layer Communication Pattern
- Error Handling Standards