import { useEffect, useRef, useState } from "react";
import { Comment } from "../../../app/models/Comment";
import { userImage } from "../../../app/api/image";
import { format } from "date-fns";
import TopicDetailsCommentReaction from "./TopicDetailsCommentReaction";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import TopicDetailsCommentOperations from "./TopicDetailsCommentOperations";

interface Props {
  comment: Comment;
}

export default observer(function TopicDetailsComment({ comment }: Props) {
  const {
    accountStore: { IsLoggedIn, user },
    commentStore: { removeComment },
  } = useStore();

  const canChange =
    IsLoggedIn &&
    (user?.userName === comment.author.userName ||
      user?.role === "admin" ||
      user?.role === "super manager");

  const style = {
    cursor: !canChange ? "default" : "pointer",
  };

  const handleRemove = () => {
    removeComment({ commentId: comment.id }).then(() => {
      setVisible(false);
    });
  };
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        container.current != null &&
        !container.current.contains(e.target)
      )
        setActive(false);
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <li
      key={comment.id}
      className={`comments-item ${!visible ? "removed" : ""}`}
      style={style}
      ref={container}
      onClick={() => setActive(canChange)}
    >
      <TopicDetailsCommentOperations
        handleRemove={handleRemove}
        comment={comment}
        active={active}
      />
      <div className="prof">
        <img src={userImage(comment.author.image, 150, 150)} />
        <p>{comment.author.fullName}</p>
      </div>
      <div className="content">
        <p>{comment.content}</p>
        <div className="footer">
          <TopicDetailsCommentReaction comment={comment} />
          <span className="time">
            {format(comment.createdAt, "yyyy-MM-dd hh:mm")}
          </span>
        </div>
      </div>
    </li>
  );
});
