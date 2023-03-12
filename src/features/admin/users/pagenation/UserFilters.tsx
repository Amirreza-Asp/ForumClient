import { useEffect, useState } from "react";
import { FilterModel } from "../../../../app/models/Queries";
import { IUserFilter } from "./UserPagenation";

interface Props {
  open: boolean;
  handleFilterClick: (filters: IUserFilter) => void;
  filters?: IUserFilter;
  setFilters: (filters: IUserFilter) => void;
}

export default function UserFilters({
  open,
  handleFilterClick,
  filters,
  setFilters,
}: Props) {
  const selectGender =
    filters?.isMale === true.toString() || filters?.isMale === false.toString();

  function RequireNumber(e: React.KeyboardEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    let value = target.value;
    if (
      isNaN(Number.parseInt(value.substring(value.length - 1, value.length)))
    ) {
      target.value = value.substring(0, value.length - 1);
    }
  }

  function handleClick() {
    if (typeof filters !== "undefined") handleFilterClick(filters);
  }

  return (
    <>
      <div className={`filters ${open ? "open" : ""}`}>
        <ul className="mt-5 mb-5">
          <li className="item">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="mt-5"
              type="text"
              placeholder="Name"
              value={filters?.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </li>
          <li className="item">
            <label htmlFor="family">Family</label>
            <input
              id="family"
              type="text"
              className="mt-5"
              placeholder="Family"
              value={filters?.family}
              onChange={(e) =>
                setFilters({ ...filters, family: e.target.value })
              }
            />
          </li>
          <li className="item">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              className="mt-5"
              type="text"
              placeholder="Age"
              value={filters?.age}
              onKeyUp={RequireNumber}
              onChange={(e) =>
                setFilters({ ...filters, age: Number.parseInt(e.target.value) })
              }
            />
          </li>
          <li className="item">
            <label htmlFor="isMale">Gender</label>
            <select
              className="mt-5"
              id="isMale"
              name="isMale"
              style={{
                color: !selectGender ? "rgba(255,255,255,.5)" : undefined,
              }}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  isMale: e.target.value,
                })
              }
            >
              <option selected={!selectGender}>Unknown</option>
              <option
                value={true.toString()}
                selected={filters?.isMale === true.toString()}
              >
                Man
              </option>
              <option
                value={false.toString()}
                selected={filters?.isMale === false.toString()}
              >
                Woman
              </option>
            </select>
          </li>
          <li className="item">
            <label htmlFor="userName">UserName</label>
            <input
              className="mt-5"
              id="userName"
              name="userName"
              type="text"
              placeholder="UserName"
              onChange={(e) =>
                setFilters({ ...filters, userName: e.target.value })
              }
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
