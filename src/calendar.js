import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
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
  const navigate = useNavigate();

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
        return () => unsubscribeDb();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
        >
          ← Back to Dashboard
        </button>
        <h2 className="calendar-title">Task Calendar</h2>
      </div>
      
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="custom-calendar"
        style={{ height: 'calc(100vh - 150px)' }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#f0faf5',
            border: '1px solid #3f8d66',
            borderRadius: '4px',
            color: '#2d3e40',
            fontSize: '0.9em',
          },
        })}
      />
    </div>
  );
};

export default CalendarComponent;