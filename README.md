# Patient Portal

The **Patient Portal** is an independent healthcare microservice that allows patients to access and manage healthcare-related information such as patient profiles, appointments, consultation summaries, and pharmacy orders.

The system securely communicates with integrated healthcare systems through the **Hospital Appointment System (HAS) Adapter Layer** while using the centralized **Authentication and Authorization System** for login authentication and identity verification.

---

# 🚀 Base URL

All Patient Portal API requests should use the following base URL:

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
Hospital Appointment System (HAS) Adapter Layer
    ↓
Legacy System
```

---

# 🔐 Authentication & Authorization

The Patient Portal uses JWT-based authentication through the centralized Authentication and Authorization System.

All protected routes require a Bearer Token in the request headers.

---

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
→ Authentication & Authorization System
```

---

# 🧑‍⚕️ Patient Profile

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
→ HAS Adapter Layer
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
→ HAS Adapter Layer
→ Hospital Appointment System
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
→ HAS Adapter Layer
→ Hospital Appointment System
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
→ HAS Adapter Layer
→ Hospital Appointment System
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
→ HAS Adapter Layer
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
→ HAS Adapter Layer
→ Pharmacy Management System
→ Legacy System
```

---

# 🛡️ Unauthorized Access Prevention

The system does not process requests from unauthorized users.

Protected routes use JWT middleware validation before accessing services.

---

## Middleware File

```text
authMiddleware.js
```

---

## Responsibilities

- Verify JWT token
- Reject unauthorized requests
- Attach authenticated user information to requests

---

# 🔗 System Integrations

## Authentication & Authorization System

Used for centralized authentication and identity verification.

### Connected Service

```env
AUTH_SYSTEM_URL=https://has-auth.onrender.com/api
```

---

## Hospital Appointment System (HAS) Adapter Layer

Used to retrieve and synchronize healthcare-related data from integrated systems.

### Connected Service

```env
ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter
```

---

## Hospital Appointment System (HAS)

The Patient Portal communicates with the Hospital Appointment System through the HAS Adapter Layer for:

- Fetching upcoming appointments
- Fetching appointment history
- Scheduling appointments

---

## Pharmacy Management System

The Patient Portal communicates with the Pharmacy Management System through the HAS Adapter Layer for:

- Pharmacy order creation
- Pharmacy-related transaction handling

---

# ⚠️ Error Handling

The system handles failures from integrated systems using centralized middleware.

## Middleware File

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

## Success Response

```json
{
  "success": true
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

| Code    | Status                | Description                       |
| ------- | --------------------- | --------------------------------- |
| **200** | OK                    | Request succeeded                 |
| **201** | Created               | Resource successfully created     |
| **401** | Unauthorized          | Missing or invalid token          |
| **500** | Internal Server Error | Server or integrated system error |

---

# 📚 Functional Requirements Coverage

The current implementation supports the following functional requirements:

- Fetch patient profile
- Fetch all upcoming appointments
- Fetch all appointment history
- Fetch consultation summary for each appointment
- Schedule an appointment
- Place a pharmacy order
- Prevent unauthorized access

---

# ✅ Current System Status

The Patient Portal is currently aligned with:

- Functional Requirements
- Integration Requirements
- System Constraints
- JWT Authentication Flow
- HAS Adapter Layer Communication Pattern
- Error Handling Standards
