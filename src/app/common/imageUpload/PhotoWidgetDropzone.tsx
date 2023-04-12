import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
  height: number;
}

export default function PhotoWidgetDropzone({ setFiles, height }: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: height,
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dropzone"
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <i className="fa fa-upload"></i>
      <h4>Drop image here</h4>
    </div>
  );
}
