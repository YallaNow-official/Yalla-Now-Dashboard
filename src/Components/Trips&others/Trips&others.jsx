import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import eye from "../../Asssets/eye.png";
import avatar from "../../Asssets/Image.png";
import block from "../../Asssets/Block.png";
import { Link } from "react-router-dom";
import PdfModal from "../PdfModal/PdfModal";
import AddPartnerModal from "../AddPartnerModal/AddPartnerModal";
import BlockModal from "../BlockModal/BlockModal";
import FormData from "form-data";
import { toast } from "react-toastify";

export default function Trips() {
  const [search, setSearch] = useState("");
  const [allTRips, setallTRips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isAddtripModalOpen, setIsAddtripModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blocktripId, setBlocktripId] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

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
  function openAddtripModal() {
    setIsAddtripModalOpen(true);
  }

  // Close Form modal
  function closeAddtripModal() {
    setIsAddtripModalOpen(false);
  }

  // Show Block modal
  function openBlockModal(driverId) {
    setBlocktripId(driverId);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlocktripId(null);
  }

  // Handle form submission
  function handleFormSubmit(km) {
    console.log("Km submitted:", km);
    closeAddtripModal();
  }

  async function handleBlockSubmit(notes) {
    if (blocktripId) {
      try {
        const form = new FormData();
        form.append("tripId", blocktripId);
        form.append("BlockNotes", notes);
        form.append("NewStatus", 3);

        await axios.put(
          "https://yallanow.runasp.net/api/Dashboard/UpdatetripStatus",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        );
        fetchtrips();
        closeBlockModal();
        toast.success("trip blocked successfully!");
      } catch (err) {
        toast.error(
          "Error blocking trip:",
          err.response ? err.response.data : err
        );
      }
    }
  }

  // Fetch trip data from API
  async function fetchtrips() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://yallanow.runasp.net/api/Trips?search=${encodeURIComponent(
          search
        )}&pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setallTRips(data || []);
      console.log(data);

      setTotalPages(Math.ceil(data.totalCount)); // Update total pages
    } catch (err) {
      console.error(
        "Error fetching trip data:",
        err.response ? err.response.data : err
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchtrips();
  }, [currentPage, pageSize, search, token]);

  // Handle page change
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Handle page size change
  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on page size change
  }

  return (
    <>
      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={closePdfModal}
        pdfUrl={pdfUrl}
      />

      {/* Form Modal */}
      <AddPartnerModal
        isOpen={isAddtripModalOpen}
        onClose={closeAddtripModal}
        onSubmit={handleFormSubmit}
      />

      {/* Block Modal */}
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={closeBlockModal}
        onSubmit={handleBlockSubmit}
      />

      <div className="users mt-5">
        <div className="container users w-75 me-5 mt-5 rounded-3">
          <div className="row">
            <h5 className="mt-5 p-0">Tours & Trips & Offers</h5>
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
                <Link to={"/addTrip"} className="btn btn-danger main border-0">
                  Add New
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center users w-75 me-5 bg-white mt-3 shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-1 px-0 text-center">
            <p>Image</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Trip Name</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Type</p>
          </div>
          <div className="col-md-3 px-0 text-center">
            <p>Description </p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Currency</p>
          </div>
          <div className="col-md-2 px-0 text-center">
            <p>Price</p>
          </div>

          <div className="col-md-1 px-0 text-center">
            <p>Action</p>
          </div>
        </div>

        {loading ? (
          <div>
            Loading... <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : allTRips.length > 0 ? (
          allTRips.map((trip) => (
            <Fragment key={trip.id}>
              <div className="row my-1 py-3 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
                <div className="col-md-1 px-0 text-center">
                  <img src={trip.imageUrl} alt="avatar" />
                </div>
                <div className="col-md-2 px-0 text-center">
                  <p>{trip.destniation}</p>
                </div>
                <div className="col-md-2 px-0 text-center">
                  <p>{trip.name}</p>
                </div>
                <div className="col-md-3 px-0 text-center">
                  <p>{trip.description.split(" ").slice(0, 7).join(" ")}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>{trip.currency}</p>
                </div>
                <div className="col-md-2 px-0 text-center">
                  <p>{trip.price}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>
                    <img
                      className="mx-2"
                      onClick={() => openBlockModal(trip.tripId)}
                      src={block}
                      alt="block"
                      style={{ cursor: "pointer" }}
                    />
                    <Link to={`/tripDetails/${trip.tripId}`}>
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
            <h2>No trip Available</h2>
          </div>
        )}

        {/* Pagination Controls */}
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
      </div>
    </>
  );
}
