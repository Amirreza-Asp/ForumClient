import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import BorderButton from "../../../../app/common/buttons/BorderButton";
import Loading from "../../../../app/common/loading/Loading";
import { RemoveSwal } from "../../../../app/common/modals/SwalModal";
import PagenationNums from "../../../../app/common/pagenation/PagenationNums";
import PageSize from "../../../../app/common/table/PageSize";
import { FilterModel, GridQuery } from "../../../../app/models/Queries";
import { useStore } from "../../../../app/stores/store";
import { colors, routes } from "../../../../app/utility/SD";
import UpsertTopicPage from "../upsert/UpsertTopicPage";
import TopicFilter from "./TopicFilter";
import { useHistory } from "react-router-dom";

export interface ITopicFilter {
  title?: string;
  author?: string;
  community?: string;
}

export default observer(function CommunityPagenation() {
  const { topicStore, modalStore } = useStore();
  const { topics, loadingTopics } = topicStore;
  const [query, setQuery] = React.useState<GridQuery>(new GridQuery());
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    topicStore.fetchTopics(query);

    return () => topicStore.clearTopics();
  }, [topicStore.fetchTopics, query]);

  function remove(id: string) {
    RemoveSwal("topic", topicStore.removeTopic, id, () =>
      topicStore.fetchTopics(query)
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
        filtered.push({
          column: key,
          value:
            typeof values[index] !== "object"
              ? values[index]?.toString() ?? ""
              : "",
        });
      }
    });

    console.log(filters);
    setFilter(filters);
    setQuery({ ...query, filters: filtered });
  }

  if (loadingTopics || !topics) return <Loading width={80} />;

  return (
    <section className="pagenation page">
      <div className="bg-item">
        <div className="content">
          <div className="table-actions">
            <PageSize size={topics?.size} handleChangeSize={handleChangeSize} />
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
                  modalStore.openModal(<UpsertTopicPage query={query} />)
                }
              >
                Add <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <TopicFilter
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
                  <th>Author</th>
                  <th>Community</th>
                  <th>View</th>
                  <th>Like</th>
                  <th>DisLike</th>
                  <th>CreatedAt</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {topics?.data.map((item, index) => (
                  <tr key={index}>
                    <td width={"5%"}>{index + 1}</td>
                    <td>
                      <p
                        className="two-line"
                        style={{ width: "calc(100px + 4vw)" }}
                      >
                        {item.title}
                      </p>
                    </td>
                    <td width={"10%"}>
                      <p style={{ width: "calc(100px + 4vw)" }}>
                        {item.authorName}
                      </p>
                    </td>
                    <td width={"20%"}>
                      <p style={{ width: "max-content", marginInline: "auto" }}>
                        {item.community}
                      </p>
                    </td>
                    <td width={"5%"}>{item.view}</td>
                    <td width={"5%"}>{item.like}</td>
                    <td width={"5%"}>{item.disLike}</td>
                    <td width={"15%"}>
                      {format(item.createdAt, "yyyy-MM-dd")}
                    </td>
                    <td width={"20%"}>
                      <div style={{ width: "max-content" }}>
                        <BorderButton
                          icon="fa fa-eye"
                          color={colors.info}
                          className="mx-2"
                          onClick={() => {
                            history.push(routes.TopicDetails(item.id));
                          }}
                        />
                        <BorderButton
                          icon="fa fa-edit"
                          color={colors.edit}
                          className="mx-2"
                          onClick={() => {
                            modalStore.openModal(
                              <UpsertTopicPage query={query} id={item.id} />
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
                Show {topics?.data.length} rows from {topics?.total} items
              </p>
            </div>
            <PagenationNums
              total={topics.total}
              currentPage={topics.page}
              totalPages={topics.totalPages}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
