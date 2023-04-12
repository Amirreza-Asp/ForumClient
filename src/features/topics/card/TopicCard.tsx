import React from "react";
import { TopicSummary } from "../../../app/models/Topic";
import { formatDistanceToNow } from "date-fns";
import { userImage } from "../../../app/api/image";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { routes } from "../../../app/utility/SD";
import "./topic-card.css";

interface Props {
  topic: TopicSummary;
}

export default observer(function TopicCard({ topic }: Props) {
  const history = useHistory();
  function goToTopicDetails() {
    history.push(routes.TopicDetails(topic.id));
  }

  return (
    <div key={topic.id} className="topics-list-item" onClick={goToTopicDetails}>
      <div className="container">
        <img src={userImage(topic.authorPhoto, 100, 100)} />
        <div className="message">
          <h3 className="message-title">{topic.title}</h3>
          <span className="message-details">
            Posted By: {topic.authorName} {formatDistanceToNow(topic.createdAt)}{" "}
            ago
          </span>
        </div>
      </div>
      <div className="right">
        <div className="like">
          <i className="fa fa-thumbs-up"></i>
          <span>{topic.like}</span>
        </div>
        <div className="dislike">
          <i className="fa fa-thumbs-down"></i>
          <span>{topic.disLike}</span>
        </div>
      </div>
    </div>
  );
});
