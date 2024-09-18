import React, { useCallback, useEffect, useState } from "react";
import avatar from "../../Asssets/Image.png";
import block from "../../Asssets/Block.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BlockModal from "../BlockModal/BlockModal";

export default function PartnerDetails() {
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockPartnerId, setBlockPartnerId] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

const navigate = useNavigate()

  // Show Block modal
  function openBlockModal(partnerId) {
    setBlockPartnerId(partnerId);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockPartnerId(null); // Clear the Partner ID
  }

 
  
  // Handle block submission
  async function handleBlockSubmit(notes) {
    if (blockPartnerId) {
      try {
        const form = new FormData();
        form.append('PartnerId', blockPartnerId);
        form.append('BlockNotes', notes);
        form.append('NewStatus', 3);

        await axios.put(
          'https://yallanow.runasp.net/api/Dashboard/UpdatePartnerStatus',
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // Set Content-Type for FormData
            },
          }
        );

        fetchPartnerData(); // Refresh the Partner data
        closeBlockModal(); // Close the modal after submission
        alert('Partner blocked successfully!');
        navigate('/blockedPartners')
      } catch (err) {
        console.error('Error blocking Partner:', err.response ? err.response.data : err);
        alert('Failed to block Partner!');
      }
    }
  }
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPartnerData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/PartnerDetails?partnerId=${id}&pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setPartnerDetails(data);

      // Calculate total pages based on totalCount
      const totalCount = data?.ordersHistory?.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching partner data:", error);
    } finally {
      setLoading(false);
    }
  }, [id, currentPage, pageSize, token]);




  useEffect(() => {
    fetchPartnerData();
  }, [fetchPartnerData]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <>
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={closeBlockModal}
        onSubmit={handleBlockSubmit}
      />

      {/* Add your PdfModal component if needed */}
      {/* <PdfModal isOpen={isPdfModalOpen} onClose={closePdfModal} pdfUrl={pdfUrl} /> */}

      {/* Add your ScooterModal component if needed */}
      {/* <ScooterModal isOpen={isScooterModalOpen} onClose={closeScooterModal} images={scooterImages} /> */}

      {loading ? (
        <div>Loading... <i className="fas fa-spinner fa-spin"></i></div>
      ) : partnerDetails ? (
        <>
          <div className="users pt-5 mt-5">
            <div className="container d-flex align-items-center users my-5 w-75 me-5 px-0 ">
              <h5 className="mt-5">Partner Details</h5>
            </div>
          </div>
          <div className="container users w-75 me-5 px-0">
            <div className="row my-1">
              <div className="col-md-4 mainUser">
                <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                  <div className="branch p-1 text-center rounded-4 "></div>
                  <h2>{partnerDetails.partnerDetails.totalOrders}</h2>
                  <div className="mx-4 p-0">
                    <p>Total orders </p>
                    <h6>Orders number</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mainUser">
                <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                  <div className="branch p-1 text-center rounded-4 ">
                    <h2>{partnerDetails.partnerDetails.monthOrders}</h2>
                  </div>
                  <div className="mx-4">
                    <p>Month orders </p>
                    <h6>Orders number</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mainUser">
                <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                  <div className="branch p-1 text-center rounded-4 ">
                    <h2>{partnerDetails.partnerDetails.todayOrders}</h2>
                  </div>
                  <div className="mx-4 ">
                    <p>Today orders </p>
                    <h6>Orders number</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center users w-75 me-5 bg-white mt-3 shadow-sm rounded-3">
            <div className="row px-3 d-flex justify-content-center align-items-center mt-3">
              <div className="col-md-1 mainDiv px-0">
                <div>
                  <p>Image</p>
                </div>{" "}
              </div>
              <div className="col-md-2 mainDiv px-0">
                <div>
                  <p>Partner Name</p>
                </div>{" "}
              </div>
              <div className="col-md-1 mainDiv px-0">
                <div>
                  <p>Type</p>
                </div>{" "}
              </div>
              <div className="col-md-2 mainDiv px-0 ">
                <div>
                  <p>Mail</p>
                </div>
              </div>
              <div className="col-md-2 mainDiv px-0">
                <div>
                  <p>Mobile Number</p>
                </div>{" "}
              </div>
              <div className="col-md-1 px-0 ">
                <div className="text-center">
                  <p>Location</p>
                </div>
              </div>
              <div className="col-md-2 px-0 ">
                <div className="text-center">
                  <p>Orders number</p>
                </div>
              </div>
              <div className="col-md-1 px-3 ">
                <div>
                  <p>Action</p>
                </div>{" "}
              </div>
            </div>
            <hr />
            <div className="text-decoration-none text-dark row px-3 d-flex align-items-center">
              <div className="col-md-1 mainDiv px-0">
                {" "}
                <div className="">
                  <img src={avatar} alt="avatar" />
                </div>{" "}
              </div>
              <div className="col-md-2 mainDiv px-0">
                <div>
                  <p>{partnerDetails.partnerDetails.name}</p>
                </div>{" "}
              </div>
              <div className="col-md-1 mainDiv px-0">
                <div>
                  <p>{partnerDetails.partnerDetails.partnerType}</p>
                </div>{" "}
              </div>
              <div className="col-md-2 mainDiv px-0 ">
                <div>
                  <p>{partnerDetails.partnerDetails.businesseMail}</p>
                </div>
              </div>
              <div className="col-md-2 mainDiv px-0">
                <div>
                  <p>{partnerDetails.partnerDetails.number}</p>
                </div>{" "}
              </div>
              <div className="col-md-1 mainDiv px-0">
                <div>
                  <p>{partnerDetails.partnerDetails.address}</p>
                </div>{" "}
              </div>
              <div className="col-md-2 mainDiv px-0">
                <div>
                  <p>{partnerDetails.partnerDetails.ordersNumber}</p>
                </div>{" "}
              </div>
              <div className="col-md-1 px-0 mb-2 ">
                <div className="d-flex justify-content-center align-items-center ">
                 
                  <img
                    className="mx-2"
                    src={block}
                    alt="block"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openBlockModal(partnerDetails.partnerDetails.partnerId)}
                  />
                </div>{" "}
              </div>
            </div>
            <hr />
          </div>
          <div className="container users px-1 w-75 me-5">
            <h5 className="mt-5 p-0">Order History</h5>
          </div>
          <div className="container text-center users w-75 me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
            <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Order ID</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>User Name</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Request Time</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0 ">
                <div>
                  <p>To</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Items</p>
                </div>{" "}
              </div>
              <div className="col-md-1 py-2 px-0">
                <div>
                  <p>Status</p>
                </div>{" "}
              </div>
              <div className="col-md-1 py-2 px-0 ">
                <div className="text-center">
                  <p>Price</p>
                </div>
              </div>
            </div>
            {/* Repeat this row for each order */}
            <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>#00025985</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>John Doe Company</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>August 26, 2023 11:00 AM</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Cairo, Helwan</p>
                </div>{" "}
              </div>
              <div className="col-md-2 py-2 px-0 ">
                <div>
                  <p>
                    burger sandwich , <br />
                    burger meal ,<span className="shade4">, +3 more</span>
                  </p>
                </div>
              </div>
              <div className="col-md-1 py-2 px-0">
                <div>
                  <p>Delivered</p>
                </div>{" "}
              </div>
              <div className="col-md-1 d-flex justify-content-center align-items-center">
                <div className="py-2">
                  <span>EGP 200.00</span>
                </div>
              </div>
               {/* Pagination Controls */}
        
             
            </div>
   
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
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}
