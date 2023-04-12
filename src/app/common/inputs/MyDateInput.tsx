import React from "react";
import { useField } from "formik";
import { format } from "date-fns";

interface Props {
  name: string;
  label?: string;
}

export default function MyDateInput(props: Props) {
  const [field, meta] = useField(props.name);

  function InputFocused(event: React.FocusEvent<HTMLInputElement, Element>) {
    const label = event.target.previousElementSibling;
    label?.classList.add("selected");
  }

  console.log(field);

  return (
    <>
      <div
        className="text-input"
        style={{ position: "relative", marginTop: "1.7rem" }}
      >
        {props.label && (
          <label
            style={{
              position: "absolute",
              top: "-30px",
              color: "white",
              zIndex: 1,
            }}
            htmlFor={props.name}
          >
            {props.label}
          </label>
        )}
        <input
          type="date"
          {...field}
          name={props.name}
          id={props.name}
          autoComplete="off"
          onFocus={(e) => InputFocused(e)}
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
