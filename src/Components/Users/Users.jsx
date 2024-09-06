import React, { useEffect, useState } from "react";
import eye from "../../Asssets/eye.png";
import wallet from "../../Asssets/hugeicons_wallet-done-02.png";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  let token = localStorage.getItem("token")
  async function allUsersData() {
    try {
      let { data } = await axios.get(
        "https://yallanow.runasp.net/api/Dashboard/AllUsers?pageNumber=1&pageSize=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllUsers(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  useEffect(() => {
    allUsersData();
  }, []);
  return (
    <>
    <div className="users   pt-5  mt-5 ">
    <div className="container users w-75 me-5 bg-white  mt-5 shadow-sm rounded-3">
        <div className="row ">
          <div className="col-md-2 branshDiv">
            <span className=" py-2 ">User Name:</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className="  py-2">Mail:</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Mobile:</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Gender:</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Wallet:</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Action:</span>
          </div>
          <hr className="mt-2" />
        </div>
        <Link
          to="/userDetails"
          className="row text-decoration-none text-black "
        >
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Jane Smith</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">jane.smith@example.com</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2"> 987-654-3210</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Female</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" badge primary py-2  primary1 rounded-1">
              $200
            </span>
          </div>
          <div className="col-md-2 d-flex justify-content-center align-items-center ">
            <span className=" py-2">
              <img className=" mx-2  " src={eye} alt="" />
            </span>
            <span className=" py-2">
              <img className="mx-2 " src={wallet} alt="" />
            </span>
          </div>
        </Link>
        <hr className="mt-2" />

        <div className="row">
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Jane Smith</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">jane.smith@example.com</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2"> 987-654-3210</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Female</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" badge primary py-2  primary1 rounded-1">
              $200
            </span>
          </div>
          <div className="col-md-2 d-flex justify-content-center align-items-center ">
            <span className=" py-2">
              <img className=" mx-2 " src={eye} alt="" />
            </span>
            <span className=" py-2">
              <img className="mx-2 " src={wallet} alt="" />
            </span>
          </div>
        </div>
        <hr className="mt-2" />

        <div className="row">
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Jane Smith</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">jane.smith@example.com</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2"> 987-654-3210</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" py-2">Female</span>
          </div>
          <div className="col-md-2 branshDiv">
            <span className=" badge primary py-2  primary1 rounded-1">
              $200
            </span>
          </div>
          <div className="col-md-2 d-flex justify-content-center align-items-center ">
            <span className=" py-2">
              <img className=" mx-2 " src={eye} alt="" />
            </span>
            <span className=" py-2">
              <img className="mx-2 " src={wallet} alt="" />
            </span>
          </div>
        </div>
        <hr className="mt-2" />
      </div>
    </div>
      
    </>
  );
}
