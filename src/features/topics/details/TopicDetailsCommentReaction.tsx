import { observer } from "mobx-react-lite";
import { Comment } from "../../../app/models/Comment";
import { useStore } from "../../../app/stores/store";
import { WarningSwal } from "../../../app/common/modals/SwalModal";

interface Props {
  comment: Comment;
}

export default observer(function TopicDetailsCommentReaction({
  comment,
}: Props) {
  const {
    commentStore: { upsertReaction },
    accountStore: { IsLoggedIn },
  } = useStore();

  const handleClick = (reaction: string) => {
    if (!IsLoggedIn) {
      WarningSwal(
        "You must be logged in for submit reaction to the comment",
        () => {}
      );

      return;
    }

    if (reaction == comment.reaction) return;

    upsertReaction({ commentId: comment.id, reaction: reaction });
  };

  return (
    <div className="reaction">
      <button
        onClick={() => handleClick("like")}
        className={comment.reaction == "like" ? "active" : undefined}
      >
        <span>{comment.like}</span>
        <i className="fa fa-thumbs-up"></i>
      </button>
      <button
        onClick={() => handleClick("dislike")}
        className={comment.reaction == "dislike" ? "active" : undefined}
      >
        <span>{comment.disLike}</span>
        <i className="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
});
