import React from "react";
import "./Pagination.css"; // Import the CSS for Pagination

function Pagination({ currentPage, totalPages, onPageChange, onPageSizeChange, pageSize }) {
  return (
    <div className="pagination-container d-flex justify-content-between align-items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button pagination-button-prev"
      >
        &laquo; Previous
      </button>
      
      <div className="pagination-info">
        <span>Page {currentPage} of {totalPages}</span>
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button pagination-button-next"
      >
        Next &raquo;
      </button>
      
      <div className="page-size-selector">
        <label htmlFor="pageSize" className="form-label">Items per page:</label>
        <select
          id="pageSize"
          onChange={onPageSizeChange}
          value={pageSize}
          className="form-select"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
