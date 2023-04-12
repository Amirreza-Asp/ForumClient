import React, { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import {
  CommunityTopicsFilter,
  CommunityTopicsQuery,
} from "../../../app/models/Home";
import { observer } from "mobx-react-lite";
import CommunityDetailsTopicsList from "./CommunityDetailsTopicsList";
import CommunityDetailsTopicFilters from "./CommunityDetailsTopicFilters";
import CommunityDetailsPagenation from "./CommunityDetailsPagenation";
import Loading from "../../../app/common/loading/Loading";

interface Props {
  communityId: string;
}

export default observer(function CommunityDetailsTopics({
  communityId,
}: Props) {
  const {
    homeStore: {
      loadingCommunityTopics,
      communityTopics,
      fetchCommunityTopics,
      communityTopicsFilters,
      setCommunityTopicsFilters,
    },
  } = useStore();

  const [query, setQuery] = useState<CommunityTopicsQuery>({
    communityId: communityId,
  });
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    fetchCommunityTopics(query);
  }, [fetchCommunityTopics, communityId, query]);

  const handleApplyFilter = () => {
    console.log(communityTopicsFilters.from);
    setQuery({
      communityId: query.communityId,
      page: query.page,
      size: query.size,
      ...communityTopicsFilters,
    });
    setOpenFilter(false);
  };

  const clearFilters = () => {
    setCommunityTopicsFilters({});
    setQuery({
      communityId: query.communityId,
      page: query.page,
      size: query.size,
    });
    setOpenFilter(false);
  };

  const handlePagenation = (page: number) => {
    setQuery({ ...query, page: page });
  };

  return (
    <div className="topics">
      <div className="right">
        {loadingCommunityTopics ? (
          <Loading width={40} containerHeight={300} />
        ) : (
          <>
            <CommunityDetailsTopicsList
              topics={communityTopics?.data ?? []}
              setOpenFilter={setOpenFilter}
            />
            <CommunityDetailsPagenation
              currentPage={communityTopics?.page ?? 0}
              totalPages={communityTopics?.totalPages ?? 0}
              total={communityTopics?.total ?? 0}
              handlePageClick={handlePagenation}
            />
          </>
        )}
      </div>
      <div className={`left ${openFilter ? "open" : ""}`}>
        <CommunityDetailsTopicFilters
          handleApplyFilter={handleApplyFilter}
          handleClearFilters={clearFilters}
        />
        {!loadingCommunityTopics && (
          <p className="message">
            Show {communityTopics?.data.length} rows from{" "}
            {communityTopics?.total} items
          </p>
        )}
      </div>
    </div>
  );
});
