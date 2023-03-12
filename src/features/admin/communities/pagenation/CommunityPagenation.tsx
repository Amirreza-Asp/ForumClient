import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { communityIcon, communityImage } from "../../../../app/api/image";
import BorderButton from "../../../../app/common/buttons/BorderButton";
import LineButton from "../../../../app/common/buttons/LineButton";
import Loading from "../../../../app/common/loading/Loading";
import { RemoveSwal } from "../../../../app/common/modals/SwalModal";
import PagenationNums from "../../../../app/common/pagenation/PagenationNums";
import PageSize from "../../../../app/common/table/PageSize";
import { FilterModel, GridQuery } from "../../../../app/models/Queries";
import { useStore } from "../../../../app/stores/store";
import { colors } from "../../../../app/utility/SD";
import UpsertCommunityPage from "../upsert/UpsertCommunityPage";
import CommunityFilters from "./CommunityFilter";

export interface ICommunityFilter {
  title?: string;
  createAt?: Date;
}

export default observer(function CommunityPagenation() {
  const { communityStore, modalStore } = useStore();
  const [query, setQuery] = React.useState<GridQuery>(new GridQuery());
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = React.useState({});

  React.useEffect(() => {
    communityStore.fetchCommunities(query);
  }, [communityStore.fetchCommunities, query]);

  function remove(id: string) {
    RemoveSwal("community", communityStore.removeCommunity, id, () =>
      communityStore.fetchCommunities(query)
    );
  }

  function handlePageClick(page: number) {
    let newQuery = { ...query, page };
    setQuery(newQuery);
  }

  function handleChangeSize(size: number) {
    let newQuery = { ...query, size };
    setQuery(newQuery);
  }

  function handleFilterClick(filters: {}) {
    let filtered: FilterModel[] = [];
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    keys.forEach((key, index) => {
      if (filters.hasOwnProperty(key)) {
        if (key !== "createAt") {
          filtered.push({
            column: key,
            value:
              typeof values[index] !== "object"
                ? values[index]?.toString() ?? ""
                : "",
          });
        }
      }
    });

    console.log(filters);
    setFilter(filters);
    setQuery({ ...query, filters: filtered });
  }

  if (communityStore.loadingCommunities || !communityStore.communities)
    return <Loading width={80} />;

  return (
    <section className="pagenation">
      <div className="bg-item">
        <div className="content">
          <div className="table-actions">
            <PageSize
              size={communityStore.communities?.size}
              handleChangeSize={handleChangeSize}
            />
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
                  modalStore.openModal(<UpsertCommunityPage query={query} />)
                }
              >
                Add <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <CommunityFilters
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
                  <th>Title</th>
                  <th>Image</th>
                  <th>CreatedAt</th>
                  <th>Icon</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {communityStore.communities?.data.map((item, index) => (
                  <tr key={index}>
                    <td width={"10%"}>{index + 1}</td>
                    <td width={"20%"}>{item.title}</td>
                    <td width={"15%"}>
                      <img
                        src={communityImage(item.image, 50, 50)}
                        alt={item.title}
                        style={{
                          width: 45,
                          height: 45,
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "50%",
                          boxShadow: "0 0 5px rgba(255,255,255,.2)",
                        }}
                      />
                    </td>

                    <td width={"20%"}>{format(item.createAt, "yyyy-MM-dd")}</td>

                    <td width={"15%"}>
                      <img
                        src={communityIcon(item.icon, 40, 40)}
                        alt={item.title}
                        style={{
                          filter: "invert(100%)",
                          width: 35,
                          height: 35,
                        }}
                      />
                    </td>
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
                          onClick={() => {
                            modalStore.openModal(
                              <UpsertCommunityPage query={query} id={item.id} />
                            );
                          }}
                        />
                        <BorderButton
                          icon="fa fa-trash"
                          color={colors.delete}
                          className="mx-2"
                          onClick={() => remove(item.id)}
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
                Show {communityStore.communities?.data.length} rows from{" "}
                {communityStore.communities?.total} items
              </p>
            </div>
            <PagenationNums
              total={communityStore.communities.total}
              currentPage={communityStore.communities.page}
              totalPages={communityStore.communities.totalPages}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
