import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { userImage } from "../../../app/api/image";
import { useParams } from "react-router-dom";
import Loading from "../../../app/common/loading/Loading";

interface Props {
  userName: string;
}

export default observer(function ProfilePage({ userName }: Props) {
  const {
    profileStore: { loadProfile, loadingProfile, profile, mainPhoto },
  } = useStore();

  useEffect(() => {
    if (profile === undefined || profile.userName !== userName) {
      loadProfile(userName);
    }
  }, [loadProfile, userName]);

  if (loadingProfile) return <Loading width={300} />;

  return (
    <section className="profile">
      <div className="header">
        <div className="top">
          <div className="topics">
            <span>172</span>
            <span>TOPICS</span>
          </div>
          <div className="img">
            <img src={userImage(mainPhoto?.url, 300, 300)} />
          </div>
          <div className="comments">
            <span>2486</span>
            <span>Comments</span>
          </div>
        </div>
        <div className="info">{profile?.fullName}</div>
        <div className="buttons">
          <button type="button">Topics</button>
          <button type="button">Message</button>
        </div>
      </div>
      <div className="content">
        <ul className="filters">
          <li className="item">images</li>
          <li className="item">about</li>
          <li className="item">other</li>
        </ul>
        <ul className="images"></ul>
      </div>
    </section>
  );
});
