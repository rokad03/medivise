// src/AppointmentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/book-appointment', {
        patientName,
        doctorName,
        appointmentDate,
        email,
      });
      alert('Appointment booked successfully and confirmation email sent!');
      setPatientName('');
      setDoctorName('');
      setAppointmentDate('');
      setEmail('');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Patient Name:</label>
        <input 
          type="text" 
          value={patientName} 
          onChange={(e) => setPatientName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Doctor Name:</label>
        <input 
          type="text" 
          value={doctorName} 
          onChange={(e) => setDoctorName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Appointment Date:</label>
        <input 
          type="datetime-local" 
          value={appointmentDate} 
          onChange={(e) => setAppointmentDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
