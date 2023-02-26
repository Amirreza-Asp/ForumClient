import React, { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import "./image-upload.css";
import BorderButton from "./../buttons/BorderButton";

interface Props {
  uploading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export default function ImageUploadWidget({ uploading, uploadPhoto }: Props) {
  const [files, setFiles] = React.useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper)
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="image-upload">
      <div className="add-photo">
        <h3>Step 1 - Add photo</h3>
        <PhotoWidgetDropzone setFiles={setFiles} />
      </div>
      <div className="resize-img">
        <h3>Step 2 - Resize image</h3>
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            imagePreview={files[0].preview}
            setCropper={setCropper}
          />
        )}
      </div>
      <div className="submit-photo">
        <h3>Step 3 - Preview & Upload</h3>
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <div className="photo-buttons">
              <BorderButton
                loading={uploading}
                onClick={onCrop}
                icon="fa fa-check"
                color="green"
              />
              <BorderButton
                onClick={() => setFiles([])}
                icon="fa fa-close"
                color="red"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
