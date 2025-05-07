import './Nav.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [name, setName] = useState(localStorage.getItem('name') || '');

  useEffect(() => {
    const updateRoleAndName = () => {
      setRole(localStorage.getItem('role') || '');
      setName(localStorage.getItem('name') || '');
    };

    window.addEventListener('storageUpdated', updateRoleAndName);

    return () => {
      window.removeEventListener('storageUpdated', updateRoleAndName);
    };
  }, []);

  const path = location.pathname;

  const isAdmin = role === 'admin' || path.startsWith('/adminhome');
  const isUser = role === 'user' || path.startsWith('/userhome');

  const renderLinks = () => {
    if (isAdmin) {
      return (
        <>
          <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
        </>
      );
    } else if (isUser) {
      return (
        <>
          <NavLink className="nav-item nav-link" to="/user/profile">Profile</NavLink>
          <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink className="nav-item nav-link" to="/home">Home</NavLink>
          <NavLink className="nav-item nav-link" to="/about">About</NavLink>
          <NavLink className="nav-item nav-link" to="/service">Service</NavLink>
          <NavLink className="nav-item nav-link" to="/contact">Contact</NavLink>
          <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
          <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
        </>
      );
    }
  };

  const renderTitle = () => {
    if (isAdmin) return 'Welcome Admin Panel';
    if (isUser) return 'Welcome User Panel';
    return 'Quick Skill Website';
  };

  const renderRightInfo = () => {
    if (isAdmin || isUser) {
      return (
        <h4 className="m-0 pe-lg-5 d-none d-lg-block">
          <i className="fa fa-user text-success me-2"></i>{name}
        </h4>
      );
    }
    return (
      <h4 className="m-0 pe-lg-5 d-none d-lg-block">🧩</h4>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-success sticky-top p-0">
      <div className="navbar-brand bg-success d-flex align-items-center px-4 px-lg-5">
        <h2 className="mb-2 text-white">{renderTitle()}</h2>
      </div>
      <button
        type="button"
        className="navbar-toggler me-4"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          {renderLinks()}
        </div>
        {renderRightInfo()}
      </div>
    </nav>
  );
}

export default Nav;
