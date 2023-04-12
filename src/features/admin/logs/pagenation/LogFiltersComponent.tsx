import { format } from "date-fns";
import MySelectOption from "../../../../app/common/inputs/MySelectOption";
import { LogFilters } from "../../../../app/models/Log";
import { SelectOptions } from "../../../../app/models/Shared";

const levelOptions: SelectOptions[] = [
  { text: "All", value: "" },
  { text: "Error", value: "Error" },
  { text: "Warning", value: "Warning" },
  { text: "Information", value: "Information" },
];

interface Props {
  open: boolean;
  large?: boolean;
  handleFilterClick: (filters: LogFilters) => void;
  filters: LogFilters;
  setFilters: (filters: LogFilters) => void;
}

export default function ({
  open,
  large = false,
  handleFilterClick,
  filters,
  setFilters,
}: Props) {
  function handleClick() {
    if (typeof filters !== "undefined") handleFilterClick(filters);
    else console.log(filters);
  }

  return (
    <div className={`filters ${open ? "open" : ""}`}>
      <ul className="mt-5 mb-5">
        <li className="item" key="level">
          <label htmlFor="level">Level</label>
          <select
            className="mt-5"
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          >
            {levelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.text}
              </option>
            ))}
          </select>
        </li>
        <li className="item" key="createdFrom">
          <label htmlFor="createdFrom">From</label>
          <input
            id="createdFrom"
            className="mt-5"
            type="date"
            defaultValue={
              filters.createdFrom
                ? format(filters.createdFrom, "yyyy-MM-dd")
                : undefined
            }
            placeholder="createdFrom"
            onChange={(e) =>
              setFilters({ ...filters, createdFrom: new Date(e.target.value) })
            }
          />
        </li>
        <li className="item" key="createdTo">
          <label htmlFor="createdTo">To</label>
          <input
            id="createdTo"
            className="mt-5"
            type="date"
            placeholder="createdTo"
            defaultValue={
              filters.createdTo
                ? format(filters.createdTo, "yyyy-MM-dd")
                : undefined
            }
            onChange={(e) =>
              setFilters({ ...filters, createdTo: new Date(e.target.value) })
            }
          />
        </li>
        <li className="item" key="contains">
          <label htmlFor="contains">UserName</label>
          <input
            type="text"
            onChange={(e) =>
              setFilters({ ...filters, contains: e.target.value })
            }
            placeholder="userName"
            value={filters.contains}
          />
        </li>
      </ul>
      <div className="button">
        <button className="filter-submit" type="button" onClick={handleClick}>
          Apply
        </button>
      </div>
    </div>
  );
}
