import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import { toast } from 'react-toastify';

export default function PendingPartners() {
  const [allPendingPartners, setPendingPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch pending Partners data
  async function allPendingPartnersData() {
    setLoading(true);
    try {
      const { data }   = await axios.get(
        'https://yallanow.runasp.net/api/Dashboard/PendingPartners?pageNumber=1&pageSize=10',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingPartners(data.data || []);
    } catch (err) {
      console.error('Error fetching pending Partners data:', err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  }
  
  async function updatePartnerStatus(partnerId, newStatus) {
    try {
      // Create a new FormData object
      const form = new FormData();
      form.append('PartnerId', partnerId);
      form.append('Notes', ''); // Append Notes field as empty string
      form.append('BlockNotes', ''); // Append BlockNotes field as empty string
      form.append('NewStatus', newStatus);
  
      // Send the PUT request with form data
      await axios.put(
        'https://yallanow.runasp.net/api/Dashboard/UpdatePartnerStatus',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure you replace `token` with your actual token
            'accept': '*/*',
          }
        }
      );
      
      console.log(`Partner status updated to ${newStatus}`);
      allPendingPartnersData();
      
      if (newStatus === 1) {
        toast.success("Partner successfully Accepted!");
      } else if (newStatus === 2) {
        toast.success("Partner successfully Rejected!");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error('Partner not found:', err.response.data);
      } else {
      alert('Failed to update partner status!');
    }}
  }
  
  // Handle accept partner
  function handleAccept(partnerId) {
    updatePartnerStatus(partnerId, 1); // Accept partner with status 1
  }

  // Handle reject partner
  function handleReject(partnerId) {
    updatePartnerStatus(partnerId, 2); // Reject partner with status 2
  }

  useEffect(() => {
    allPendingPartnersData();
  }, [token]);

  return (
    <>
    <div className="users   pt-5  mt-5 ">
      <div className="container d-flex align-items-center users my-5 w-75 me-5 px-0">
        <h5>Pending Partners</h5>
      </div>
      <div className="container  text-center users w-75  me-5 bg-white mt-3  shadow-sm rounded-3">
        <div className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3">
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>user Name</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Email</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Mobile Number</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Request Time</p>
            </div>
          </div>
          <div className="col-md-2 px-0">
            <div className="text-center">
              <p>Type</p>
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
        ) : allPendingPartners?.length > 0 ? (
          allPendingPartners.map((partner) => (
            <div
              key={partner.partnerId}
              className="row my-1 border-bottom border-1 border-dark-subtle px-3 d-flex justify-content-center align-items-center border-dark mt-3"
            >
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{partner.name}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{partner.businesseMail}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{partner.number}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p>{partner.createdAt.split('T')[0]}</p>
                </div>
              </div>
              <div className="col-md-2 px-0">
                <div className="text-center">
                  <p className="primary1">{partner.partnerType}</p>
                </div>
              </div>
              <div className="col-md-2 py-3 px-0">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-dark secondary1 border-0 w-100"
                    onClick={() => handleAccept(partner.partnerId)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-dark secondary2 border-0 mx-2 w-100"
                    onClick={() => handleReject(partner.partnerId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2>No Pending Partners</h2>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
