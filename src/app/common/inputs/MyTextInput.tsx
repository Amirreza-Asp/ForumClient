import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  type?: "text" | "number" | "email" | "password";
  label?: string;
  icon?: string;
  placeholder?: string;
  value?: string;
}

export default function MyTextInput({
  name,
  type = "text",
  label,
  icon,
  placeholder,
}: Props) {
  const [field, meta] = useField(name);

  function InputFocused(event: React.FocusEvent<HTMLInputElement, Element>) {
    const label = event.target.previousElementSibling;
    label?.classList.add("selected");
  }

  return (
    <>
      <div
        className="text-input"
        style={{ marginTop: label ? "3rem" : "1.7rem" }}
      >
        {label && (
          <label className={field.value ? "selected" : ""}>{label}</label>
        )}
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={(e) => InputFocused(e)}
        />
        {icon && <i className={icon}></i>}
      </div>
      {meta.touched && meta.error ? (
        <label style={{ color: "red", marginTop: 10, alignSelf: "baseline" }}>
          {meta.error}
        </label>
      ) : null}
    </>
  );
}
