import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import eye from "../../Asssets/eye.png";
import avatar from "../../Asssets/Image.png";
import block from "../../Asssets/Block.png";
import { Link } from "react-router-dom";
import PdfModal from "../PdfModal/PdfModal";
import FormModal from "../FormModal/FormModal";
import BlockModal from "../BlockModal/BlockModal"; // Import the new BlockModal

export default function Riders() {
  const [search, setSearch] = useState("");
  const [allRiders, setAllRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockRiderId, setBlockRiderId] = useState(null); // To store the rider ID to be blocked
  const [token] = useState(localStorage.getItem("token"));

  // Show PDF modal
  function showModal(url) {
    setPdfUrl(url);
    setIsPdfModalOpen(true);
  }

  // Close PDF modal
  function closePdfModal() {
    setIsPdfModalOpen(false);
    setPdfUrl(null);
  }

  // Show Form modal
  function openFormModal() {
    setIsFormModalOpen(true);
  }

  // Close Form modal
  function closeFormModal() {
    setIsFormModalOpen(false);
  }

  // Show Block modal
  function openBlockModal(driverId) {
    setBlockRiderId(driverId);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockRiderId(null); // Clear the rider ID
  }

  // Handle form submission
  function handleFormSubmit(km) {
    console.log("Km submitted:", km);
    // Handle the km submission here, e.g., update state or call an API
    closeFormModal(); // Optionally close the modal after submission
  }

  // Handle block submission
  async function handleBlockSubmit(notes) {
    if (blockRiderId) {
      try {
        await axios.put(
          `https://yallanow.runasp.net/api/Dashboard/UpdateDriverStatus?DriverID=${blockRiderId}&BlockNotes=${encodeURIComponent(notes)}&NewStatus=3`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Rider blocked with notes:", notes);
        fetchRiders(); // Refresh the rider list
        closeBlockModal(); // Close the modal after submission
        alert('Rider blocked successfully!');
      } catch (err) {
        console.error('Error blocking rider:', err.response ? err.response.data : err);
        alert('Failed to block rider!');
      }
    }
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

  useEffect(() => {
    fetchRiders();
  }, [token]);

  return (
    <>
      {/* PDF Modal */}
      <PdfModal isOpen={isPdfModalOpen} onClose={closePdfModal} pdfUrl={pdfUrl} />

      {/* Form Modal */}
      <FormModal isOpen={isFormModalOpen} onClose={closeFormModal} onSubmit={handleFormSubmit} />

      {/* Block Modal */}
      <BlockModal isOpen={isBlockModalOpen} onClose={closeBlockModal} onSubmit={handleBlockSubmit} />

      <div className="container users w-75 me-5 mt-5 rounded-3">
        <div className="row ">
          <h5 className="mt-5 p-0">Riders</h5>
          <div className="d-flex p-0 justify-content-between d-flex align-items-center">
            <div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control rounded-2 px-3 mx-0 shadow-sm"
                placeholder="Search by name"
              />
            </div>
            <div className="p-4">
              <button onClick={openFormModal} className="btn btn-danger main border-0">
                Change Km
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center users w-75 me-5 bg-white mt-3 shadow-sm rounded-3">
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
                      <img src={rider.imageUrl} width={70} height={70} className="rounded-circle" alt="" />
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
                        onClick={() => openBlockModal(rider.driverId)} // Open block modal
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
              </Fragment>
            ))
        ) : (
          <div className="text-center">
            <h2>No Riders Available</h2>
          </div>
        )}
      </div>
    </>
  );
}
