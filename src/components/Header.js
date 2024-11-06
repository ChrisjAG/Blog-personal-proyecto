import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" /> {/* Ruta directa desde 'public' */}
        <h1>GAMING FACTORY</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
