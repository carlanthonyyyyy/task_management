import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Sidebar */}
            <div className="sidebar">
                <button className="nav-icon" aria-label="Home">🏠</button>
                <button className="nav-icon" aria-label="Tasks">📋</button>
                <button className="nav-icon" aria-label="Calendar">🗓️</button>
                <button className="nav-icon" aria-label="Notes">📝</button>
                <button className="nav-icon" aria-label="Settings">⚙️</button>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="header">
                    <h1>TMA</h1>
                    <p>Task Management System</p>
                </header>

                <div className="welcome-title">
                    <h2>Welcome User!</h2>
                </div>

                <div className="top-row">
                    <div className="calendar-section">Calendar</div>
                    <div className="task-section">
                        <h3>Task</h3>
                        <ul>
                            <li>Task 1 <hr style={{ borderColor: 'green' }} /></li>
                            <li>Task 2 <hr style={{ borderColor: 'red' }} /></li>
                            <li>Task 3 <hr style={{ borderColor: 'blue' }} /></li>
                            <li>Task 4 <hr style={{ borderColor: 'purple' }} /></li>
                        </ul>
                    </div>
                </div>

                <div className="bottom-row">
                    <div className="deadline-box">
                        <h4>Deadlines</h4>
                        <ul>
                            <li>Task 1: 03/11/25</li>
                            <li>Task 2: 03/12/25</li>
                            <li>Task 3: 03/13/25</li>
                            <li>Task 4: 03/14/25</li>
                        </ul>
                    </div>

                    <div className="deadline-box">
                        <h4>Deadlines</h4>
                        <ul>
                            <li>Task 1: 03/11/25</li>
                            <li>Task 2: 03/12/25</li>
                            <li>Task 3: 03/13/25</li>
                            <li>Task 4: 03/14/25</li>
                        </ul>
                    </div>

                    <div className="notes-box">
                        <h4>Notes:</h4>
                        <ul>
                            <li>Lorem ipsum kinemerut ano ba nakalagay dito</li>
                            <li>Lorem ipsum kinemerut ano ba nakalagay dito</li>
                            <li>Lorem ipsum kinemerut ano ba nakalagay dito</li>
                            <li>Lorem ipsum kinemerut ano ba nakalagay dito</li>
                            <li>Lorem ipsum kinemerut ano ba nakalagay dito</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
