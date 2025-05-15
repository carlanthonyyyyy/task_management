import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'; // rename import to avoid conflict
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { ref, onValue } from 'firebase/database';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tasksRef = ref(db, `tasks/${user.uid}`);
        const unsubscribeDb = onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const eventsArray = data
            ? Object.values(data).map((task) => ({
                title: task.text,
                start: task.dueDate ? new Date(task.dueDate) : new Date(),
                end: task.dueDate ? new Date(task.dueDate) : new Date(),
                allDay: true,
              }))
            : [];
          setEvents(eventsArray);
        });

        // Cleanup DB listener on unmount
        return () => unsubscribeDb();
      }
    });

    // Cleanup Auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="calendar-container">
      <h2>Task Calendar</h2>
      <button 
        onClick={() => navigate(-1)} // Go back to the previous page in history
        style={{ marginBottom: '10px', padding: '8px 12px', cursor: 'pointer' }}
      >
        ← Back
      </button>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="custom-calendar"
      />
    </div>
  );
};

export default CalendarComponent;
