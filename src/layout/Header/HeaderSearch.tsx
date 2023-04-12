import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useEffect, useRef, useState } from "react";
import { GridQuery } from "../../app/models/Queries";
import { useHistory } from "react-router-dom";
import { routes } from "../../app/utility/SD";

export default observer(function HeaderSearch() {
  const {
    topicStore: { fetchTopics, topics, clearTopics, loadingTopics },
  } = useStore();

  const input = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [showClear, setShowClear] = useState(false);

  const search = () => {
    const query = new GridQuery();
    query.size = 5;
    query.filters = [{ column: "title", value: input.current!.value }];
    fetchTopics(query);
  };

  const handleClick = (id: string) => {
    clearTopics();
    clear();
    history.push(routes.TopicDetails(id));
  };

  const clear = () => {
    clearTopics();
    input.current!.value = "";
    setShowClear(false);
  };

  const checkValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setShowClear(!!input.current!.value);
    if (input.current!.value && e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="layout-header-nav-search">
      <input
        type="search"
        className="layout-header-nav-search-input"
        placeholder="Search for topics..."
        ref={input}
        onKeyUp={checkValue}
      />
      <div className="layout-header-nav-search-icon" onClick={search}>
        <i className="far fa-search"></i>
      </div>
      <div
        className={`layout-header-nav-search-clear ${
          showClear && !loadingTopics ? "show" : ""
        }`}
        onClick={clear}
      >
        <i className="far fa-close"></i>
      </div>
      <div
        className={`layout-header-nav-search-loading ${
          loadingTopics ? "show" : ""
        }`}
      >
        <i className="far fa-spinner"></i>
      </div>
      {topics?.data && (
        <div className="layout-header-nav-search-result">
          {topics.data.map((item) => (
            <p key={item.id} onClick={() => handleClick(item.id)}>
              {item.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});
