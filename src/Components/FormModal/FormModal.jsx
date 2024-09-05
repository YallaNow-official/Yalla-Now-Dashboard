// src/components/FormModal.js
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa"; // Font Awesome icon for closing
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./FormModal.css"; // Create and import this CSS file for styling

const validationSchema = Yup.object({
  km: Yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
});

const FormModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
          
        <Formik
          initialValues={{ km: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values.km);
            onClose(); // Optionally close the modal after submission
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="km">Change Km Price</label>
                <p>New Price</p>
                <Field
                  type="number"
                  id="km"
                  name="km"
                  className="form-control"
                />
                {errors.km && touched.km ? (
                  <div className="error">{errors.km}</div>
                ) : null}
              </div>
              <div className="d-flex justify-content-end">

              <div>

              <button onClick={()=> onClose()} className="btn btn-white text-main">
                cancel
              </button>
              <button type="submit" className="btn btn-danger main px-4">
                save
              </button>
              </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a div with id 'modal-root' in your public/index.html
  );
};

export default FormModal;
