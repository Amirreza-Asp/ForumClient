import TopicCard from "../../topics/card/TopicCard";
import { observer } from "mobx-react-lite";
import { TopicSummary } from "../../../app/models/Topic";
import { useStore } from "../../../app/stores/store";
import CommunityDetailsTopicFilters from "./CommunityDetailsTopicFilters";
import { colors } from "../../../app/utility/SD";

interface Props {
  topics: TopicSummary[];
  setOpenFilter: (open: boolean) => void;
}

export default observer(function CommunityDetailsTopicsList({
  topics,
  setOpenFilter,
}: Props) {
  return (
    <div className="topics-list-container">
      <h3 className="topics-list-container-header">
        <button
          type="button"
          className="filter-button"
          onClick={() => setOpenFilter(true)}
        >
          <i className="fa fa-filter"></i>
        </button>
        Topics
      </h3>
      {topics.length == 0 ? (
        <h3
          style={{ color: colors.info, marginBlock: 20 }}
          className="flex justify-center"
        >
          There is no topic
        </h3>
      ) : (
        <div className="topics-list">
          {topics?.map((item, index) => (
            <div key={item.id}>
              <TopicCard topic={item} />
              {topics.length - 1 !== index && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
