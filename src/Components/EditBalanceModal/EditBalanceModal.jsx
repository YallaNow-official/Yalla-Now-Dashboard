import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./EditBalanceModal.css";

const validationSchema = Yup.object({
  balance: Yup.number()
    .required("Balance is required")
    .min(0, "Balance cannot be negative")
});

const EditBalanceModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="form-modal-overlay" onClick={onClose}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="form-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <Formik
          initialValues={{ balance: 500 }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted balance:", values.balance); // Debugging line
            onSubmit(values.balance);
            onClose();
            
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="balance">Edit Wallet Balance</label>
                <Field
                  type="number"
                  id="balance"
                  name="balance"
                  className="form-control"
                />
                {errors.balance && touched.balance ? (
                  <div className="error">{errors.balance}</div>
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
                  Update
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

export default EditBalanceModal;
