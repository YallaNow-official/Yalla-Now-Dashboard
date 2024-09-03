import React, { useState }  from "react";
import avatar from "../../Asssets/Image.png";
import eye from "../../Asssets/eye2.png";
import eye1 from "../../Asssets/eye.png";
import block from "../../Asssets/Block.png";
import wallet from "../../Asssets/Frame 59.png";

export default function PartnerDetails() {
  const [isVisible, setIsVisible] = useState(false);

  const handleDisplayInfo = () => {
    setIsVisible(true);
  };
  const handleHideInfo = () => {
    setIsVisible(false);
  };
  return (
    <>
      <div className="container d-flex  align-items-center users my-5  w-75 me-5  px-0 ">
        <h5 className="mt-5">Partner Details</h5>
       
      </div>
      <div className="container users  w-75 me-5 px-0 ">
        <div className="row my-1">
          <div className="col-md-3 mainUser ">
            <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
              <div className=" branch p-1 text-center rounded-4 ">
                <h2>100</h2>
              </div>

              <div className="mx-4 p-0">
                <p>Total orders </p>
                <h6>Orders number</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mainUser ">
            <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
            <div className=" branch p-1 text-center rounded-4 ">
                <h2>100</h2>
              </div>

              <div className="mx-4">
              <p>Month orders </p>
              <h6>Orders number</h6>
              </div>

             
            </div>
          </div>
          <div className="col-md-3 mainUser ">
            <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
            <div className=" branch p-1 text-center rounded-4 ">
                <h2>100</h2>
              </div>

              <div className="mx-4 ">
                <p>Today orders </p>
                <h6>Orders number</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mainUser ">
            <div className="bg-white my-1 d-flex  align-items-center rounded-3 p-3">
              <div >
                <img  width={40} src={wallet} alt="" />
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

        <div
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
              <p>Burger restaurant</p>
            </div>{" "}
          </div>
          <div className="col-md-1 mainDiv   px-0">
            <div>
              <p>Restaurant</p>
            </div>{" "}
          </div>
          <div className="col-md-2 mainDiv  px-0 ">
            <div>
              <p>name@gmil.com</p>
            </div>
          </div>
          <div className="col-md-2  mainDiv  px-0">
            <div>
              <p> 0123456789</p>
            </div>{" "}
          </div>
          <div className="col-md-1  mainDiv  px-0">
            <div>
              <p> Cairo,Helwan</p>
            </div>{" "}
          </div>
        
        
          <div className="col-md-2   mainDiv  px-0">
            <div>
              <p> 1000</p>
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

              {isVisible && (
                <div id="details">
                  <h2>Details</h2>
                  <p>Additional information here...</p>
                  <button onClick={handleHideInfo}>Close</button>
                </div>
              )}
            </div>{" "}
          </div>
        </div>
        <hr />
      </div>



      <div className="container users px-1 w-75 me-5">
        <h5 className="mt-5  p-0">Order  History</h5>
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
              <p>Mohamed Ahmed</p>
            </div>{" "}
          </div>

          <div className="col-md-2 py-2  px-0">
            <div>
              <p>August 26, 2023
              11:00 AM</p>
            </div>{" "}
          </div>
          <div className="col-md-2 py-2  px-0">
            <div>
              <p>Cairo,Helwan</p>
            </div>{" "}
          </div>
          <div className="col-md-2 py-2 px-0 ">
            <div>
              <p>burger sandwich , <br/> 
              burger meal ,<span className="shade4">, +3 more</span></p>
              

              
            </div>
          </div>
          <div className="col-md-1 py-2 px-0">
            <div>
              <p> Delivered</p>
            </div>{" "}
          </div>
          <div className="col-md-1  d-flex justify-content-center align-items-center">
            <div className="py-2">
              <span >
                EGP 200.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
