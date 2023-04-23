import { observer } from "mobx-react-lite";
import { UnreadComment } from "../../../app/models/Comment";
import { userImage } from "../../../app/api/image";
import TopicDetailsCommentReaction from "../../topics/details/TopicDetailsCommentReaction";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { routes } from "../../../app/utility/SD";

interface Props {
  comment: UnreadComment;
}

export default observer(function UnreadCommentItem({ comment }: Props) {
  return (
    <li key={comment.id} className={`comments-item`}>
      <div className="topic">
        <Link to={routes.TopicDetails(comment.topicId)}>
          {comment.topicTitle}
        </Link>
      </div>
      <div className="comment">
        <div className="prof">
          <img src={userImage(comment.author.image, 150, 150)} />
          <p>{comment.author ? comment.author.fullName : ""}</p>
        </div>
        <div className="content">
          <p>{comment.content}</p>
          <div className="footer">
            {/* <TopicDetailsCommentReaction comment={comment} /> */}
            <span className="time">
              {format(comment.createdAt, "yyyy-MM-dd hh:mm")}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
});
