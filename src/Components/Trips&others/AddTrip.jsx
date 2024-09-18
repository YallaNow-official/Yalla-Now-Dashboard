import React from "react";
import addPic from "../../Asssets/pic.png";
export default function AddTrip() {
  return (
    <>
      <div className="container w-75 me-5 mt-5">
        <h5>partner Details</h5>
      </div>
      <div className="container bg-white users  w-75 p-5  me-5 mt-5 rounded-3">
        {/* {errors ? <div>{errors}</div> : ""} */}

        <form>
          <div className="row  ">
            <div className="d-flex users  gap-2  mt-3 justify-content-between">
              <div className="col-md-6 users">
                <label htmlFor="trip">trip</label>
                <input  className="form-control  p-2 mt-1 rounded-3  fa-i-cursor"
                name="trip"
                type="text"
                placeholder="Title" />
              </div>
              <div className="col-md-6 users">
                <span>Category</span>
                <select
                  as="select"
                  className="form-select p-2 mt-1 rounded-3   fa-i-cursor"
                  aria-label="Disabled select example"
                  id="TripCategory"
                  name="TripCategory"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.RecipeCategory}
                >
                  <option value="">Category</option>
                  <option value="Arabian">Arabian</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Chines">Chinese</option>
                </select>
              </div>
            </div>
            <div className="w-100 mt-4">
              <input
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.RecipeName}
                className="form-control   py-4"
                name="Title"
                type="text"
                placeholder="Description"
              />

              {/* {formik.errors.RecipeName && formik.touched.RecipeName ? (
                <div className="alert alert-dark  w-50 mt-2">
                  {formik.errors.RecipeName}
                </div>
              ) : (
                ""
              )} */}

<div className="d-flex users  gap-2  mt-3 justify-content-between">
              <div className="col-md-6 users">
              <span>Country</span>
                <select
                  as="select"
                  className="form-select p-2 mt-1 rounded-3   fa-i-cursor"
                  aria-label="Disabled select example"
                  id="TripCategory"
                  name="TripCategory"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.RecipeCategory}
                >
                  <option value="">Cairo</option>
                  <option value="Arabian">Arabian</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Chines">Chinese</option>
                </select>
              </div>
              <div className="col-md-6 users">
                <span>Category</span>
                <select
                  as="select"
                  className="form-select p-2 mt-1 rounded-3   fa-i-cursor"
                  aria-label="Disabled select example"
                  id="TripCategory"
                  name="TripCategory"
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.RecipeCategory}
                >
                  <option value="">Category</option>
                  <option value="Arabian">Arabian</option>
                  <option value="Asian">Asian</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Chines">Chinese</option>
                </select>
              </div>
            </div>
              {/* {formik.errors.RecipeDescription &&
              formik.touched.RecipeDescription ? (
                <div className="alert alert-dark  w-50 mt-2">
                  {formik.errors.RecipeDescription}
                </div>
              ) : (
                ""
              )} */}

              {/* <div className="d-flex users  gap-3  mt-3 justify-content-between">
                <div className="col-md-6 users">
                  <h6>Trip category</h6>
                  <select
                    as="select"
                    className="form-select p-3 mt-4 rounded-4    fa-i-cursor"
                    aria-label="Disabled select example"
                    id="TripCategory"
                    name="TripCategory"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={formik.values.RecipeCategory}
                  >
                    <option value="">Scooter</option>
                    <option value="Arabian">Arabian</option>
                    <option value="Asian">Asian</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Chines">Chinese</option>
                  </select>
                </div>
                <div className="col-md-6 users">
                  <h6>Users</h6>
                  <select
                    as="select"
                    className="form-select p-3 mt-4 rounded-4   fa-i-cursor"
                    aria-label="Disabled select example"
                    id="TripCategory"
                    name="TripCategory"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={formik.values.RecipeCategory}
                  >
                    <option value="">Silver</option>
                    <option value="Arabian">Arabian</option>
                    <option value="Asian">Asian</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Chines">Chinese</option>
                  </select>
                </div>
              </div> */}

              <div className="d-flex users  gap-2  mt-3 justify-content-between">
                <div className="col-md-6 users">
                <label htmlFor="Location">Location</label>
                <input  className="form-control  p-2 mt-1 rounded-3  fa-i-cursor"
                name="Location"
                type="text"
                placeholder="Location" />
                </div>
                <div className="col-md-6 users">
                <label htmlFor="Duration">Duration</label>
                <input  className="form-control  p-2 mt-1 rounded-3  fa-i-cursor"
                name="Duration"
                type="text"
                placeholder="Duration" />
                </div>
              </div>
              <div className="d-flex users  gap-2  mt-3 justify-content-between">
                <div className="col-md-6 users">
                <label htmlFor="Currency">Currency</label>
                <input  className="form-control  p-2 mt-1 rounded-3  fa-i-cursor"
                name="Currency"
                type="text"
                placeholder="Currency" />
                </div>
                <div className="col-md-6 users">
                <label htmlFor="Price">Price</label>
                <input  className="form-control  p-2 mt-1 rounded-3  fa-i-cursor"
                name="Price"
                type="text"
                placeholder="Price" />
                </div>
              </div>
              {/* {isLoading ? (
                <>
                  <button className="btn mt-3 w-50 secondary text-center text-white">
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="btn btn-dark mt-3 w-50 secondary text-center text-white"
                >
                  Next {">"}{" "}
                </button>
              )} */}
            </div>
          </div>
          <div className="row gap-3">
            <div className="mt-4 d-flex   align-items-center">
              <div>
                <label htmlFor="img" style={{ cursor: "pointer" }}>
                  <img src={addPic} alt="Select Image" />
                </label>
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  // onChange={(event) => handleImageChange(event, formik)}
                  style={{ display: "none" }}
                />
                {/* {formik.errors.img && formik.touched.img ? (
                <div className="alert alert-dark  w-50 mt-2">
                  {formik.errors.img}
                </div>
              ) : (
                ""
              )} */}
              </div>
              <div>
              <div>
                <label htmlFor="img" style={{ cursor: "pointer" }}>
                  <img src={addPic} className="w-75 ms-3" alt="Select Image" />
                </label>
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  // onChange={(event) => handleImageChange(event, formik)}
                  style={{ display: "none" }}
                />
                {/* {formik.errors.img && formik.touched.img ? (
                <div className="alert alert-dark  w-50 mt-2">
                  {formik.errors.img}
                </div>
              ) : (
                ""
              )} */}
              </div>
              </div>
              <div>
              <div>
                <label htmlFor="img" style={{ cursor: "pointer" }}>
                  <img src={addPic} className="w-75" alt="Select Image" />
                </label>
                <input
                  id="img"
                  type="file"
                  accept="image/*"
                  // onChange={(event) => handleImageChange(event, formik)}
                  style={{ display: "none" }}
                />
                {/* {formik.errors.img && formik.touched.img ? (
                <div className="alert alert-dark  w-50 mt-2">
                  {formik.errors.img}
                </div>
              ) : (
                ""
              )} */}
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
