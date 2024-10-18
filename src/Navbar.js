import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'; 

export default function Navbar() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <ul className="nav nav-tabs" style={{ backgroundColor: "", alignItems: 'center' }}>
        <li className="nav-item">
          <div className="branding">
            <p className="branding-text">EcoTrack</p>
          </div>
        </li>
        <li className={`nav-item  ${location.pathname === '/update-usage' ? 'nav-link-active' : ''}`}>
          <Link className="nav-link nav-link-custom" to="/update-usage">Log Consumption</Link>
        </li>
      </ul>
    </div>
  );
}
