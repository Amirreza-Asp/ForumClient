import "./sidebar.css";
import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import Loading from "../../app/common/loading/Loading";
import { communityIcon, communityImage } from "../../app/api/image";
import { GridQuery } from "../../app/models/Queries";

export default observer(function Sidebar() {
  const {
    layoutStore: { close },
    communityStore: { fetchCommunities, loadingCommunities, communities },
  } = useStore();

  useEffect(() => {
    if (!communities) fetchCommunities(new GridQuery());
  }, [fetchCommunities]);

  return (
    // <!-- sidebar -->
    <aside className={`sidebar ${close ? "close" : ""}`}>
      <div>
        <small className="menu-heading">Categories</small>
        <ul className="tools">
          {loadingCommunities ? (
            <Loading color="cyan" width={30} />
          ) : (
            communities?.data.map((item) => (
              <li key={item.id}>
                <a href="#">
                  <img
                    src={communityIcon(item.icon, 40, 40)}
                    alt={item.title}
                  />
                  <span>{item.title}</span>
                </a>
              </li>
            ))
          )}
        </ul>
        <hr />
        <small className="menu-heading">
          <span>Insights</span>
        </small>
        <ul className="notification">
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-mail-bulk"></i>
                <span>Inbox</span>
              </div>
              <span className="badge">18</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-note"></i>
                <span>Topics</span>
              </div>
              <span className="badge">2</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div>
                <i className="fa-thin fa-comment"></i>
                <span>Comments</span>
              </div>
              <span className="badge">24</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
});
