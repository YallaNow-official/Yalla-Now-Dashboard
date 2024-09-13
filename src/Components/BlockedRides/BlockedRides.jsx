import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import eye from "../../Asssets/eye.png";
import block from "../../Asssets/Block.png";
import PdfModal from "../PdfModal/PdfModal";
import UnBlockModal from "../UnblockModal/UnblockModal"; // Import the modal component
import { Link } from "react-router-dom";

export default function BlockedRiders() {
  const [allBlockedRiders, setBlockedRiders] = useState([]);
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [riderToUnblock, setRiderToUnblock] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const token = localStorage.getItem("token");

  // Show PDF modal
  function showModal(url) {
    setPdfUrl(url);
    setIsModalOpen(true);
  }
  // Handle page change
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Handle page size change
  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on page size change
  }
  // Close PDF modal
  function closeModal() {
    setIsModalOpen(false);
    setPdfUrl(null);
  }

  // Show unblock modal
  function showUnblockModal(rider) {
    setRiderToUnblock(rider);
    setIsUnblockModalOpen(true);
  }

  // Close unblock modal
  function closeUnblockModal() {
    setIsUnblockModalOpen(false);
    setRiderToUnblock(null);
  }

  // Fetch blocked riders data
  async function getBlockedRiders(pageNumber = 1) {
    try {
      const { data } = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/BlockedDrivers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched Blocked Riders Data:", data);
      setBlockedRiders(data.data || []);
      setTotalPages(data.totalPages || 1); // Update total pages if available
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // Handle unblock rider and update status to 0
  async function unblockRider(driverId, note) {
    try {
      await axios.put(
        `https://yallanow.runasp.net/api/Dashboard/UpdateDriverStatus?DriverID=${driverId}&BlockNotes=${encodeURIComponent(note)}&NewStatus=0`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Rider with ID ${driverId} has been unblocked.`);
      // Refresh the blocked riders list
      getBlockedRiders(currentPage);
    } catch (err) {
      console.error("Error unblocking rider:", err);
      alert("Failed to unblock rider!");
    }
  }

  // Filter riders based on search term
  useEffect(() => {
    const filtered = allBlockedRiders.filter((rider) =>
      rider.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRiders(filtered);
  }, [searchTerm, allBlockedRiders]);

  // Fetch riders on mount and page change
  useEffect(() => {
    getBlockedRiders(currentPage);
  }, [currentPage]);

  return (
    <>
      <PdfModal isOpen={isModalOpen} onClose={closeModal} pdfUrl={pdfUrl} />
      <UnBlockModal
        isOpen={isUnblockModalOpen}
        onClose={closeUnblockModal}
        onSubmit={(note) => {
          if (riderToUnblock) {
            unblockRider(riderToUnblock.driverId, note);
          }
        }}
      />
      <div className="users pt-5 mt-5">
        <div className="container users w-75 me-5">
          <div className="row">
            <p className="mt-5 p-0">Blocked Riders</p>
            <div className="d-flex p-0 justify-content-between d-flex align-items-center">
              <div>
                <input
                  type="text"
                  className="form-control px-3 mx-0 shadow-sm w-100"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container users w-75 me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
          {filteredRiders.length > 0 ? (
            <>
              <div className="row px-3 d-flex justify-content-center align-items-center mt-3">
                <div className="col-md-2 text-center mainDiv px-0">
                  <div>
                    <p>Image</p>
                  </div>
                </div>
                <div className="col-md-2 text-center mainDiv px-0">
                  <div>
                    <p>Rider Name</p>
                  </div>
                </div>
                <div className="col-md-2 text-center mainDiv px-0">
                  <div>
                    <p>Scooter type</p>
                  </div>
                </div>
                <div className="col-md-2 text-center mainDiv px-0">
                  <div>
                    <p>Scooter color</p>
                  </div>
                </div>
                <div className="col-md-2 text-center mainDiv px-0">
                  <div>
                    <p>Number</p>
                  </div>
                </div>
                <div className="col-md-1 text-center px-0">
                  <div>
                    <p>Ride Type</p>
                  </div>
                </div>
                <div className="col-md-1 text-center px-0">
                  <div>
                    <p>Action</p>
                  </div>
                </div>
              </div>
              <hr />
              {filteredRiders.map((rider) => (
                <Fragment key={rider.driverId}>
                  <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
                    <div className="col-md-2 px-0 text-center">
                      <button
                        onClick={() => showModal(rider.papersFilePath)}
                        className="btn btn-link"
                      >
                        <img
                          src={rider.imageUrl}
                          width={70}
                          height={70}
                          className="rounded-circle"
                          alt=""
                        />
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
                          onClick={() => showUnblockModal(rider)}
                          src={block}
                          alt="block"
                          style={{ cursor: "pointer" }}
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
              ))}
             <div className="pagination-controls d-flex justify-content-between align-items-center px-3 py-2">
          <div className="d-flex align-items-center">
            <label className="me-2">Page Size:</label>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="form-select"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="btn btn-secondary me-2"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn btn-secondary ms-2"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
            </>
          ) : (
            <div>
              <h2 className="text-center">No Blocked Riders</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
