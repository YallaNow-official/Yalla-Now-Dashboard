import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainImg from "../../Asssets/white logo-06-061.png";
import adminImg from "../../Asssets/Ellipse 2849.png";
import lang from "../../Asssets/grommet-icons_language.png";
import notification from "../../Asssets/notifications.png";
import "./Navbar.css";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeToken, updateToken } from "../../Redux/userTokenSlice";

export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const userToken = useSelector((state) => state.token.userToken);
  const decodedToken = useSelector((state) => state.token.decodedToken);

  useEffect(() => {
    async function fetchToken() {
      if (userToken) {
        try {
          await dispatch(decodeToken(userToken));
        } catch (error) {
          console.error("Failed to decode token:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchToken();
  }, [dispatch, userToken]);

  const userName = decodedToken?.sub;
  const role = decodedToken?.roles[0];

  function Logout() {
    dispatch(updateToken(""));
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      {/* Sidebar */}
      <div className="sidebar open">
        <div className="sidebar-header"></div>
        <ul className="sidebar-nav">
          <img src={mainImg} width={180} alt="" />
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
                location.pathname === "/riders" ||
                location.pathname === "/riderDetails"
                  ? "active"
                  : ""
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
              to="/users"
              className={`nav-link ${
                location.pathname === "/users" ||
                location.pathname === "/userDetails"
                  ? "active"
                  : ""
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
                location.pathname === "/partners" ||
                location.pathname === "/partnerDetails"
                  ? "active"
                  : ""
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

      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="navbar-content">
          {loading ? (
            <p>Loading...</p>
          ) : decodedToken ? (
            <>
              <Link className="navbar-brand" to="/">
                <img className="logo" src={mainImg} alt="Logo" />
              </Link>
              <div className="navbar-actions">
                <i className="fa-solid fa-globe mx-3 "></i>
                <i className="fa-regular fa-bell mx-3"></i>
                <div className="image-container">
                  <img src={adminImg} className="image" alt="Profile" />
                  <h6 className="overlay-text">{userName?.charAt(0)}</h6>
                </div>
                <div className="d-inline-block mt-3 ms-3">
                  <h6 className="">{userName}</h6>
                  <p>{role}</p>
                </div>
                <div className="dropdown mx-2">
                  <button
                    className="btn btn-white dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        onClick={Logout}
                        className="nav-link active carousel-pointer"
                        aria-current="page"
                      >
                        <FaSignOutAlt className="logout-icon mx-3" />
                        logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </div>
    </>
  );
}
