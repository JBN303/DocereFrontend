import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MyAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5007/api/appointmentpat/${id}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  return (
    <div style={{ background: 'white' }}>
      
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div>
          {appointments.map(appointment => (
            <Card key={appointment._id} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Appointment {appointment.status}
                </Typography>
                <Typography variant="h5" component="div">
                  {appointment.doctorName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  appointment no: {appointment.appno}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                appointment Date: {appointment.date}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                appointment time : {appointment.time}
                </Typography>
                <Typography variant="body2">
                   {appointment.msg}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={appointment.doctorLocation} target="_blank" rel="noopener noreferrer">
                      Get Direction╰┈➤
                    </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
