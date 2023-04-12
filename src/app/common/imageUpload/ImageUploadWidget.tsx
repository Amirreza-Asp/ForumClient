import React, { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import "./image-upload.css";
import BorderButton from "./../buttons/BorderButton";
import { colors } from "../../utility/SD";

interface Props {
  uploading: boolean;
  uploadPhoto: (file: Blob) => void;
  height?: number;
}

export default function ImageUploadWidget({
  uploading,
  uploadPhoto,
  height = 200,
}: Props) {
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
    <div>
      <div className="image-upload">
        <div className="add-photo">
          <h4>Step 1 - Add photo</h4>
          <PhotoWidgetDropzone height={height} setFiles={setFiles} />
        </div>
        <div className="resize-img">
          <h4>Step 2 - Resize image</h4>
          {files && files.length > 0 && (
            <PhotoWidgetCropper
              height={height}
              imagePreview={files[0].preview}
              setCropper={setCropper}
            />
          )}
        </div>
        <div className="submit-photo">
          <h4>Step 3 - Preview & Upload</h4>
          {files && files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: height, overflow: "hidden" }}
              />
            </>
          )}
        </div>
      </div>
      {files && files.length > 0 && (
        <div className="photo-buttons">
          <BorderButton
            loading={uploading}
            onClick={onCrop}
            icon="fa fa-check"
            color={colors.add}
          />
          <BorderButton
            onClick={() => setFiles([])}
            icon="fa fa-close"
            color={colors.delete}
          />
        </div>
      )}
    </div>
  );
}
