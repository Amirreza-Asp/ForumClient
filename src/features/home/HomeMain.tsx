import React, { useEffect, useState } from "react";
import HomeMainFilter from "./HomeMainFilter";
import HomeMainQuestion from "./HomeMainQuestion";
import HomeMainTopicList from "./HomeMainTopicList";
import HomeMainPagenation from "./HomeMainPagenation";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function HomeMain() {
  const {
    homeStore: { mainTopics, loadingMainTopics, fetchMainTopics },
  } = useStore();

  const [query, setQuery] = useState<{ filter: string; page: number }>({
    filter: "All",
    page: 1,
  });

  const handleSort = (sortBy: string) => {
    setQuery({ ...query, filter: sortBy, page: 1 });
  };

  useEffect(() => {
    fetchMainTopics(query);
  }, [fetchMainTopics, query]);

  return (
    <section className="forums">
      <h2>
        <span>F</span>
        <span>o</span>
        <span>r</span>
        <span>u</span>
        <span>m</span>
        <span>s</span>
      </h2>
      <HomeMainFilter handleSort={handleSort} query={query} />
      <HomeMainQuestion />
      <div className="topics">
        <HomeMainTopicList
          topics={mainTopics}
          loadingTopics={loadingMainTopics}
        />
      </div>

      <div className="pagenation">
        <HomeMainPagenation
          total={mainTopics?.total ?? 0}
          currentPage={mainTopics?.page ?? 0}
          handlePageClick={(number) => setQuery({ ...query, page: number })}
          totalPages={mainTopics?.totalPages ?? 0}
        />
      </div>
    </section>
  );
});
