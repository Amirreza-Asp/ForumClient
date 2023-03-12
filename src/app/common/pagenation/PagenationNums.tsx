import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

interface Props {
  total: number;
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
}

export default observer(function PagenationNums({
  total,
  currentPage,
  totalPages,
  handlePageClick,
}: Props) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let end = 3;
  if (total < 3) end = total;
  else if (currentPage === 1) end = 3;
  else end = currentPage + 1;

  let start = currentPage - 2;
  if (totalPages === currentPage) start = currentPage - 3;

  const pageNumbers = pages.map((page) => {
    if (page <= end && page > start) {
      return (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={`${currentPage === page ? "active" : null}`}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  function handleNext() {
    if (currentPage === totalPages) return;

    let nextPage = currentPage + 1;
    handlePageClick(nextPage);
  }

  function handlePrev() {
    if (currentPage === 1) return;

    let prevPage = currentPage - 1;
    handlePageClick(prevPage);
  }

  return (
    <div className="num-pad">
      <ul>
        <li
          key="prev"
          onClick={handlePrev}
          className={`${currentPage === 1 ? "disable" : ""}`}
        >
          <i className="fa fa-angle-left"></i>
        </li>
        {pageNumbers}
        <li
          key="next"
          onClick={handleNext}
          className={`${currentPage === totalPages ? "disable" : ""}`}
        >
          <i className="fa fa-angle-right"></i>
        </li>
      </ul>
    </div>
  );
});
