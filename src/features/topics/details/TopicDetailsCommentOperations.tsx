import { observer } from "mobx-react-lite";
import { Comment } from "../../../app/models/Comment";
import { useStore } from "../../../app/stores/store";
import UpdateComment from "../../comments/updateComment/UpdateComment";

interface Props {
  active: boolean;
  comment: Comment;
  handleRemove: () => void;
}

export default observer(function TopicDetailsCommentOperations({
  active,
  comment,
  handleRemove,
}: Props) {
  const {
    commentStore: { loadingRemoveComment },
    modalStore: { openModal },
  } = useStore();

  return (
    <div className={`comment-operations ${active ? "active" : ""}`}>
      <ul>
        <li
          key={1}
          onClick={() =>
            openModal(
              <UpdateComment commentId={comment.id} content={comment.content} />
            )
          }
        >
          <i className="fa fa-edit"></i>
        </li>
        <li key={2} onClick={() => handleRemove()}>
          {loadingRemoveComment ? (
            <span>
              <i
                className="fa fa-spinner spinner-rotate"
                aria-hidden="true"
              ></i>
            </span>
          ) : (
            <i className="fa fa-trash"></i>
          )}
        </li>
      </ul>
    </div>
  );
});
