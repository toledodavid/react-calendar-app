import React from 'react';


const Navbar = () => {
  return(
    <nav className="navbar navbar-dark bg-dark mb-4">
      <a className="navbar-brand" href="#">Alex</a>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i> Salir
      </button>
    </nav>
  );
}


export default Navbar;