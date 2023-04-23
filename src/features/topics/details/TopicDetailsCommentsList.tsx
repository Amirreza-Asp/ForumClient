import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Comment, CommentPagenationQuery } from "../../../app/models/Comment";
import Loading from "../../../app/common/loading/Loading";
import { observer } from "mobx-react-lite";
import TopicDetailsComment from "./TopicDetailsComment";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  topicId: string;
}

export default observer(function TopicDetailsCommentsList({ topicId }: Props) {
  const {
    commentStore: {
      fetchComments,
      clearComments,
      comments,
      loadingComments,
      groupedComments,
    },
  } = useStore();
  const [page, setPage] = useState<number>(2);

  useEffect(() => {
    fetchComments({ topicId: topicId, page: 1 });

    return () => clearComments();
  }, [topicId]);

  const fetchData = () => {
    if (groupedComments.length === 0) return;

    fetchComments({ topicId: topicId, page: page });
    setPage((c) => c + 1);
  };

  if (comments && comments.totalPages === 0) {
    return (
      <div className="empty-comments">
        <h3>There are no comments</h3>
        <p>Enter the first comment for this topic</p>
      </div>
    );
  }

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchData}
        hasMore={
          (!loadingComments &&
            !!comments &&
            comments.page < comments.totalPages) ||
          !comments
        }
        initialLoad={false}
      >
        <ul className="comments">
          {groupedComments.map((comment) => (
            <TopicDetailsComment key={comment.id} comment={comment} />
          ))}
        </ul>
      </InfiniteScroll>
      {(loadingComments || !comments) && (
        <Loading width={20} containerHeight={50} />
      )}
    </>
  );
});
