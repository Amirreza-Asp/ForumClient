import { format } from "date-fns";
import { ICommunityFilter } from "./CommunityPagenation";

interface Props {
  open: boolean;
  large?: boolean;
  handleFilterClick: (filters: ICommunityFilter) => void;
  filters: ICommunityFilter;
  setFilters: (filters: ICommunityFilter) => void;
}

export default function CommunityFilters({
  open,
  handleFilterClick,
  filters,
  setFilters,
}: Props) {
  function handleClick() {
    if (typeof filters !== "undefined") handleFilterClick(filters);
    else console.log(filters);
  }

  return (
    <>
      <div className={`filters ${open ? "open" : ""}`}>
        <ul className="mt-5 mb-5">
          <li className="item large" key="title">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="mt-10"
              type="text"
              placeholder="Title"
              value={filters?.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
          </li>
          <li className="item large" key="createdAt">
            <label htmlFor="createdAt">CreatedAt</label>
            <input
              id="createdAt"
              type="date"
              placeholder="Family"
              className="mt-10"
              onChange={(e) => {
                setFilters({ ...filters, createAt: new Date(e.target.value) });
              }}
            />
          </li>
        </ul>
        <div className="button">
          <button className="filter-submit" type="button" onClick={handleClick}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
