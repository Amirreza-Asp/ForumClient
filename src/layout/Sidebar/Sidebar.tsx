import "./sidebar.css";
import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import Loading from "../../app/common/loading/Loading";
import { communityIcon, communityImage } from "../../app/api/image";
import { GridQuery } from "../../app/models/Queries";
import { Link, Router } from "react-router-dom";
import { routes } from "../../app/utility/SD";

export default observer(function Sidebar() {
  const {
    layoutStore: { close },
    communityStore: {
      getTopCommunities,
      loadingTopCommunities,
      topCommunities,
    },
  } = useStore();

  useEffect(() => {
    if (!topCommunities || topCommunities.length == 0) getTopCommunities();
  }, [topCommunities]);

  return (
    // <!-- sidebar -->
    <aside className={`sidebar ${close ? "close" : ""}`}>
      <div>
        <Link to={routes.Communities} className="menu-heading">
          Communities
        </Link>
        <hr />
        <ul className="tools">
          {loadingTopCommunities ? (
            <Loading color="cyan" width={30} />
          ) : (
            topCommunities?.map((item) => (
              <li key={item.id}>
                <Link to={routes.CommunityDetails(item.id)}>
                  <img
                    src={communityIcon(item.icon, 40, 40)}
                    alt={item.title}
                  />
                  <span className="sidebar-item-title">{item.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
});
