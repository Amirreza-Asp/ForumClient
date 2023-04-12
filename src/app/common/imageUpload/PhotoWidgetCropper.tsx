import React from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
  height: number;
}

export default function PhotoWidgetCropper({
  imagePreview,
  setCropper,
  height,
}: Props) {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: height, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
}
