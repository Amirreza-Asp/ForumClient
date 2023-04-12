import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { userImage } from "../../../app/api/image";
import ImageUploadWidget from "../../../app/common/imageUpload/ImageUploadWidget";
import PhotoWidgetCropper from "../../../app/common/imageUpload/PhotoWidgetCropper";
import MyFileInput from "../../../app/common/inputs/MyFileInput";
import { useStore } from "../../../app/stores/store";
import "./style.css";

export default observer(function ChangePhoto() {
  const {
    accountStore: { user, loadingUpsertPhoto, upsertPhoto },
  } = useStore();

  function changePhoto(file: Blob) {
    console.log("lfnwejfnkwjfw");
    upsertPhoto(file);
  }

  return (
    <div className="bg-glass border-glass change-photo">
      <div className="image-container">
        <img src={userImage(user?.image, 150, 150)} />
      </div>
      <ImageUploadWidget
        uploading={loadingUpsertPhoto}
        uploadPhoto={(file) => changePhoto(file)}
      />
    </div>
  );
});
