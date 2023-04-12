import { format } from "date-fns";
import { CommunityTopicsFilter } from "../../../app/models/Home";
import { useEffect, useState } from "react";
import "./topics-filter.css";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const initSortFilters = [
  { title: "All", value: "", active: true },
  { title: "View", value: "View", active: false },
  { title: "Popular", value: "Like", active: false },
  { title: "Recent", value: "createdAt", active: false },
];

interface Props {
  handleApplyFilter: () => void;
  handleClearFilters: () => void;
}

export default observer(function CommunityDetailsTopicFilters({
  handleApplyFilter,
  handleClearFilters,
}: Props) {
  const [sortFilters, setSortFilters] = useState(initSortFilters);

  const {
    homeStore: { setCommunityTopicsFilters, communityTopicsFilters },
  } = useStore();

  const changeSortedBy = (sortBy: string) => {
    const newSortFilters = [...sortFilters];
    newSortFilters.forEach((item) => {
      item.active = item.value === sortBy;
    });

    setSortFilters(newSortFilters);
    setCommunityTopicsFilters({ ...communityTopicsFilters, sortBy: sortBy });
  };

  return (
    <div className="topics-filter">
      <h3 className="topics-filter-title">Filters</h3>
      <div className="sort">
        <h4>Sort By : </h4>
        <ul>
          {sortFilters.map((item) => (
            <li
              key={item.title}
              className={item.active ? "active" : undefined}
              onClick={() => changeSortedBy(item.value)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="date">
        <div className="from">
          <h4>From : </h4>
          <input
            type="date"
            defaultValue={
              communityTopicsFilters.from
                ? format(communityTopicsFilters.from, "yyyy-MM-dd")
                : undefined
            }
            onChange={(e) =>
              setCommunityTopicsFilters({
                ...communityTopicsFilters,
                from: new Date(e.target.value),
              })
            }
          />
        </div>
        <div className="to">
          <h4>To : </h4>
          <input
            type="date"
            defaultValue={
              communityTopicsFilters.to
                ? format(communityTopicsFilters.to, "yyyy-MM-dd")
                : undefined
            }
            onChange={(e) =>
              setCommunityTopicsFilters({
                ...communityTopicsFilters,
                to: new Date(e.target.value),
              })
            }
          />
        </div>
      </div>
      <div className="posted">
        <h4>Posted by : </h4>
        <input
          type="search"
          placeholder="author"
          defaultValue={
            communityTopicsFilters.author ? communityTopicsFilters.author : ""
          }
          onChange={(e) =>
            setCommunityTopicsFilters({
              ...communityTopicsFilters,
              author: e.target.value,
            })
          }
        />
      </div>
      <div className="title">
        <h4>Title : </h4>
        <input
          type="search"
          placeholder="title"
          defaultValue={
            communityTopicsFilters.title ? communityTopicsFilters.title : ""
          }
          onChange={(e) =>
            setCommunityTopicsFilters({
              ...communityTopicsFilters,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className="btn-container">
        <button type="button" onClick={handleClearFilters}>
          Clear
        </button>
        <button type="button" onClick={handleApplyFilter}>
          Apply
        </button>
      </div>
    </div>
  );
});
