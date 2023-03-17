import React, { useState } from "react";
import "./pagenation.css";
import BorderButton from "../../../../app/common/buttons/BorderButton";
import { useStore } from "../../../../app/stores/store";
import { GridQuery } from "../../../../app/models/Queries";
import Loading from "../../../../app/common/loading/Loading";
import { observer } from "mobx-react-lite";
import UpsertUser from "../upsert/UpsertUserPage";
import { colors } from "../../../../app/utility/SD";
import PageSize from "../../../../app/common/table/PageSize";
import { RemoveSwal } from "../../../../app/common/modals/SwalModal";
import UserFilters from "./UserFilters";
import PagenationNums from "../../../../app/common/pagenation/PagenationNums";
import { FilterModel } from "../../../../app/models/Queries";

export interface IUserFilter {
  name?: string;
  family?: string;
  age?: number;
  isMale?: string;
  userName?: string;
}

export default observer(function UserPagenation() {
  const { userStore, modalStore } = useStore();
  const { fetchUsers, loadingUsers, setLoadingUsers, users, removeUser } =
    userStore;
  const [query, setQuery] = React.useState<GridQuery>(new GridQuery());
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = React.useState<IUserFilter>();

  React.useEffect(() => {
    fetchUsers(query);
  }, [fetchUsers, query]);

  function remove(userName: string) {
    RemoveSwal("user", removeUser, userName, () => setQuery({ ...query }));
  }

  function handlePageClick(page: number) {
    let newQuery = { ...query, page };
    setQuery(newQuery);
  }

  function handleChangeSize(size: number) {
    let newQuery = { ...query, size };
    setQuery(newQuery);
  }

  function handleFilterClick(filters: IUserFilter) {
    let filtered: FilterModel[] = [];
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    keys.forEach((key, index) => {
      if (filters.hasOwnProperty(key) && typeof values[index] !== "object") {
        filtered.push({
          column: key,
          value:
            typeof values[index] !== "object"
              ? values[index]?.toString() ?? ""
              : "",
        });
      }
    });

    setFilter(filters);
    setQuery({ ...query, filters: filtered });
  }

  if (loadingUsers || !users) return <Loading width={80} />;

  return (
    <section className="pagenation page">
      <div className="bg-item">
        <div className="content">
          <div className="table-actions">
            <PageSize size={users.size} handleChangeSize={handleChangeSize} />
            <div
              className="flex justify-center align-center btns-contact"
              style={{ gap: 20 }}
            >
              <button
                className="filter-button"
                type="button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fa-thin fa-filter"></i>
              </button>
              <button
                type="button"
                className="add-button"
                onClick={() =>
                  modalStore.openModal(<UpsertUser query={query} />)
                }
              >
                Add <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <UserFilters
            open={showFilters}
            handleFilterClick={handleFilterClick}
            filters={filter}
            setFilters={setFilter}
          />
          <div className="table-overflow">
            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Name</th>
                  <th>Family</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>UserName</th>
                  <th>Role</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {users?.data.map((item, index) => (
                  <tr key={index}>
                    <td width={"5%"}>
                      {(users.page - 1) * users.size + index + 1}
                    </td>
                    <td width={"20%"}>{item.name}</td>
                    <td width={"20%"}>{item.family}</td>
                    <td width={"5%"}>{item.age}</td>
                    <td width={"10%"}>{item.gender}</td>
                    <td width={"20%"}>{item.userName}</td>
                    <td width={"20%"}>{item.role}</td>
                    <td width={"20%"}>
                      <div style={{ width: "max-content" }}>
                        <BorderButton
                          icon="fa fa-eye"
                          color={colors.info}
                          className="mx-2"
                        />
                        <BorderButton
                          icon="fa fa-edit"
                          color={colors.edit}
                          className="mx-2"
                          onClick={() =>
                            modalStore.openModal(
                              <UpsertUser
                                userName={item.userName}
                                query={query}
                              />
                            )
                          }
                        />
                        <BorderButton
                          icon="fa fa-trash"
                          color={colors.delete}
                          className="mx-2"
                          onClick={() => remove(item.userName)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="items-message">
              <p>
                Show {users?.data.length} rows from {users?.total} items
              </p>
            </div>
            <PagenationNums
              total={users.total}
              currentPage={users.page}
              totalPages={users.totalPages}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
