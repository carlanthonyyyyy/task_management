import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  FiPlus,
  FiSun,
  FiMoon,
  FiSettings,
  FiUser,
  FiTrash,
  FiEdit,
  FiCalendar
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [editTask, setEditTask] = useState(null);

  const [currentUserName, setCurrentUserName] = useState('');
  const [loading, setLoading] = useState(true); // new


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await get(ref(db, 'users/' + user.uid));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setCurrentUserName(`${data.firstName} ${data.lastName}`);
          } else {
            setCurrentUserName('User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUserName('User');
        }
        setLoading(false); // ✅ only after user data is fetched
      } else {
        navigate('/'); // 🚪 redirect to login
        // ❌ don't call setLoading here or it will flash "Loading..." indefinitely
      }
    });

    return () => unsubscribe();
  }, [navigate]);  

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        dueDate: '',
        priority: 'medium',
        category: 'General'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleLogout = () => {
    localStorage.clear(); // ✅ ensure localStorage is cleared on logout
    navigate('/');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="logo"><h1>TaskFlow</h1></div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#calendar">Calendar</a>
          <a href="#tasks">Tasks</a>
          <a href="#settings">Settings</a>
        </nav>
        <div className="header-controls">
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <div className="profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FiUser size={20} />
            {showProfileMenu && (
              <div className="profile-menu">
                <button className="profile-menu-item"><FiSettings /> Account Settings</button>
                <button className="profile-menu-item"><FiUser /> Profile</button>
                <button className="profile-menu-item" onClick={handleLogout}><FiSun /> Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="greeting-note">
          <h2>
            {loading ? 'Loading...' : `Hi, ${currentUserName}`}
          </h2>
        </div>

        <div className="dashboard">
          <div className="stats-card">
            <h3>📅 Upcoming Tasks</h3>
            <span className="accent-text">{tasks.filter(t => !t.completed).length}</span>
          </div>
          <div className="stats-card">
            <h3>⚠️ Overdue Tasks</h3>
            <span className="accent-text">0</span>
          </div>
          <div className="stats-card">
            <h3>✅ Completed</h3>
            <span className="accent-text">{tasks.filter(t => t.completed).length}</span>
          </div>
        </div>

        <div className="task-section">
          <div className="task-controls">
            <input
              type="text"
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="task-input"
            />
            <button onClick={addTask} className="add-button">
              <FiPlus size={18} /> Add Task
            </button>
            <div className="filter-group">
              <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
              <select onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
                  {tasks
                    .filter(task => {
                      if (filter === 'completed') return task.completed;
                      if (filter === 'active') return !task.completed;
                      return true;
                    })
                    .sort((a, b) => {
                      if (sortBy === 'priority') {
                        const priorityOrder = { high: 1, medium: 2, low: 3 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                      } else {
                        const valA = a[sortBy] || '';
                        const valB = b[sortBy] || '';
                        return valA.localeCompare(valB);
                      }
                    })
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-item ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            <div className="task-checkbox">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                              />
                            </div>
                            <div className="task-content">
                              <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                              <div className="task-meta">
                                {task.category && <span className="category-badge">{task.category}</span>}
                                {task.dueDate && <span className="due-date"><FiCalendar size={14} /> {task.dueDate}</span>}
                              </div>
                            </div>
                            <div className="task-actions">
                              <FiEdit className="action-icon" onClick={() => setEditTask(task)} />
                              <FiTrash className="action-icon" onClick={() => deleteTask(task.id)} />
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
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#support">Support</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <div className="social-media">
          <span>Connect with us:</span>
          <a href="#twitter">Twitter</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#facebook">Facebook</a>
        </div>
        <p className="copyright">© 2023 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
