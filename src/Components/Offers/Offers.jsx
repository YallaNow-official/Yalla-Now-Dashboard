import React from "react";
import offer from "../../Asssets/Group1157571731.png";
import offer1 from "../../Asssets/offer1.png";
import scooter from "../../Asssets/Scooter3.png";
import { Link } from "react-router-dom";

export default function Offers() {
  return (
    <>
    <div className="users   pt-5  mt-5 ">

      <div className="container   users w-75  me-5 mt-5 rounded-3">
        <div className="row ">
          <div className="d-flex p-0 justify-content-between align-items-center  ">
            <h5 className=" users  p-0">Current offers</h5>
            <Link to={"/addOffer"}>
            <button className="btn btn-danger main border-0  ">
              Add offer
            </button>
            </Link>
          </div>
        </div>
    </div>
    </div>

      <div className="container users   w-75  me-5 bg-white mt-3 p-0  rounded-3">
        <div className="row  ">
          <h5 className="mx-4 px-4  pt-3">All users offers</h5>
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
               <div>
                <img className="img-fluid img-fluid"  src={offer} alt="" />
             </div>

            <div className=" text-center  mt-2  ">
              
                <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
               <div>
                <img className="img-fluid img-fluid"  src={offer1} alt="" />
             </div>

            <div className="  text-center  mt-2   ">
              <div>
                {" "}
                <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
               <div>
                <img className="img-fluid img-fluid"  src={offer1} alt="" />
              </div>
 
            <div className="  text-center mt-2  ">
                  <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
        </div>
        <div className="row   ">
          <h5 className="mx-4 px-4  ">Silver users offers</h5>
          <div className="col-md-6     d-flex justify-content-center align-items-center ">
                   <img className="img-fluid "  src={offer} alt="" />
             <div className=" text-center  mt-2   ">
                 <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
          <div className="col-md-6  d-flex justify-content-center align-items-center ">
               <div className="  p-0"> 
                <img className="img-fluid  "  src={offer} alt="" />
              </div>
 
            <div className="  text-center  mt-2   ">
                 {" "}
                <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
        </div>


        <div className="row  ">
          <h5 className="mx-4 px-4  ">golden users offers</h5>
          <div className="col-md-6   d-flex justify-content-center align-items-center ">
            
                   <img className="img-fluid  p-5 me-3"  src={scooter} alt="" />
             <div className=" text-center  mt-2   ">
                 <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
          <div className="col-md-6    d-flex justify-content-center align-items-center ">
                   <img className="img-fluid p-5 me-3"  src={scooter} alt="" />
             <div className=" text-center  mt-2   ">
                 <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
        </div>

        <div className="row ">
          <h5 className="mx-4 px-4  ">Platinum users offers </h5>
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
               <div>
                <img  src={offer1} className="img-fluid " alt="" />
             </div>

            <div className="  text-center  mt-2 ">
           
                <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
          <div className="col-md-6    d-flex justify-content-center align-items-center ">
                   <img className="img-fluid  p-5 me-3"  src={scooter} alt="" />
             <div className=" text-center  mt-2   ">
                 <i className="fa-solid fa-trash text-danger fw-bold fs-4"></i>{" "}
                <p className="text-danger">Delete</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
