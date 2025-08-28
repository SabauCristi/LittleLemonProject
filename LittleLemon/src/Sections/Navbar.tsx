import { useState } from "react";
import "../Styles/Navbar.scss"; // Assuming Navbar.scss is in the same directory

export default function Navbar(){
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggles the mobile menu's visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handles smooth scrolling to a section on the page
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Close the mobile menu after clicking a link
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <ul className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <li><button onClick={() => handleScroll("menu")}>About Us</button></li>
          <li><button onClick={() => handleScroll("reserve")}>Reserve</button></li>
        </ul>
      </div>

      <div className="logo">
        <a onClick={() => handleScroll("top")}>Little Lemon</a>
      </div>
    </nav>
  );
};