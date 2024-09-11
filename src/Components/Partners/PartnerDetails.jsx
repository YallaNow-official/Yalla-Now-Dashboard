import React, { useEffect, useState } from "react";
import avatar from "../../Asssets/Image.png";
import eye from "../../Asssets/eye2.png";
import eye1 from "../../Asssets/eye.png";
import block from "../../Asssets/Block.png";
import wallet from "../../Asssets/Frame 59.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BlockModal from "../BlockModal/BlockModal";

export default function PartnerDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockRiderId, setBlockRiderId] = useState(null);
  let token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [isEditBalanceModalOpen, setIsEditBalanceModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isScooterModalOpen, setIsScooterModalOpen] = useState(false); // State for Scooter Modal
  const [blockPartnerId, setBlockPartnerId] = useState(null);
  const [PartnerDetails, setPartnerDetails] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [scooterImages, setScooterImages] = useState([]); // State for scooter images
  const { id } = useParams();

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

  // Show Block modal
  function openBlockModal(id) {
    setBlockPartnerId(id);
    setIsBlockModalOpen(true);
  }
  let navigate = useNavigate();

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockPartnerId(null); // Clear the Partner ID
  }

  // Open Scooter modal
  function openScooterModal(images) {
    setScooterImages(images); // Set the images for the modal
    setIsScooterModalOpen(true);
  }

  // Close Scooter modal
  function closeScooterModal() {
    setIsScooterModalOpen(false);
    setScooterImages([]); // Clear the images
  }

  function openEditBalanceModal() {
    setIsEditBalanceModalOpen(true);
  }

  function closeEditBalanceModal() {
    setIsEditBalanceModalOpen(false);
  }

  // Handle wallet balance update
  async function handleBalanceUpdate(newBalance) {
    if (newBalance === "" || isNaN(newBalance)) {
      alert("Please enter a valid balance.");
      return;
    }

    try {
      console.log("Updating balance to:", newBalance);
      const response = await axios.put(
        `https://yallanow.runasp.net/api/Dashboard/UpdateWallet?DriverId=${id}&Balnce=${newBalance}`, // Use the correct parameter name
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getPartnerData(); // Refresh Partner data
      alert("Wallet balance updated successfully!");
    } catch (err) {
      console.error("Error updating wallet balance:", err);
      alert("Failed to update wallet balance!");
    }
  }

  // Handle block submission
  async function handleBlockSubmit(notes) {
    if (blockPartnerId) {
      try {
        await axios.put(
          `https://yallanow.runasp.net/api/Dashboard/UpdateDriverStatus?DriverID=${id}&BlockNotes=${encodeURIComponent(
            notes
          )}&NewStatus=3`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Partner blocked with notes:", notes);
        getPartnerData(); // Refresh the Partner list
        closeBlockModal(); // Close the modal after submission
        alert("Partner blocked successfully!");
      } catch (err) {
        console.error(
          "Error blocking Partner:",
          err.response ? err.response.data : err
        );
        alert("Failed to block Partner!");
      }
    }
  }
  // Show Block modal
  function openBlockModal(id) {
    setBlockRiderId(id);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockRiderId(null); // Clear the rider ID
  }
  const handleDisplayInfo = () => {
    setIsVisible(true);
  };
  const handleHideInfo = () => {
    setIsVisible(false);
  };
  async function getPartnerData() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/PartnerDetails?partnerId=${id}&pageNumber=1&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPartnerDetails(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }
  async function handleBlockSubmit(notes) {
    if (blockRiderId) {
      try {
        await axios.put(
          `https://yallanow.runasp.net/api/Dashboard/UpdateDriverStatus?DriverID=${id}&BlockNotes=${encodeURIComponent(
            notes
          )}&NewStatus=3`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Rider blocked with notes:", notes);
        getPartnerData(); // Refresh the rider list
        closeBlockModal(); // Close the modal after submission
        alert("Rider blocked successfully!");
        navigate("/riders");
      } catch (err) {
        console.error(
          "Error blocking rider:",
          err.response ? err.response.data : err
        );
        alert("Failed to block rider!");
      }
    }
  }
  useEffect(() => {
    getPartnerData();
  }, [token]);
  console.log(PartnerDetails);

  return (
    
    <>
    <BlockModal
    isOpen={isBlockModalOpen}
    onClose={closeBlockModal}
    onSubmit={handleBlockSubmit}
  />
      {PartnerDetails?.partnerDetails ? (
        <>

<div className="users pt-5 mt-5">

      <div className="container d-flex  align-items-center users my-5  w-75 me-5  px-0 ">
        <h5 className="mt-5">Partner Details</h5>
      </div>
      </div>
        <div className="container users  w-75 me-5 px-0 ">
          <div className="row my-1">
            <div className="col-md-4 mainUser ">
              <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
                <div className=" branch p-1 text-center rounded-4 "></div>
                <h2>{PartnerDetails?.partnerDetails.totalOrders}</h2>

                <div className="mx-4 p-0">
                  <p>Total orders </p>
                  <h6>Orders number</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 mainUser ">
              <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
                <div className=" branch p-1 text-center rounded-4 ">
                  <h2>{PartnerDetails?.partnerDetails.monthOrders}</h2>
                </div>

                <div className="mx-4">
                  <p>Month orders </p>
                  <h6>Orders number</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 mainUser ">
              <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
                <div className=" branch p-1 text-center rounded-4 ">
                  <h2>{PartnerDetails?.partnerDetails.todayOrders}</h2>
                </div>

                <div className="mx-4 ">
                  <p>Today orders </p>
                  <h6>Orders number</h6>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4 mainUser ">
              <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
                <div>
                  <img width={40} src={wallet} alt="" />
                </div>

                <div className="mx-4 p-2">
                  <h6>Menu</h6>

                  <span className="text-muted">
                    <div className=" w-100 px-4 py-1 d-flex align-items-center text-white shade1 rounded-1">
                      <span>
                        <img src={eye} alt="" />
                      </span>
                      <span className="ms-2"> View</span>
                    </div>
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
     
      <div className="container  text-center users w-75  me-5 bg-white mt-3  shadow-sm rounded-3">
        <div className="row px-3  d-flex justify-content-center align-items-center  mt-3">
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>Image</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0">
            <div>
              <p>Partner Name</p>
            </div>{" "}
          </div>
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>Type</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0 ">
            <div>
              <p>Mail</p>
            </div>
          </div>
          <div className="col-md-2 mainDiv  px-0">
            <div>
              <p>Mobile Number</p>
            </div>{" "}
          </div>
          <div className="col-md-1   px-0 ">
            <div className="text-center">
              <p>Location</p>
            </div>
          </div>
          <div className="col-md-2   px-0 ">
            <div className="text-center">
              <p>Orders number</p>
            </div>
          </div>
          <div className="col-md-1  px-3 ">
            <div>
              <p>Action</p>
            </div>{" "}
          </div>
        </div>
        <hr />

        <div className="text-decoration-none text-dark  row px-3 d-flex align-items-center ">
          <div className="col-md-1 mainDiv   px-0">
            {" "}
            <div className="">
              <img src={avatar} alt="avatar" />
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0">
            <div>
              <p>{PartnerDetails?.partnerDetails.name}</p>
            </div>{" "}
          </div>
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>{PartnerDetails?.partnerDetails.partnerType}</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0 ">
            <div>
              <p>{PartnerDetails?.partnerDetails.businesseMail}</p>
            </div>
          </div>
          <div className="col-md-2  mainDiv  px-0">
            <div>
              <p> {PartnerDetails?.partnerDetails.number}</p>
            </div>{" "}
          </div>
          <div className="col-md-1  mainDiv  px-0">
            <div>
              <p>{PartnerDetails?.partnerDetails.address}</p>
            </div>{" "}
          </div>

          <div className="col-md-2   mainDiv  px-0">
            <div>
              <p> {PartnerDetails?.partnerDetails.ordersNumber}</p>
            </div>{" "}
          </div>
          <div className="col-md-1   px-0 mb-2 ">
            <div className="d-flex justify-content-center align-items-center ">
              <img
                id="hover-trigger"
                onClick={handleDisplayInfo}
                src={eye1}
                alt="eye"
              />
              <img className="mx-2 " src={block} alt="block" />

             
            </div>{" "}
          </div>
        </div>
        <hr />
      </div>

      <div className="container users px-1 w-75 me-5">
        <h5 className="mt-5  p-0">Order History</h5>
      </div>

      <div className="container  text-center users w-75  me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 py-2 px-0">
            {" "}
            <div>
              <p>Order ID</p>
            </div>{" "}
          </div>
          <div className="col-md-2 py-2  px-0">
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
          <div className="col-md-1  py-2 px-0 ">
            <div className="text-center">
              <p>Price</p>
            </div>
          </div>
        </div>
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 py-2 px-0">
            {" "}
            <div>
              <p>#00025985</p>
            </div>{" "}
          </div>
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>John Doe Company</p>
            </div>{" "}
          </div>

          <div className="col-md-2 py-2  px-0">
            <div>
              <p>August 26, 2023 11:00 AM</p>
            </div>{" "}
          </div>
          <div className="col-md-2 py-2  px-0">
            <div>
              <p>Cairo,Helwan</p>
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
              <p> Delivered</p>
            </div>{" "}
          </div>
          <div className="col-md-1  d-flex justify-content-center align-items-center">
            <div className="py-2">
              <span>EGP 200.00</span>
            </div>
          </div>
        </div>
      </div>
      </>
       ) : (
        <div>"loading .... "</div>
      )}
    </>
  );
}
