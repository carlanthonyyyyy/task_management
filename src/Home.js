import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [currentPage, setCurrentPage] = useState('Home');

    const handleButtonClick = (page) => {
        setCurrentPage(page);
        let url = '';

        // DITO YUNG MGA URL
        switch (page) {
            case 'Home':
                url = '/home';
                break;  
            case 'Tasks':
                url = '/tasks';
                break;  
            case 'Calendar':
                url = '/calendar';
                break;
            case 'Notes':
                url = '/notes';
                break;  
            case 'Settings':
                url = '/settings';
                break; 
            default:
                url = '/';
        }

        console.log(`Navigating to: ${url}`);
        
        window.location.href = url;
    };

    return (
        <div className="home-container">
            <nav className="sidebar">
                {[
                    { icon: '🏠', label: 'Home' },
                    { icon: '📋', label: 'Tasks' },
                    { icon: '🗓️', label: 'Calendar' },
                    { icon: '📝', label: 'Notes' },
                    { icon: '⚙️', label: 'Settings' },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="nav-icon"
                        aria-label={item.label}
                        title={item.label}
                        onClick={() => handleButtonClick(item.label)} // Handles button click
                    >
                        {item.icon}
                    </button>
                ))}
            </nav>

            <main className="main-content" role="main">
                <header className="header">
                    <h1>TMA</h1>
                    <p>Task Management System</p>
                </header>

                <section className="welcome-title">
                    <h2>Welcome, User!</h2>
                </section>

                <section className="top-row">
                    {currentPage === 'Home' && <p>Welcome to the Home Page!</p>}
                    {currentPage === 'Tasks' && (
                        <div className="task-section">
                            <h3>Tasks</h3>
                            <ul>
                                {[
                                    { color: 'var(--task-green)' },
                                    { color: 'var(--task-red)' },
                                    { color: 'var(--task-blue)' },
                                    { color: 'var(--task-purple)' },
                                ].map((item, i) => (
                                    <li key={`task-${i}`}>
                                        Task {i + 1}
                                        <hr style={{ borderColor: item.color }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {currentPage === 'Calendar' && <p>Welcome to the Calendar Page!</p>}
                    {currentPage === 'Notes' && (
                        <div className="notes-box">
                            <h4>Notes</h4>
                            <ul>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <li key={`note-${i}`}>Lorem ipsum placeholder text #{i + 1}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {currentPage === 'Settings' && <p>Welcome to the Settings Page!</p>}
                </section>

                <section className="bottom-row">
                    {[1, 2].map((n) => (
                        <div key={`deadline-box-${n}`} className="deadline-box">
                            <h4>Deadlines</h4>
                            <ul>
                                {["03/11/25", "03/12/25", "03/13/25", "03/14/25"].map((date, i) => (
                                    <li key={`deadline-${n}-${i}`}>Task {i + 1}: {date}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="notes-box">
                        <h4>Notes</h4>
                        <ul>
                            {Array.from({ length: 5 }, (_, i) => (
                                <li key={`note-${i}`}>Lorem ipsum placeholder text #{i + 1}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;



