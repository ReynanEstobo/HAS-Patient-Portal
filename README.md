# Patient Portal

A system that allows patients to view their personal information, appointments, and medical history.

---

# 🚀 Base URL

```text
http://localhost:6767
```

---

# 📌 Functional Requirements

## 1. The system must be able to fetch the patient’s profile

### Endpoint

- **Method:** `GET`
- **URL:** `/api/patient/profile`

### Description

This endpoint retrieves the authenticated patient profile from the Legacy System through the Adapter Layer.

### Integration Flow

```text
Patient Portal → Adapter Layer → Legacy System
```

---

## 2. The system must be able to fetch all upcoming appointments of the patient

### Endpoint

- **Method:** `GET`
- **URL:** `/api/appointments/doctors`

### Query Parameters

```text
?date=2026-05-20
```

### Description

This endpoint retrieves available doctors and upcoming schedules from the Online Appointment System.

### Integration Flow

```text
Patient Portal → Online Appointment System
```

---

## 3. The system must be able to fetch all appointment history of the patient

### Endpoint

- **Method:** `GET`
- **URL:** `/api/patient/consultation/:id`

### Description

This endpoint retrieves the patient’s appointment and consultation history through the Adapter Layer.

### Integration Flow

```text
Patient Portal → Adapter Layer → Legacy System
```

---

## 4. The system must be able to fetch the consultation summary for each appointment

### Endpoint

- **Method:** `GET`
- **URL:** `/api/patient/consultation/:id`

### Description

This endpoint retrieves consultation summaries including diagnosis, prescription, and doctor notes.

### Integration Flow

```text
Patient Portal → Adapter Layer → Legacy System
```

---

## 5. The system must be able to schedule an appointment

### Endpoint

- **Method:** `POST`
- **URL:** `/api/appointments/schedule`

### Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

### Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "doctorId": "doctor123",
  "date": "2026-05-20",
  "time": "10:00 AM",
  "reason": "General Consultation"
}
```

### Description

This endpoint creates and schedules a new appointment through the Online Appointment System.

### Integration Flow

```text
Patient Portal → Online Appointment System → Adapter Layer → Legacy System
```

---

## 6. The system must be able to place a pharmacy order

### Endpoint

- **Method:** `POST`
- **URL:** `/api/pharmacy/order`

### Headers

```text
Authorization: Bearer <your_token>
Content-Type: application/json
```

### Request Body

```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "medicine": "Paracetamol",
  "quantity": 2
}
```

### Description

This endpoint sends pharmacy orders to the Pharmacy Management System.

### Integration Flow

```text
Patient Portal → Pharmacy Management System → Adapter Layer → Legacy System
```

---

## 7. The system must not process a request from an unauthorized user

### Middleware

```text
authMiddleware.js
```

### Description

All protected routes require JWT authentication. Unauthorized requests are automatically rejected.

### Integration Flow

```text
Patient Portal → Authentication and Authorization System
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

# 🔗 Integration Requirements

## 1. This system needs to retrieve data from the Legacy System via the Adapter Layer

### Connected Service

```env
ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter
```

### Description

Used for:

- Patient Profile Retrieval
- Consultation History Retrieval
- Legacy System Communication

### Related Integrated System

- Adapter Layer

---

## 2. This system needs to be connected to the Online Appointment System for appointment related tasks and data

### Connected Service

```env
ONLINE_APPOINTMENT_URL=http://localhost:8080
```

### Description

Used for:

- Doctor Availability
- Doctor Schedule Retrieval
- Appointment Scheduling

### Related Integrated System

- Online Appointment System

---

## 3. This system needs to be connected to the Pharmacy Management System for pharmacy related task

### Connected Service

```env
PHARMACY_SYSTEM_URL=http://localhost:5003
```

### Description

Used for:

- Pharmacy Order Processing
- Medicine Requests

### Related Integrated System

- Pharmacy Management System

---

## 4. This system will use the Authentication and Authorization System for login and identity verification

### Connected Service

```env
AUTH_SYSTEM_URL=https://has-auth.onrender.com/api
```

### Description

Used for:

- User Login
- JWT Authentication
- Identity Verification
- Authorization

### Related Integrated System

- Authentication and Authorization System

---

# ⚠️ Constraints

## 1. The system needs to be independent

The Patient Portal operates as an independent microservice with its own:

- Controllers
- Routes
- Middleware
- Services

---

## 2. It must handle errors if the integrated systems are not available or not working properly

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

## 3. This system must not directly access the Legacy System

The Patient Portal communicates with the Legacy System only through the HAS Adapter Layer.

### Allowed Communication Flow

```text
Patient Portal → Adapter Layer → Legacy System
```

### Restricted Communication Flow

```text
Patient Portal ✖ Legacy System
```

---

# 🛠️ Environment Variables

```env
PORT=6767

JWT_SECRET=wkzg15151515@

AUTH_SYSTEM_URL=https://has-auth.onrender.com/api

ADAPTER_LAYER_URL=https://has-adapter-layer.onrender.com/api/adapter

ONLINE_APPOINTMENT_URL=http://localhost:8080

PHARMACY_SYSTEM_URL=http://localhost:5003
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
