import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import './global.css'

function Logout() {
  Cookies.remove("jwt");
}

const Navbar = ({ isAdmin }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark fixed-left w-100 h-100 text-center"
    >
      {/* <img src="opel.png" /> */}
      System rozpoznawania znaków drogowych
      {/* <h1 className="text-center text-wra">System rozpoznawania znaków drogowych</h1> */}
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item bg-secondary mb-1">
          <Link className="nav-link text-white menu-hover" to="/">
            Start
          </Link>
        </li>
        <li className="nav-item bg-secondary mb-1">
          <Link className="nav-link text-white menu-hover" to="/technologies">
            Technologie
          </Link>
        </li>
        {Cookies.get('jwt') && !isAdmin && 
        <li className="nav-item bg-secondary mb-1">
          <Link className="nav-link text-white menu-hover" to="/groups">
            Moje Rozpoznania
          </Link>
        </li>}
        {Cookies.get('jwt') && 
        <li className="nav-item bg-secondary mb-1">
          <Link to="/start" onClick={Logout} className="nav-link text-white menu-hover">
            Wyloguj
          </Link>
        </li>}
      </ul>
      <hr />
    </div>
  );
};

export default Navbar;
