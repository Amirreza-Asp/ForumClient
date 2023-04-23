import { observer } from "mobx-react-lite";
import "./unread-comments.css";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import Loading from "../../../app/common/loading/Loading";
import UnreadCommentItem from "./UnreadCommentItem";

export default observer(function UnreadComments() {
  const {
    commentStore: {
      fetchUnreadComments,
      unreadComments,
      loadingUnreadComments,
      clearUnreadComments,
      groupedUnreadComments,
      unreadCommentsCount,
      fetchUnreadCommentsCount,
    },
  } = useStore();

  useEffect(() => {
    fetchUnreadComments(1);

    document
      .querySelector(".ReactModal__Content")
      ?.addEventListener("scroll", (e) => {
        if (
          e.target instanceof Element &&
          e.target.clientHeight + e.target.scrollTop + 10 >=
            e.target.scrollHeight
        ) {
          fetchData();
        }
      });

    return () => {
      clearUnreadComments();
      fetchUnreadCommentsCount();
    };
  }, []);

  function fetchData() {
    const pageNumber = Math.ceil(groupedUnreadComments.length / 5) + 1;
    if (
      loadingUnreadComments ||
      (unreadCommentsCount && Math.ceil(unreadCommentsCount / 5) < pageNumber)
    )
      return;

    fetchUnreadComments(pageNumber);
  }

  const scrollComponent = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.offsetHeight + e.currentTarget.scrollTop >=
      e.currentTarget.scrollHeight
    ) {
      fetchData();
    }
  };

  return (
    <section
      className="unread-comments page"
      onScroll={(e) => scrollComponent(e)}
      id="unread-comments"
    >
      <h2>Unread Comments</h2>
      <hr />
      <ul className="comments">
        {groupedUnreadComments.map((comment) => (
          <UnreadCommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      {(loadingUnreadComments || !unreadComments) && (
        <Loading width={20} containerHeight={20} />
      )}
    </section>
  );
});
