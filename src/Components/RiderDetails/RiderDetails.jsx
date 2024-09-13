import React, { useEffect, useState } from "react";
import block from "../../Asssets/material-symbols_block.png";
import phone from "../../Asssets/Frame60png.png";
import group1 from "../../Asssets/Frame58.png";
import wallet from "../../Asssets/Frame 59.png";
import eye from "../../Asssets/eye2.png";
import ellipce from "../../Asssets/Ellipse 758.png";
import offline from "../../Asssets/Ellipse758.png";
import pdfbutton from "../../Asssets/vscode-icons_file-type-pdf2.png";
import ellipce1 from "../../Asssets/Ellipse759.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PdfModal from "../PdfModal/PdfModal";
import BlockModal from "../BlockModal/BlockModal";
import EditBalanceModal from "../EditBalanceModal/EditBalanceModal";
import ScooterModal from "../ScooterModal/ScooterModal"; // Import the ScooterModal component
import { toast } from "react-toastify";

export default function RiderDetails() {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [isEditBalanceModalOpen, setIsEditBalanceModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isScooterModalOpen, setIsScooterModalOpen] = useState(false); // State for Scooter Modal
  const [blockRiderId, setBlockRiderId] = useState(null);
  const [riderDetails, setRiderDetails] = useState([]);
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
    setBlockRiderId(id);
    setIsBlockModalOpen(true);
  }

  // Close Block modal
  function closeBlockModal() {
    setIsBlockModalOpen(false);
    setBlockRiderId(null); // Clear the rider ID
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

      await getRiderData(); // Refresh rider data
      toast.success("Wallet balance updated successfully!!");
    } catch (err) {
      console.error("Error updating wallet balance:", err);
      alert("Failed to update wallet balance!");
    }
  }

  // Handle block submission
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
        getRiderData(); // Refresh the rider list
        closeBlockModal(); // Close the modal after submission
        toast.success("Rider blocked successfully!");

        navigate("/riders");
      } catch (err) {
        toast.error(
          "Error blocking rider:",
          err.response ? err.response.data : err
        );
      }
    }
  }

  // Fetch rider data
  async function getRiderData() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://yallanow.runasp.net/api/Dashboard/RiderDetails?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRiderDetails(data);
    } catch (err) {
      toast.error(
        "Error fetching data:",
        err.response ? err.response.data : err
      );
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    getRiderData(); // Fetch rider data when component mounts or id/token changes
  }, [token]);

  return (
    <>
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={closePdfModal}
        pdfUrl={pdfUrl}
      />
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={closeBlockModal}
        onSubmit={handleBlockSubmit}
      />
      <EditBalanceModal
        isOpen={isEditBalanceModalOpen}
        onClose={closeEditBalanceModal}
        onSubmit={handleBalanceUpdate}
      />
      <ScooterModal
        isOpen={isScooterModalOpen}
        onClose={closeScooterModal}
        images={scooterImages}
      />
      <div className="users pt-5 mt-5">
        <div className="container  users my-5  w-75 me-5 px-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className=" mt-2">RiderDetails</h5>
              <div className="d-flex align-items-center">
                {riderDetails?.riderDetails?.status === false ? (
                  <>
                    <img className="ms-3 mx-1  " src={offline} alt="" />
                    <span>Blocked</span>
                  </>
                ) : (
                  <>
                    <img className="ms-3 mx-1 " src={ellipce} alt="" />
                    <span>Online</span>
                  </>
                )}

                <img className="ms-3 mx-1 " src={ellipce1} alt="" />
                <span>{riderDetails?.riderDetails?.totalKilos} KM</span>
              </div>
            </div>
            <div>
              <div
                onClick={() =>
                  showModal(riderDetails?.riderDetails?.riderPapers)
                }
                style={{ cursor: "pointer" }}
                className=" bg-white rounded-4  d-flex justify-content-center align-items-center p-2"
              >
                <img className="mx-3" src={pdfbutton} alt="" />
                <h6 className="mx-3">Rider details</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {riderDetails?.riderDetails ? (
        <div className="container users w-75 me-5 px-0">
          <div className="row my-1">
            <div className="col-md-3 mainUser">
              <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                <div className="primary primary1 text-center rounded-circle">
                  <img width={40} src={group1} alt="" />
                </div>

                <div className="mx-4 p-2">
                  <h6>Rides number </h6>
                  <p className="text-muted">
                    {riderDetails?.riderDetails?.ridesNumber} Ride
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                <div className="primary primary1 text-center rounded-circle">
                  <img width={40} src={wallet} alt="" />
                </div>

                <div className="mx-4 py-2">
                  <h6>Wallet balance </h6>
                  <p className="text-muted">
                    {riderDetails?.riderDetails?.walletBalance}
                  </p>
                </div>

                <span className="">
                  <i
                    className="fa-regular fa-pen-to-square solid rounded-2 mt-5 me-0 p-2"
                    style={{ cursor: "pointer" }}
                    onClick={openEditBalanceModal}
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-md-3 mainUser">
              <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                <div className="primary primary2 text-center rounded-circle">
                  <img width={40} src={phone} alt="" />
                </div>

                <div className="mx-4 p-2">
                  <h6>Phone Number </h6>
                  <p className="text-muted">
                    {riderDetails?.riderDetails?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mainUser">
              <div className="bg-white my-1 d-flex align-items-center rounded-3 p-3">
                <div className="primary primary1 p-1 text-center rounded-circle">
                  <img width={40} src={group1} alt="" />
                </div>

                <div
                  className="mx-4 p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    openScooterModal(riderDetails?.riderDetails?.vehicleImages)
                  }
                >
                  <h6>Scooter images </h6>
                  <span className="text-muted">
                    <div className="w-100 px-4 py-2 d-flex align-items-center text-white shade1 rounded-1">
                      <span>
                        <img src={eye} alt="" />
                      </span>
                      <span className="ms-2"> View</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <i className="fas fa-spinner fa-spin"></i>
      )}

      <div className="container text-center users w-75 me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>Image</p>
            </div>
          </div>
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>Rider Name</p>
            </div>
          </div>
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>Scooter type</p>
            </div>
          </div>
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>Scooter color</p>
            </div>
          </div>
          <div className="col-md-2 py-2 px-0">
            <div>
              <p>Number</p>
            </div>
          </div>
          <div className="col-md-1 py-2 px-0">
            <div className="text-center">
              <p>Ride Type</p>
            </div>
          </div>
          <div className="col-md-1 py-2 px-3">
            <div>
              <p>Action</p>
            </div>
          </div>
        </div>
        {riderDetails?.riderDetails ? (
          <>
            <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
              <div className="col-md-2 py-2 px-0">
                <img
                  src={riderDetails?.riderDetails?.imageUrl}
                  className="rounded-circle"
                  width={80}
                  height={80}
                  alt="RiderImage"
                />
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>{riderDetails?.riderDetails?.riderName}</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>{riderDetails?.riderDetails?.scooterType}</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>{riderDetails?.riderDetails?.scooterColor}</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>{riderDetails?.riderDetails?.number}</p>
                </div>
              </div>
              <div className="col-md-1 d-flex justify-content-center align-items-center">
                <div className="py-5">
                  <span className="badge primary mb-2 py-2 primary1 rounded-1">
                    {riderDetails?.riderDetails?.rideType}
                  </span>
                </div>
              </div>
              <div
                className="col-md-1 px-0 text-center"
                style={{ cursor: "pointer" }}
                onClick={() => openBlockModal(id)}
              >
                <div className="d-flex mb-2 justify-content-center align-items-center">
                  <img className="mx-2 " src={block} alt="block" />
                  <span className="text-danger mb-1">Block</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <i className="fas fa-spinner fa-spin"></i>
        )}
      </div>

      <div className="container users px-1 w-75 me-5">
        <h5 className="mt-5 p-0">Rides History</h5>
      </div>

      <div className="container text-center users w-75 me-5 bg-white mt-5 p-3 shadow-sm rounded-3">
        {riderDetails?.rideHistory?.length > 0 ? (
          <>
            <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Number ID</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>User Name</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>From</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>To</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div>
                  <p>Status</p>
                </div>
              </div>
              <div className="col-md-2 py-2 px-0">
                <div className="text-center">
                  <p>Price</p>
                </div>
              </div>
            </div>
            {riderDetails?.rideHistory.length > 0 ? (
              riderDetails?.rideHistory?.map((ride) => (
                <div
                  key={ride?.numberID}
                  className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3"
                >
                  <div className="col-md-2 py-2 px-0">
                    <div>
                      <p>{ride?.numberID}</p>
                    </div>
                  </div>
                  <div className="col-md-2 py-2 px-0">
                    <div>
                      <p>{ride?.userName}</p>
                    </div>
                  </div>
                  <div className="col-md-2 py-2 px-0">
                    <div>
                      <p>{ride?.from}</p>
                    </div>
                  </div>
                  <div className="col-md-2 py-2 px-0">
                    <div>
                      <p>{ride?.to}</p>
                    </div>
                  </div>
                  <div className="col-md-2 py-2 px-0">
                    <div>
                      <p>{ride?.status}</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <div className="py-2">
                      <span className="badge primary py-2 primary1 rounded-1">
                        {ride?.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <i className="fas fa-spinner fa-spin"></i>
            )}
          </>
        ) : (
          <div>
            <h2>No History For This Rider </h2>
          </div>
        )}
      </div>
    </>
  );
}
