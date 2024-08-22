import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/student/mainscreen">Home</Link></li>
        <li><Link to="/lessons/introduction">First Lesson</Link></li>
        <li><Link to="/lessons/processes-and-threads">Second Lesson</Link></li>
        <li><Link to="/practise">Practices</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/teacher/mainscreen">Teacher's Main Screen</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
