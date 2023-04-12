import React, { useState } from "react";
import { WarningSwal } from "../../../app/common/modals/SwalModal";
import { useStore } from "../../../app/stores/store";

interface Props {
  feeling?: string;
  likes: number;
  disLikes: number;
  topicId: string;
}

export default function TopicDetailsReaction({
  feeling,
  likes,
  disLikes,
  topicId,
}: Props) {
  const [like, setLike] = useState({ active: feeling == "like", count: likes });
  const [disLike, setDisLike] = useState({
    active: feeling == "dislike",
    count: disLikes,
  });

  const {
    topicStore: { interestTopic },
    accountStore: { IsLoggedIn },
  } = useStore();

  function handleDislike() {
    if (!IsLoggedIn) {
      WarningSwal(
        "You must be logged in for submit reaction to the topic",
        () => {}
      );
      return;
    }

    if (disLike.active) return;

    setDisLike({ active: true, count: disLike.count + 1 });

    if (like.active) setLike({ active: false, count: like.count - 1 });
    interestTopic({ topicId: topicId, interest: false });
  }

  function handleLike() {
    if (!IsLoggedIn) {
      WarningSwal(
        "You must be logged in for submit reaction to the topic",
        () => {}
      );
      return;
    }

    if (like.active) return;

    setLike({ active: true, count: like.count + 1 });

    if (disLike.active) setDisLike({ active: false, count: disLike.count - 1 });
    interestTopic({ topicId: topicId, interest: true });
  }

  return (
    <div className="operations">
      <div
        className={`like ${like.active ? "active" : ""}`}
        onClick={handleLike}
      >
        <i className="fa fa-thumbs-up"></i>
        <span>{like.count}</span>
      </div>
      <div
        className={`dis-like ${disLike.active ? "active" : ""}`}
        onClick={handleDislike}
      >
        <i className="fa fa-thumbs-down"></i>
        <span>{disLike.count}</span>
      </div>
    </div>
  );
}
