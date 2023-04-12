import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import "./communities-list.css";
import { GridQuery } from "../../../app/models/Queries";
import Loading from "../../../app/common/loading/Loading";
import { communityImage } from "../../../app/api/image";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { routes } from "../../../app/utility/SD";

export default observer(function CommunitiesList() {
  const {
    homeStore: { communities, fetchCommunities, loadingCommunities },
  } = useStore();

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  if (loadingCommunities) return <Loading width={80} />;

  return (
    <section className="page communities-list">
      <h3 className="title">Communities</h3>
      <ul className="list">
        {communities?.map((item) => (
          <li key={item.id} className="item">
            <Link to={routes.CommunityDetails(item.id)}>
              <img src={communityImage(item.image, 100, 100)} />
              <div className="content">
                <div className="flex justify-between align-center">
                  <h4>
                    {item.title} <span>( {item.topicsCount} topics )</span>
                  </h4>
                  <img
                    src={communityImage(item.image, 100, 100)}
                    className="tiny-img"
                  />
                </div>

                {item.description && <p>{item.description}</p>}
                <span className="date">
                  {format(new Date(item.createAt), "yyyy-MM-dd")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});
