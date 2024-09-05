import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa"; // Font Awesome icon for closing
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./BlockModal.css"; // Ensure you are importing the correct CSS file

const validationSchema = Yup.object({
  note: Yup.string() // Make sure note is required
});

const BlockModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="form-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <Formik
          initialValues={{ note: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values.note); // Pass the note to onSubmit
            onClose(); // Optionally close the modal after submission
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="note">Block</label>
                <p>Are you sure you want to block this rider?</p>
                <Field
                  type="text"
                  id="note"
                  name="note"
                  className="form-control"
                />
                {errors.note && touched.note ? (
                  <div className="error">{errors.note}</div>
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
                <button
                  type="submit"
                  className="btn btn-danger main px-4"
                >
                  Block
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure you have a div with id 'modal-root' in your public/index.html
  );
};

export default BlockModal;
