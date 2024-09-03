import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import eye from "../../Asssets/eye.png";
import block from "../../Asssets/Block.png";
import { Link } from "react-router-dom";
import PdfModal from "../PdfModal/PdfModal";

export default function Riders() {
  const [search, setSearch] = useState("");
  const [allRiders, setAllRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const token = localStorage.getItem("token");

  // Show PDF modal
  function showModal(url) {
    setPdfUrl(url);
    setIsModalOpen(true);
  }

  // Close PDF modal
  function closeModal() {
    setIsModalOpen(false);
    setPdfUrl(null);
  }

  // Fetch rider data from API
  async function fetchRiders() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        'https://yallanow.runasp.net/api/Dashboard/AllDrivers?pageNumber=1&pageSize=10',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllRiders(data.data || []);
    } catch (err) {
      console.error('Error fetching rider data:', err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  }

  // Update rider status
  async function updateRiderStatus(driverId, newStatus) {
    try {
      await axios.put(
        `https://yallanow.runasp.net/api/Dashboard/UpdateDriverStatus?DriverID=${driverId}&NewStatus=${newStatus}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Rider status updated to ${newStatus}`);
      fetchRiders(); // Refresh the rider list
      if (newStatus === 3) {
        alert('Rider blocked successfully!');
      }
    } catch (err) {
      console.error('Error updating rider status:', err.response ? err.response.data : err);
      alert('Failed to update rider status!');
    }
  }

  // Block rider
  function handleBlockRider(driverId) {
    updateRiderStatus(driverId, 3); // Block rider with status 3
  }

  useEffect(() => {
    fetchRiders();
  }, [token]);

  return (
    <>
      <PdfModal isOpen={isModalOpen} onClose={closeModal} pdfUrl={pdfUrl} />
      <div className="container d-flex align-items-center users my-5 w-75 me-5 px-0">
        <h5>Riders</h5>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="form-control rounded-2 px-3 mx-0 shadow-sm"
          placeholder="Search by name"
        />
      </div>
      <div className="container users w-75 me-5 bg-white p-3 mt-5 shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 px-0 text-center">
            <p>Image</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Rider Name</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Scooter type</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Scooter color</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Number</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Ride Type</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Action</p>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : allRiders.length > 0 ? (
          allRiders
            .filter(rider =>
              search.toLowerCase() === ""
                ? rider
                : rider.userName.toLowerCase().includes(search.toLowerCase())
            )
            .map(rider => (
              <Fragment key={rider.driverId}>
                <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
                  <div className="col-md-2 px-0 text-center">
                    <button onClick={() => showModal(rider.papersFilePath)} className="btn btn-link">
                      <i className="fas fa-file-pdf" style={{ fontSize: '40px', color: '#ff0000' }}></i>
                    </button>
                  </div>
                  <div className="col-md-2 px-0 text-center">
                    <p>{rider.userName}</p>
                  </div>
                  <div className="col-md-2 px-0 text-center">
                    <p>{rider.vehicleType}</p>
                  </div>
                  <div className="col-md-2 px-0 text-center">
                    <p>{rider.vehicleColor}</p>
                  </div>
                  <div className="col-md-2 px-0 text-center">
                    <p>{rider.phoneNumber}</p>
                  </div>
                  <div className="col-md-1 px-0 text-center">
                    <p className="badge primary primary1 rounded-1">
                      {rider.vehicleType}
                    </p>
                  </div>
                  <div className="col-md-1 px-0 text-center">
                    <p>
                      <img
                        className="mx-2"
                        onClick={() => handleBlockRider(rider.driverId)} // Pass driverId
                        src={block}
                        alt="block"
                        style={{ cursor: 'pointer' }}
                      />
                      <Link to={`/riderDetails/${rider.driverId}`}>
                        <img
                          className=""
                          id="hover-trigger"
                          src={eye}
                          alt="eye"
                        />
                      </Link>
                    </p>
                  </div>
                </div>
                <hr />
              </Fragment>
            ))
        ) : (
          <div>
            <h2>No Riders Available</h2>
          </div>
        )}
      </div>
    </>
  );
}
