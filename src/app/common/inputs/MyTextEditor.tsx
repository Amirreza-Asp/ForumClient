import { useField } from "formik";
import React from "react";
import ReactQuill from "react-quill";

interface Props {
  name: string;
  style?: React.CSSProperties;
}

export default function MyTextEditor({ name, style = {} }: Props) {
  const [field, meta, helpers] = useField(name);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  function change(value: string) {
    helpers.setValue(value, true);
  }

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={field.value}
      onChange={change}
      placeholder="content"
      style={style}
    ></ReactQuill>
  );
}
