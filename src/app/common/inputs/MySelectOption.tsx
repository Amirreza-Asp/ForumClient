import React from "react";
import { useField } from "formik";
import { boolean } from "yup";

export interface SelectOptions {
  text: string;
  value: string | number;
}

interface Props {
  name: string;
  options: SelectOptions[];
  default?: string;
}

export default function MySelectOption(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  const options = props.options.map((opt, index) => {
    return (
      <option key={index} value={opt.value}>
        {opt.text}
      </option>
    );
  });

  return (
    <>
      <div className="select-option" style={{ marginTop: "1.7rem" }}>
        <select
          value={field.value?.toString() || null}
          name={props.name}
          onChange={(e) => helpers.setValue(e.target.value)}
          onBlur={() => helpers.setTouched(true)}
          autoComplete="off"
        >
          {options}
        </select>
      </div>
      {meta.touched && meta.error ? (
        <label style={{ color: "red", marginTop: 10, alignSelf: "baseline" }}>
          {meta.error}
        </label>
      ) : null}
    </>
  );
}
