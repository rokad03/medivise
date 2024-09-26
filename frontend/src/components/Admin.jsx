// src/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointment = async (id, status) => {
    try {
      await axios.post('http://localhost:5000/update-appointment', { id, status });
      setAppointments(appointments.map(appointment =>
        appointment._id === id ? { ...appointment, status } : appointment
      ));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="appointment-list">
      <h2>Manage Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="appointment-item">
          <p>Patient: {appointment.patientName}</p>
          <p>Doctor: {appointment.doctorName}</p>
          <p>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
          <p>Status: {appointment.status}</p>
          <button onClick={() => updateAppointment(appointment._id, 'Accepted')}>Accept</button>
          <button onClick={() => updateAppointment(appointment._id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;
