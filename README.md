# Patient Portal

The **Patient Portal** is a healthcare microservice that allows patients to access and manage their healthcare-related information such as appointments, consultation records, and pharmacy orders.  

The system communicates with external healthcare systems through the **HAS Adapter Layer**, ensuring that all legacy-related operations are centralized, secure, and properly synchronized with the Legacy HAS.

---

# 🚀 Base URL

All Patient Portal API requests should be prefixed with the following base URL:

```text
http://localhost:6767
```

---

# 🔐 Authentication & Authorization

All protected Patient Portal endpoints require a Bearer token in the `Authorization` header:

```text
Authorization: Bearer <your_token>
```

The Patient Portal uses the centralized **Authentication and Authorization System** for:

- User Login
- JWT Authentication
- Identity Verification
- Access Control

### Authentication Flow

```text
Login → Generate Token → Access Protected Patient Portal Routes
```

### Base Authentication URL

```text
https://has-auth.onrender.com/api
```

---

## 🔑 Login User

### Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/auth/login`

### Request Body

```json
{
  "email": "patient@gmail.com",
  "password": "password123"
}
```

### Integration Flow

```text
Patient Portal
→ Authentication and Authorization System
```

---

# 🧪 Patient Portal API Endpoints

Use the following API setups to test the Patient Portal endpoints.

---

## 🧑‍⚕️ Patient Profile

### Fetch Patient Profile

Retrieves the authenticated patient's profile information.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/patient/profile`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

## 📅 Appointments

### Fetch Upcoming Patient Appointments

Retrieves all upcoming appointments of the authenticated patient.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/patient`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

### Fetch Available Doctors

Retrieves available doctors for a specific date.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/doctors?date=2026-05-20`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

### Fetch Doctor Schedule

Retrieves the available schedule of a specific doctor.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/appointments/doctors/:doctorId/schedule?date=2026-05-20`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

### Schedule Appointment

Creates and schedules a new appointment.

#### Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/appointments/schedule`

#### Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "doctorId": "doctor123",
  "date": "2026-05-20",
  "time": "10:00 AM",
  "reason": "General Consultation"
}
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Online Appointment System
→ Legacy System
```

---

## 🩺 Consultations

### Fetch Consultation History

Retrieves consultation and appointment history records of the authenticated patient.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/patient/consultations`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

### Fetch Consultation Summary

Retrieves consultation summaries including diagnosis, prescriptions, and doctor notes.

#### Endpoint

- **Method:** `GET`
- **URL:** `http://localhost:6767/api/patient/consultations`

#### Headers

```text
Authorization: Bearer <your_token>
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Legacy System
```

---

## 💊 Pharmacy

### Place Pharmacy Order

Creates a pharmacy order request.

#### Endpoint

- **Method:** `POST`
- **URL:** `http://localhost:6767/api/pharmacy/order`

#### Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

#### Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "medicine": "Paracetamol",
  "quantity": 2
}
```

### Integration Flow

```text
Patient Portal
→ Adapter Layer
→ Pharmacy Management System
→ Legacy System
```

---

# 🔗 Integration Requirements

## Adapter Layer

The Patient Portal retrieves and synchronizes healthcare-related data through the HAS Adapter Layer.

### Connected Service

```env
ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter
```

### Responsibilities

- Patient Profile Retrieval
- Consultation History Retrieval
- Appointment Management
- Pharmacy Order Integration
- Legacy System Synchronization

---

## Authentication and Authorization System

Used for centralized authentication and identity verification.

### Connected Service

```env
AUTH_SYSTEM_URL=https://has-auth.onrender.com/api
```

### Responsibilities

- Login Authentication
- JWT Token Validation
- Identity Verification
- Access Control

---

# ⚠️ Constraints

## Independent System

The Patient Portal operates as an independent microservice with its own:

- Controllers
- Routes
- Middleware
- Services

---

## Error Handling

The system handles failures from integrated systems using centralized middleware.

### Middleware

```text
errorMiddleware.js
```

### Example Error Response

```json
{
  "success": false,
  "message": "Integrated system unavailable or internal server error"
}
```

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

## Start Development Server

```bash
npm run dev
```

## Start Production Server

```bash
npm start
```

---

# 📦 Standard Response Format

All responses from the Patient Portal follow a standardized JSON structure.

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 🚦 Common Status Codes

| Code | Status | Description |
| --- | --- | --- |
| **200** | OK | Request succeeded |
| **201** | Created | Resource successfully created |
| **400** | Bad Request | Validation error |
| **401** | Unauthorized | Missing or invalid token |
| **403** | Forbidden | Access denied |
| **404** | Not Found | Resource not found |
| **500** | Server Error | Internal server error |
