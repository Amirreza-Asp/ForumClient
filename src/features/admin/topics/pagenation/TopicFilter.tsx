import { ITopicFilter } from "./TopicPagenation";

interface Props {
  open: boolean;
  large?: boolean;
  handleFilterClick: (filters: ITopicFilter) => void;
  filters: ITopicFilter;
  setFilters: (filters: ITopicFilter) => void;
}

export default function TopicFilters({
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
          <li className="item" key="title">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="mt-10"
              type="text"
              placeholder="title"
              value={filters?.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
          </li>
          <li className="item" key="auhtor">
            <label htmlFor="auhtor">Author</label>
            <input
              id="auhtor"
              placeholder="author"
              className="mt-10"
              value={filters?.author}
              onChange={(e) => {
                setFilters({ ...filters, author: e.target.value });
              }}
            />
          </li>
          <li className="item" key="community">
            <label htmlFor="community">Community</label>
            <input
              id="community"
              placeholder="community"
              className="mt-10"
              value={filters?.community}
              onChange={(e) => {
                setFilters({ ...filters, community: e.target.value });
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
