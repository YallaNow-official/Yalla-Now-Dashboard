import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function PendingRiders() {
  const [allPendingRiders, setPendingRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch pending riders data
  async function allPendingRidersData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        'https://yallanow.runasp.net/api/Dashboard/PendingRiders?pageNumber=1&pageSize=10',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Pending Riders Data:', data);
      setPendingRiders(data.data || []);
    } catch (err) {
      console.error('Error fetching pending riders data:', err.response ? err.response.data : err);
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
      allPendingRidersData();
      if (newStatus === 1) {
        alert('Rider accepted successfully!');
      } else if (newStatus === 2) {
        alert('Rider rejected successfully!');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.error('Driver not found:', err.response.data);
      } else {
        console.error('Error updating rider status:', err.response ? err.response.data : err);
      }
      alert('Failed to update rider status!');
    }
  }

  // Handle accept rider
  function handleAccept(driverId) {
    updateRiderStatus(driverId, 1); // Accept rider with status 1
  }

  // Handle reject rider
  function handleReject(driverId) {
    updateRiderStatus(driverId, 2); // Reject rider with status 2
  }

  useEffect(() => {
    allPendingRidersData();
  }, [token]);

  return (
    <>
    <div className="users     mt-5 ">
      <div className="container d-flex align-items-center users my-5 w-75 me-5 px-0">
        <h5>Pending Riders</h5>
      </div>
      <div className="container  text-center users w-75  me-5 bg-white mt-3  shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Rider Name</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Scooter type</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Scooter Number</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Request Time</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Details</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Action</p>
            </div>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : allPendingRiders?.length > 0 ? (
          allPendingRiders.map((rider) => (
            <div
              key={rider.id}
              className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3"
            >
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{rider.userName}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{rider.vehicleType}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{rider.licensePlate}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>August 26, 2023 <br /> 11:00 AM</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p className="primary1">See Details ....</p>
                </div>
              </div>
              <div className="col-md-2 py-3 px-0">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-dark secondary1 border-0 w-100"
                    onClick={() => handleAccept(rider.driverId)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-dark secondary2 border-0 mx-2 w-100"
                    onClick={() => handleReject(rider.driverId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>No Pending Riders</h2>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
