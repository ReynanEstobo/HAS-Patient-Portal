const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routers/authRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const patientRoutes = require("./routers/patientRoutes");
const appointmentRoutes = require("./routers/appointmentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);
app.use("/api/patient", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Patient Portal running on port ${PORT}`);
});
