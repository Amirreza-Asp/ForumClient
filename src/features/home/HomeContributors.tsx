import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { userImage } from "../../app/api/image";
import ProfilePage from "../account/profile/ProfilePage";

export default observer(function HomeContributors() {
  const {
    homeStore: {
      topContributors,
      laodingTopContributors,
      fetchTopContributors,
    },
    modalStore: { openModal },
  } = useStore();

  useEffect(() => {
    if (!topContributors) fetchTopContributors();
  }, [fetchTopContributors]);

  if (laodingTopContributors) return <p></p>;

  return (
    <div className="cont">
      <h2>Top Contributors</h2>
      <p className="contributors-para">
        People who started the most discussions on Arila
      </p>
      <ul className="contributors-people">
        {topContributors?.map((item) => (
          <li className="contributors-people-person">
            <img
              style={{ cursor: "pointer" }}
              src={userImage(item.image, 200, 200)}
              onClick={() =>
                openModal(<ProfilePage userName={item.userName} />)
              }
            />
            <p>{item.fullName}</p>
            <i className="fa-thin fa-comment-dots"></i>
            <span>{item.topicsCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
