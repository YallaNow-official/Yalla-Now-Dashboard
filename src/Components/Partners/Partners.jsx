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

export default function Partners() {
  const [search, setSearch] = useState("");
  const [allPartners, setAllPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockPartnerId, setBlockPartnerId] = useState(null);
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
  function openAddPartnerModal() {
    setIsAddPartnerModalOpen(true);
  }

  // Close Form modal
  function closeAddPartnerModal() {
    setIsAddPartnerModalOpen(false);
  }

  // Show Block modal
  function openBlockModal(driverId) {
    setBlockPartnerId(driverId);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockPartnerId(null);
  }

  // Handle form submission
  function handleFormSubmit(km) {
    console.log("Km submitted:", km);
    closeAddPartnerModal();
  }

  async function handleBlockSubmit(notes) {
    if (blockPartnerId) {
      try {
        const form = new FormData();
        form.append("PartnerId", blockPartnerId);
        form.append("BlockNotes", notes);
        form.append("NewStatus", 3);

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
        fetchPartners();
        closeBlockModal();
        toast.success("Partner blocked successfully!");
      } catch (err) {
        toast.error(
          "Error blocking Partner:",
          err.response ? err.response.data : err
        );
      }
    }
  }

  // Fetch Partner data from API
  async function fetchPartners() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/Partners?search=${encodeURIComponent(
          search
        )}&pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllPartners(data.data || []);
      console.log(data.data);
      
      setTotalPages(Math.ceil(data.totalCount)); // Update total pages
    } catch (err) {
      console.error(
        "Error fetching Partner data:",
        err.response ? err.response.data : err
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPartners();
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
        isOpen={isAddPartnerModalOpen}
        onClose={closeAddPartnerModal}
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
            <h5 className="mt-5 p-0">Partners</h5>
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
                <button
                  onClick={openAddPartnerModal}
                  className="btn btn-danger main border-0"
                >
                  Add New Partner
                </button>
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
          <div className="col-md-1 px-0 text-center">
            <p>Partner Name</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Type</p>
          </div>
          <div className="col-md-3 px-0 text-center">
            <p>Mail</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Mobile</p>
          </div>
          <div className="col-md-3 px-0 text-center">
            <p>Location</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Order Number</p>
          </div>
          <div className="col-md-1 px-0 text-center">
            <p>Action</p>
          </div>
        </div>

        {loading ? (
          <div>
            Loading... <i className="fas fa-spinner fa-spin"></i>
          </div>
        ) : allPartners.length > 0 ? (
          allPartners.map((Partner) => (
            <Fragment key={Partner.partnerId}>
              <div className="row my-1 py-3 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
                <div className="col-md-1 px-0 text-center">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>{Partner.name}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>{Partner.partnerType}</p>
                </div>
                <div className="col-md-3 px-0 text-center">
                  <p>{Partner.businesseMail}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>{Partner.number}</p>
                </div>
                <div className="col-md-3 px-0 text-center">
                  <p>{Partner.address.split(",")[0]}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>{Partner.totalOrders}</p>
                </div>
                <div className="col-md-1 px-0 text-center">
                  <p>
                    <img
                      className="mx-2"
                      onClick={() => openBlockModal(Partner.partnerId)}
                      src={block}
                      alt="block"
                      style={{ cursor: "pointer" }}
                    />
                    <Link to={`/PartnerDetails/${Partner.partnerId}`}>
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
            <h2>No Partner Available</h2>
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
