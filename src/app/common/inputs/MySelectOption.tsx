import React from "react";
import { useField } from "formik";
import { boolean } from "yup";
import { SelectOptions } from "../../models/Shared";

interface Props {
  name: string;
  options: SelectOptions[];
  default?: string;
  className?: string;
  label?: string;
}

export default function MySelectOption(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  const options = props.options.map((opt, index) => {
    return (
      <option key={index} value={opt.value.toString()}>
        {opt.text}
      </option>
    );
  });

  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (
    field.value &&
    typeof field.value == "string" &&
    regexExp.test(field.value.toLowerCase())
  )
    field.value = field.value.toLowerCase();

  return (
    <>
      <div className={`select-option ${props.className}`}>
        {props.label && <label>{props.label}</label>}
        <select
          value={field.value}
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
