import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { ref, onValue } from 'firebase/database';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'src/Calendar.css';

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const tasksRef = ref(db, `tasks/${user.uid}`);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const eventsArray = data ? Object.values(data).map(task => ({
            title: task.text,
            start: new Date(task.dueDate),
            end: new Date(task.dueDate),
            allDay: true,
          })) : [];
          setEvents(eventsArray);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="calendar-container">
      <h2>Task Calendar</h2>
      <Calendar
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