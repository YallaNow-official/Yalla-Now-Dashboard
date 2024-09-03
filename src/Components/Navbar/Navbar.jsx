import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainImg from "../../Asssets/white logo-06-061.png";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link className="navbar-brand" to="/home">
            <img className="w-100" src={mainImg} alt="Logo" />
          </Link>
        </div>
        <ul className="sidebar-nav">
          <li>
            <Link
              to="/dashboard"
              className={`nav-link ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/riders"
              className={`nav-link ${
                location.pathname === "/riders" || location.pathname ==="/riderDetails" ? "active" : ""
              }`}
            >
              Riders
            </Link>
          </li>
          <li>
            <Link
              to="/pendingRiders"
              className={`nav-link ${
                location.pathname === "/pendingRiders" ? "active" : ""
              }`}
            >
              Pending Riders
            </Link>
          </li>
          <li>
            <Link
              to="/ridesHistory"
              className={`nav-link ${
                location.pathname === "/ridesHistory" ? "active" : ""
              }`}
            >
              Rides History
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`nav-link ${
                location.pathname === "/users" || location.pathname === "/userDetails"? "active" : ""
              }`}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/blockedRiders"
              className={`nav-link ${
                location.pathname === "/blockedRiders" ? "active" : ""
              }`}
            >
              Blocked Riders
            </Link>
          </li>
          <li>
            <Link
              to="/pendingPartners"
              className={`nav-link ${
                location.pathname === "/pendingPartners" ? "active" : ""
              }`}
            >
              Pending Partner
            </Link>
          </li>
          <li>
            <Link
              to="/partners"
              className={`nav-link ${
                location.pathname === "/partners" ||location.pathname === "/partnerDetails" ? "active" : ""
              }`}
            >
               Partners
            </Link>
          </li>
          <li>
            <Link
              to="/blockedPartners"
              className={`nav-link ${
                location.pathname === "/blockedPartners" ? "active" : ""
              }`}
            >
               Blocked Partners
            </Link>
          </li>
          <li>
            <Link
              to="/trips"
              className={`nav-link ${
                location.pathname === "/trips" ? "active" : ""
              }`}
            >
               Trips & others
            </Link>
          </li>
          <li>
            <Link
              to="/Booking"
              className={`nav-link ${
                location.pathname === "/booking" ? "active" : ""
              }`}
            >
              Booking
            </Link>
          </li>
        </ul>
      </div>

     
    </>
  );
}
