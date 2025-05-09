import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  FiPlus,
  FiBell,
  FiSettings,
  FiUser,
  FiSun,
  FiMoon,
  FiTrash,
  FiEdit,
  FiCalendar
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [userTasks, setUserTasks] = useState({
    john: [],
    jane: [],
    mike: []
  });
  const [newTask, setNewTask] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [editTask, setEditTask] = useState(null);
  const [currentUser, setCurrentUser] = useState('john');

  const [team] = useState([
    { id: 'john', name: 'John Doe', online: true },
    { id: 'jane', name: 'Jane Smith', online: false },
    { id: 'mike', name: 'Mike Johnson', online: true }
  ]);

  const tasks = userTasks[currentUser] || [];

  const updateUserTasks = (newTasks) => {
    setUserTasks(prev => ({
      ...prev,
      [currentUser]: newTasks
    }));
  };

  useEffect(() => {
    const sampleTasks = [
      { id: '1', text: 'Complete project proposal', completed: false, dueDate: '2023-08-25', priority: 'high', category: 'Work' },
      { id: '2', text: 'Team meeting', completed: false, dueDate: '2023-08-26', priority: 'medium', category: 'Meeting' },
      { id: '3', text: 'Review code', completed: true, dueDate: '2023-08-24', priority: 'low', category: 'Development' }
    ];
    updateUserTasks(sampleTasks);
  }, [currentUser]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateUserTasks(items);
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
      updateUserTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    updateUserTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    updateUserTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleLogout = () => {
    // Optional: Clear auth data here if needed
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
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
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
              <select onChange={e => setCurrentUser(e.target.value)} value={currentUser} className="filter-select">
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="task-list">
                  {tasks
                    .filter(task => filter === 'completed' ? task.completed : filter === 'active' ? !task.completed : true)
                    .sort((a, b) => {
                      if (sortBy === 'priority') {
                        const priorityOrder = { high: 1, medium: 2, low: 3 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                      }
                      return a[sortBy].localeCompare(b[sortBy]);
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

        <div className="collaboration-panel">
          <h3 className="panel-title">Team Members</h3>
          {team.map(member => (
            <div key={member.id} className="team-member">
              <span className={`status ${member.online ? 'online' : ''}`}></span>
              <span className="member-name">{member.name}</span>
              <button className="share-button">Share <FiUser size={14} /></button>
            </div>
          ))}
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
