import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Loading from "../../../app/common/loading/Loading";
import { communityIcon, userImage } from "../../../app/api/image";
import parse from "html-react-parser";
import "./topic-details.css";
import { format } from "date-fns";
import TopicDetailsReaction from "./TopicDetailsReaction";
import TopicDetailsCommentsList from "./TopicDetailsCommentsList";
import AddComment from "../../comments/addComment/AddComment";
import ProfilePage from "../../account/profile/ProfilePage";

export default observer(function TopicDetails() {
  const {
    homeStore: { fetchTopicDetailsVM, topicDetailsVM, loadingTopicDetails },
    modalStore: { openModal },
  } = useStore();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchTopicDetailsVM(id);
  }, [fetchTopicDetailsVM, id]);

  if (loadingTopicDetails || !topicDetailsVM) return <Loading width={80} />;

  return (
    <>
      <section className="page topic-details">
        <div className="container">
          <aside className="info">
            <div className="author">
              <img
                src={userImage(topicDetailsVM?.author.photo, 100, 100)}
                onClick={() =>
                  openModal(
                    <ProfilePage userName={topicDetailsVM.author.userName} />
                  )
                }
              />
              <h3>Author : {topicDetailsVM?.author.fullName}</h3>
            </div>
            <div className="other">
              <div className="flex align-center justify-between w-100">
                <p>
                  Community :{" "}
                  <Link to="lfnwlf" style={{ color: "white" }}>
                    {topicDetailsVM?.community.title}
                  </Link>{" "}
                </p>
                <i className="fa fa-users"></i>
              </div>

              <div className="flex align-center justify-between w-100">
                <p>
                  Created at :{" "}
                  {format(
                    new Date(topicDetailsVM!.topic.createdAt),
                    "yyyy-MM-dd"
                  )}
                </p>
                <i className="fa fa-clock"></i>
              </div>
              <div className="flex align-center justify-between w-100">
                <p>View : {topicDetailsVM?.topic.view}</p>
                <i className="fa fa-eye"></i>
              </div>
            </div>
            <div className="operations">
              <button
                type="button"
                className="btn-add-comment"
                onClick={() => openModal(<AddComment topicId={id} />)}
              >
                Add Comment
              </button>
            </div>
          </aside>
          <div className="topic">
            <h4 className="title">{topicDetailsVM?.topic.title}</h4>
            <div className="content">
              {parse(topicDetailsVM!.topic.content)}
            </div>
            <TopicDetailsReaction
              topicId={topicDetailsVM.topic.id}
              likes={topicDetailsVM.topic.like}
              disLikes={topicDetailsVM.topic.disLike}
              feeling={topicDetailsVM.feeling}
            />
          </div>
        </div>
        <div className="comments-container">
          <AddComment topicId={id} />
          <TopicDetailsCommentsList topicId={id} />
        </div>
      </section>
    </>
  );
});
