import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="left">
        <span id="header-text">NewsNuggets</span>
        <ul className="menu-left">
        <li><Link to="/bookmarks" onClick={closeMenu}>Bookmarks</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        </ul>
      </div>
      <div className={`right ${isMenuOpen ? 'open' : ''}`}>
        <button className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
        <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
          
          <li><Link to="/" onClick={closeMenu}>Home | General</Link></li>
          <li><Link to="/business" onClick={closeMenu}>Business</Link></li>
          <li><Link to="/entertainment" onClick={closeMenu}>Entertainment</Link></li>
          <li><Link to="/health" onClick={closeMenu}>Health</Link></li>
          <li><Link to="/science" onClick={closeMenu}>Science</Link></li>
          <li><Link to="/sports" onClick={closeMenu}>Sports</Link></li>
          <li><Link to="/technology" onClick={closeMenu}>Technology</Link></li>
       
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
