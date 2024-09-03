import React, { useState } from "react";
import avatar from "../../Asssets/Image.png";
import actions from "../../Asssets/Action2.png";
import { Link } from "react-router-dom";
export default function TripsOthers() {
  // let [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleDisplayInfo = () => {
    setIsVisible(true);
  };
  const handleHideInfo = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className="container   users w-75  me-5 mt-5 rounded-3">
        <div className="row ">
          <h5 className="mt-5  p-0">Tours & Trips & Offers</h5>
          <div className="d-flex  p-0 justify-content-between d-flex align-items-center">
            <div>
              <input
                // onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control rounded-2 px-3 mx-0 shadow-sm  "
                placeholder="Search by name "
              />
            </div>
            <div className="p-4">
             <button className="btn btn-danger main border-0">Add New </button>
              {isVisible && (
                <div id="details">
                  <div className="w-50 bg-black ">
                    <p>Additional information here...</p>
                    <button onClick={handleHideInfo}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
              <p>Trip Name</p>
            </div>{" "}
          </div>
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>Type</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0 ">
            <div>
              <p>Description</p>
            </div>
          </div>
          <div className="col-md-2 mainDiv  px-0">
            <div>
              <p>Currency</p>
            </div>{" "}
          </div>
          <div className="col-md-2   px-0 ">
            <div className="text-center">
              <p>Price</p>
            </div>
          </div>

          <div className="col-md-2  px-3 ">
            <div>
              <p>Action</p>
            </div>{" "}
          </div>
        </div>
        <hr />

        <Link
          to="/partnerDetails"
          className="text-decoration-none text-dark  row px-3 d-flex align-items-center "
        >
          <div className="col-md-1 mainDiv   px-0">
            {" "}
            <div className="">
              <img src={avatar} alt="avatar" />
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0">
            <div>
              <p>Trip</p>
            </div>{" "}
          </div>
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>Trip</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0 ">
            <div>
              <p>Trip</p>
            </div>
          </div>
          <div className="col-md-2  mainDiv  px-0">
            <div>
              <p>EGP</p>
            </div>{" "}
          </div>        
        
          <div className="col-md-2   mainDiv  px-0">
            <div>
              <p> 1000 EGP</p>
            </div>{" "}
          </div>
          <div className="col-md-2   px-0 mb-2 ">
            <div className="d-flex justify-content-center align-items-center ">
              <img className="mx-2 " src={actions} alt="block" />
              
              {isVisible && (
                <div id="details">
                  <h2>Details</h2>
                  <p>Additional information here...</p>
                  <button onClick={handleHideInfo}>Close</button>
                </div>
              )}
            </div>{" "}
          </div>
        </Link>
        <hr />
      </div>
    </>
  );
}
