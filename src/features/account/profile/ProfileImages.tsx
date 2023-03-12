import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { userImage } from "../../../app/api/image";
import Loading from "../../../app/common/loading/Loading";

interface Props {
  userName: string;
}

export default observer(function ProfileImages({ userName }: Props) {
  const {
    profileStore: { loadPhotos, loadingPhotos, photos },
  } = useStore();

  useEffect(() => {
    loadPhotos(userName);
  }, [userName, loadPhotos]);

  if (loadingPhotos) return <Loading width={50} />;

  return (
    <div className="profile-images">
      <ul className="list">
        {photos &&
          photos.map((photo, index) => (
            <li
              className={`${
                index === 0 ? "prev" : index === 2 ? "next" : "active"
              }`}
            >
              <div
                className={`img-container ${
                  index === 0 ? "prev" : index === 2 ? "next" : "active"
                }`}
              >
                <img src={userImage(photo.url, 300, 600)} alt={photo.name} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
});
