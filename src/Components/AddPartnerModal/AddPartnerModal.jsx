import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./AddPartnerModal.css";

// Define the validation schema
const validationSchema = Yup.object({
  partnerId: Yup.string().required("Partner ID is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
});

const AddPartnerModal = ({ isOpen, onClose }) => {
  const [token] = useState(localStorage.getItem("token"));

  if (!isOpen) return null;

  // Define the function to handle form submission
  const handleSubmit = async (values) => {
    try {
      // Extract partnerId from the form values
      const { partnerId, ...data } = values;

      await axios.post(
        `https://yallanow.runasp.net/api/Dashboard/CreateUserForPartner?PartnerId=${partnerId}`, // Include partnerId in the URL
        data, // Send the form values in the body of the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure you replace `token` with your actual token
            "Content-Type": "application/json", // Set content type for JSON payload
            accept: "*/*", // Accept header to match the curl request
          },
        }
      );

      alert("User created successfully!");
      onClose(); // Close the modal after successful submission
    } catch (err) {
      console.error(
        "Error creating user:",
        err.response ? err.response.data : err
      );
      alert("Failed to create user!");
    }
  };

  return ReactDOM.createPortal(
    <div className="form-modal-overlay mt-5 " onClick={onClose}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="form-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <Formik
          initialValues={{
            partnerId: "", // Add initial value for partnerId
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            gender: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-5 pt-3">
              <div className="form-group ">
                <label htmlFor="partnerId">Partner ID</label>
                <Field
                  type="text"
                  id="partnerId"
                  name="partnerId"
                  className="form-control"
                />
                {errors.partnerId && touched.partnerId ? (
                  <div className="error">{errors.partnerId}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="error">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="error">{errors.lastName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="error">{errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Field
                  type="text"
                  id="gender"
                  name="gender"
                  className="form-control"
                />
                {errors.gender && touched.gender ? (
                  <div className="error">{errors.gender}</div>
                ) : null}
              </div>
              <div className="form-modal-buttons">
                <button
                  type="button"
                  className="btn btn-white text-main"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger main px-4">
                  Create User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AddPartnerModal;
