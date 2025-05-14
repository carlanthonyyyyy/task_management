import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiPlus, FiEdit, FiTrash, FiCalendar } from 'react-icons/fi';
import { ref, get, push, set, onValue, remove, update } from 'firebase/database';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Tasks.css';

const Tasks = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDueTime, setNewDueTime] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        const tasksRef = ref(db, `tasks/${user.uid}`);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          const loadedTasks = data
            ? Object.entries(data).map(([key, val]) => ({ ...val, id: key }))
            : [];
          setTasks(loadedTasks);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...tasks];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setTasks(reordered);
  };

  const addTask = () => {
    if (newTask.trim() && userId) {
      const newTaskData = {
        text: newTask,
        completed: false,
        dueDate: newDueDate && newDueTime ? `${newDueDate} ${newDueTime}` : newDueDate,
        priority: 'medium',
        category: 'General',
      };
      const newTaskRef = push(ref(db, `tasks/${userId}`));
      set(newTaskRef, newTaskData).then(() => {
        setNewTask('');
        setNewDueDate('');
        setNewDueTime('');
      });
    }
  };

  const deleteTask = (taskId) => {
    if (userId) {
      remove(ref(db, `tasks/${userId}/${taskId}`));
    }
  };

  const toggleTask = (taskId) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    if (updatedTask && userId) {
      update(ref(db, `tasks/${userId}/${taskId}`), {
        completed: !updatedTask.completed,
      });
    }
  };

  return (
    <div className="task-container">
      <h2 className="task-title">Your Tasks</h2>

      <div className="task-controls">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <input
          type="time"
          value={newDueTime}
          onChange={(e) => setNewDueTime(e.target.value)}
        />
        <button onClick={addTask}><FiPlus /> Add</button>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="category">Category</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
              {tasks
                .filter(task => {
                  if (filter === 'completed') return task.completed;
                  if (filter === 'active') return !task.completed;
                  return true;
                })
                .sort((a, b) => {
                  if (sortBy === 'priority') {
                    const order = { high: 1, medium: 2, low: 3 };
                    return order[a.priority] - order[b.priority];
                  }
                  const valA = a[sortBy] || '';
                  const valB = b[sortBy] || '';
                  return valA.localeCompare(valB);
                })
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={`task-item ${snapshot.isDragging ? 'dragging' : ''}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <div className="task-details">
                          <p className={task.completed ? 'completed' : ''}>{task.text}</p>
                          {task.dueDate && (
                            <small><FiCalendar /> {task.dueDate}</small>
                          )}
                        </div>
                        <div className="task-actions">
                          <FiEdit />
                          <FiTrash onClick={() => deleteTask(task.id)} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
