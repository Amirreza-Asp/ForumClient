import Loading from "../../app/common/loading/Loading";
import TopicCard from "../topics/card/TopicCard";
import { observer } from "mobx-react-lite";
import { Pagenation } from "../../app/models/Shared";
import { TopicSummary } from "../../app/models/Topic";

interface Props {
  topics?: Pagenation<TopicSummary>;
  loadingTopics: boolean;
}

export default observer(function HomeTopicList({
  topics,
  loadingTopics,
}: Props) {
  if (loadingTopics) return <Loading width={50} />;

  return (
    <ul className="topics-list">
      {topics?.data.map((topic, index) => (
        <li key={topic.id}>
          <TopicCard key={topic.id} topic={topic} />
          {index !== topics.data.length - 1 && <hr key={index} />}
        </li>
      ))}
    </ul>
  );
});
