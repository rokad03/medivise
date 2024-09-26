// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/appointmentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schemas
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  appointmentDate: Date,
  status: { type: String, default: 'Pending' },
  email: String, // Add email field to store user's email address
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'nishitrokadcse1@gmail.com', // Replace with your email
    pass: 'jkrm qogd wsij rkjy', // Replace with your email password or app password
  },
});

// Email sending function
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'nishitrokadcse1@gmail.com', // Replace with your email
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Routes
app.post('/book-appointment', async (req, res) => {
  const { patientName, doctorName, appointmentDate, email } = req.body;
  
  const newAppointment = new Appointment({
    patientName,
    doctorName,
    appointmentDate,
    email,
  });
  
  await newAppointment.save();
  
  // Send confirmation email
  const emailSubject = 'Appointment Confirmation';
  const emailText = `
    Dear ${patientName},

    Your appointment with Dr. ${doctorName} is booked for ${new Date(appointmentDate).toLocaleString()}.

    Thank you for booking with us!

    Best regards,
    Your Clinic
  `;
  await sendEmail(email, emailSubject, emailText);

  res.send('Appointment booked and confirmation email sent successfully!');
});

app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

app.post('/update-appointment', async (req, res) => {
  const { id, status } = req.body;
  const appointment = await Appointment.findById(id);
  
  await Appointment.findByIdAndUpdate(id, { status });

  // Optionally, send status update email to the patient
  const emailSubject = `Appointment Status Update: ${status}`;
  const emailText = `
    Dear ${appointment.patientName},

    Your appointment status has been updated to ${status}.

    Thank you for your understanding!

    Best regards,
    Medivise
  `;
  await sendEmail(appointment.email, emailSubject, emailText);

  res.send('Appointment status updated and notification email sent!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
