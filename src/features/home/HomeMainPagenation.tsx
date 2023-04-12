import { observer } from "mobx-react-lite";

interface Props {
  total: number;
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
}

export default observer(function HomeMainPagenation({
  total,
  currentPage,
  totalPages,
  handlePageClick,
}: Props) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let end = 4;
  if (total < 4) end = total;
  else if (currentPage === 1) end = 4;
  else end = currentPage + 1;

  let start = currentPage - 2;
  if (totalPages === currentPage) start = currentPage - 4;

  const pageNumbers = pages.map((page) => {
    if (page <= end && page > start) {
      return (
        <li
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagenation-list-item ${
            currentPage === page ? "selected" : null
          }`}
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
    <ul className="pagenation-list">
      <li
        className={`pagenation-list-item ${currentPage === 1 ? "disable" : ""}`}
        key="prev"
        onClick={() => handlePrev}
      >
        prev
      </li>
      {pageNumbers}
      <li
        className={`pagenation-list-item ${
          currentPage === totalPages ? "disable" : ""
        }`}
        key={"next"}
        onClick={() => handleNext()}
      >
        next
      </li>
    </ul>
  );
});
