import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import eye from "../../Asssets/eye.png";
import block from "../../Asssets/Block.png";
import PdfModal from "../PdfModal/PdfModal";
import UnBlockModal from "../UnblockModal/UnblockModal";
import { Link } from "react-router-dom";
import avatar from "../../Asssets/Image.png";
import FormData from "form-data";
import { toast } from 'react-toastify'; // Import toast

export default function BlockedPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const [allBlockedPartners, setBlockedPartners] = useState([]);
  const [selectedpartner, setSelectedpartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [partnerToUnblock, setpartnerToUnblock] = useState(null);
  const [search, setSearch] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10); // State for page size
  const [totalPages, setTotalPages] = useState(1); // State for total pages
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

  // Fetch blocked Partners data with pagination and search
  async function getBlockedPartners() {
    try {
      const { data } = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/BlockedPartners?pageNumber=${currentPage}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched Blocked Partners Data:", data);
      setBlockedPartners(data.data || []);
      setTotalPages(Math.ceil(data.totalCount / pageSize)); // Update total pages based on data
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  // Unblock partner and update status to 0
  async function unblockpartner(partnerId, note) {
    try {
      // Create a new FormData object
      const form = new FormData();
      form.append("PartnerId", partnerId);
      form.append("Notes", note);
      form.append("NewStatus", 0);

      // Send the PUT request with form data
      await axios.put(
        "https://yallanow.runasp.net/api/Dashboard/UpdatePartnerStatus",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      console.log(`Partner with ID ${partnerId} has been unblocked.`);
      // Show success toast
      toast.success("Partner successfully unblocked!");
      // Refresh the blocked Partners list
      getBlockedPartners();
    } catch (err) {
      console.error(
        "Error unblocking partner:",
        err.response ? err.response.data : err
      );
      toast.error("Failed to unblock partner!"); // Show error toast
    }
  }

  useEffect(() => {
    getBlockedPartners();
  }, [token, currentPage, pageSize, search]);

  // Show unblock modal
  function showUnblockModal(partner) {
    setpartnerToUnblock(partner);
    setIsUnblockModalOpen(true);
  }

  // Close unblock modal
  function closeUnblockModal() {
    setIsUnblockModalOpen(false);
    setpartnerToUnblock(null);
  }

  // Handle search input change
  function handleSearchChange(e) {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  }

  // Handle page change
  function handlePageChange(page) {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  // Handle page size change
  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on page size change
  }

  return (
    <>
      <PdfModal isOpen={isModalOpen} onClose={closeModal} pdfUrl={pdfUrl} />
      <UnBlockModal
        isOpen={isUnblockModalOpen}
        onClose={closeUnblockModal}
        onSubmit={(note) => {
          if (partnerToUnblock) {
            unblockpartner(partnerToUnblock.partnerId, note);
          }
        }}
      />
      <div className="users pt-5 mt-5">
        <div className="container users w-75 me-5">
          <div className="row">
            <p className="mt-5 p-0">Blocked Partners</p>
            <div className="d-flex p-0 justify-content-between align-items-center">
              <div>
                <input
                  type="text"
                  className="form-control px-3 mx-0 shadow-sm w-100"
                  placeholder="Search by name"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container users w-75 me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
          {allBlockedPartners.length > 0 ? (
            <>
              <div className="row px-3 d-flex justify-content-center align-items-center mt-3">
                <div className="col-md-1 text-center mainDiv px-0">
                  <div>
                    <p>Image</p>
                  </div>
                </div>
                <div className="col-md-1 text-center mainDiv px-0">
                  <div>
                    <p>Partner Name</p>
                  </div>
                </div>
                <div className="col-md-1 text-center mainDiv px-0">
                  <div>
                    <p>Type</p>
                  </div>
                </div>
                <div className="col-md-3 text-center mainDiv px-0">
                  <div>
                    <p>Mail</p>
                  </div>
                </div>
                <div className="col-md-1 text-center mainDiv px-0">
                  <div>
                    <p>Mobile Number</p>
                  </div>
                </div>
                <div className="col-md-3 text-center px-0">
                  <div>
                    <p>Location</p>
                  </div>
                </div>
                <div className="col-md-1 text-center px-0">
                  <div>
                    <p>Order Number</p>
                  </div>
                </div>
                <div className="col-md-1 text-center px-0">
                  <div>
                    <p>Action</p>
                  </div>
                </div>
              </div>
              <hr />
              {allBlockedPartners.map((partner) => (
                <Fragment key={partner.partnerId}>
                  <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
                    <div className="col-md-1 px-0 text-center">
                      {<img src={avatar} alt="avatar" />}
                    </div>
                    <div className="col-md-1 px-0 text-center">
                      <p>{partner.name}</p>
                    </div>
                    <div className="col-md-1 px-0 text-center">
                      <p>{partner.partnerType}</p>
                    </div>
                    <div className="col-md-3 px-0 text-center">
                      <p>{partner.businesseMail}</p>
                    </div>
                    <div className="col-md-1 px-0 text-center">
                      <p>{partner.number}</p>
                    </div>
                    <div className="col-md-3 px-0 text-center">
                      <p className="">{partner.address.split(",")}</p>
                    </div>
                    <div className="col-md-1 px-0 text-center">
                      <p className="">{partner.totalOrders}</p>
                    </div>
                    <div className="col-md-1 px-0 text-center">
                      <p>
                        <img
                          className="mx-2"
                          onClick={() => showUnblockModal(partner)}
                          src={block}
                          alt="block"
                          style={{ cursor: "pointer" }}
                        />
                        <Link to={`/partnerDetails/${partner.partnerId}`}>
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
            </>
          ) : (
            <div>
              <h2 className="text-center">No Blocked Partners</h2>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls d-flex justify-content-between align-items-center px-3 py-2">
            <div className="d-flex align-items-center">
              <label className="me-2">Page Size:</label>
              <select value={pageSize} onChange={handlePageSizeChange} className="form-select">
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
              <span>Page {currentPage} of {totalPages}</span>
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
      </div>
    </>
  );
}
