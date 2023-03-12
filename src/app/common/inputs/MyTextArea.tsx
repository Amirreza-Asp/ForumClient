import { useField } from "formik";
import React from "react";

interface Props {
  name: string;
  placeholder: string;
  rows: number;
}

export default function MyTextArea({ name, placeholder, rows }: Props) {
  const [field, meta] = useField(name);

  return (
    <>
      <div className="my-text-area" style={{ marginBottom: 5 }}>
        <textarea
          {...field}
          placeholder={placeholder}
          rows={rows}
          name={name}
        />
      </div>
      {meta.touched && meta.error ? (
        <label style={{ color: "red", marginTop: 10, alignSelf: "baseline" }}>
          {meta.error}
        </label>
      ) : null}
    </>
  );
}
