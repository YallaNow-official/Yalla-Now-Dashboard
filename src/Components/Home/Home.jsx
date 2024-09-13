import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import mainImg from "../../Asssets/white logo-06-061.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate()
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  const leftSideStyle = {
    flex: 1,
    backgroundColor: "#B20404",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const rightSideStyle = {
    flex: 1,
    backgroundColor: "#fff",
    color: "#B20404",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  async function submitForm(values) {
    try {
      setIsLoading(true);
      let {data} = await axios.post("https://yallanow.runasp.net/api/Auth/token", values);
      setIsLoading(false);
      localStorage.setItem("token", data.token);
      navigate('/users')
    } catch (err) {
      setIsLoading(false);
  
      if ( err.response.status === 401) {
        setErrors("You Are Not Authorized"); // Unauthorized error handling
      } else if(err.response.status === 400){
        setErrors("Email or Password is incorrect!");
      }
    }
  }
  const validationSchema = yup.object({
    email: yup.string().email("email  Invalid").required("email required"),
    password: yup.string().required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  return (
    <div style={containerStyle}>
      <div className="col-md-9 users" style={leftSideStyle}>
        <img src={mainImg} alt="mainImg" />
      </div>
      <div style={rightSideStyle}>
        <div className="container animate__animated animate__fadeIn p-4 ">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-7 shadow-lg mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div>
                <div className="p-4">
                  <form
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                    onSubmit={formik.handleSubmit}
                  >
                    {errors !== null ? (
                      <>
                        <div className="alert alert-dark w-50">{errors}</div>
                      </>
                    ) : (
                      ""
                    )}
                    <h3 className="mt-4 pt-5 text-dark">
                      welcome to yalla now
                    </h3>
                    <h3 className="text-muted ">Lets Log in 👋</h3>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4 text-dark">
                      <label
                        style={{
                          textAlign: "left",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                        htmlFor="email"
                      >
                        Email Address :
                      </label>
                      <input
                        id="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="email"
                        type="email"
                        className="form-control"
                      />
                    </div>
                    {formik.errors.email && formik.touched.email ? (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}

                    {/* <!-- Password input --> */}
                    <div className="form-outline mb-4 text-dark">
                      <label
                        htmlFor="password"
                        style={{
                          textAlign: "left",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Password :
                      </label>
                      <input
                        id="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="password"
                        type="password"
                        className="form-control"
                      />
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                      <div className="alert alert-danger mt-2">
                        {formik.errors.password}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="d-flex align-items-center bg-danger">
                      <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type="submit"
                        className="btn main w-100 text-white"
                      >
                        {isLoading ? <i className="fas fa-spin fa-spinner "></i>:'Login'}
                        
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
