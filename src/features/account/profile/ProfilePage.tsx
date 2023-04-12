import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { userImage } from "../../../app/api/image";
import { useParams } from "react-router-dom";
import Loading from "../../../app/common/loading/Loading";
import "./profile.css";
import BorderButton from "../../../app/common/buttons/BorderButton";
import { colors } from "../../../app/utility/SD";
import { format } from "date-fns";
import EditProfile from "../edit/EditProfile";
import ChangePhoto from "../changePhoto/ChangePhoto";

interface Props {
  userName: string;
}

export default observer(function ProfilePage({ userName }: Props) {
  const {
    profileStore: { clearProfile, loadProfile, loadingProfile, profile },
    accountStore: { user },
    modalStore: { openModal },
  } = useStore();

  useEffect(() => {
    if (profile === undefined || profile.userName !== userName) {
      loadProfile(userName!);
    }

    return () => clearProfile();
  }, [loadProfile, userName]);

  const openChangePhoto = () => {
    if (user?.userName == profile?.userName) openModal(<ChangePhoto />);
  };

  return (
    <section className="profile bg-glass border-glass br-5">
      {loadingProfile ? (
        <Loading width={50} containerHeight={393} />
      ) : (
        <>
          <div className="header">
            <div className="top">
              <div className="topics">
                <span>172</span>
                <span>TOPICS</span>
              </div>
              <div className="img" onClick={openChangePhoto}>
                <img
                  src={userImage(profile?.photo?.url, 150, 150)}
                  style={{
                    cursor:
                      user?.userName == profile?.userName
                        ? "pointer"
                        : undefined,
                  }}
                />
              </div>
              <div className="comments">
                <span>2486</span>
                <span>Comments</span>
              </div>
            </div>
            <div className="info">{profile?.fullName}</div>
            <div className="buttons">
              <BorderButton color={colors.info} value="Topics" />
              {user && user.userName === profile?.userName ? (
                <BorderButton
                  color="white"
                  value="Edit"
                  onClick={() => openModal(<EditProfile />)}
                />
              ) : (
                <BorderButton color="white" value="Message" />
              )}
            </div>
          </div>
          <div className="content">
            <ul className="about">
              <li>UserName : {profile?.userName}</li>
              <li>FullName : {profile?.fullName}</li>
              <li>
                Age :{" "}
                {profile?.age ? format(profile?.age, "yyyy-MM-dd") : "undefind"}
              </li>
              <li>Gender : {profile?.isMale ? "Man" : "Woman"}</li>
              <li>PhoneNumber : {profile?.phoneNumber ?? "undefind"}</li>
              <li>Email : {profile?.email ?? "undefind"}</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
});
