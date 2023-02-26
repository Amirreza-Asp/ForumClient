import React from "react";
import { useField } from "formik";
import { format } from "date-fns";

interface Props {
  name: string;
  placeholder?: string;
}

export default function MyDateInput(props: Props) {
  const [field, meta] = useField(props.name);

  function InputFocused(event: React.FocusEvent<HTMLInputElement, Element>) {
    const label = event.target.previousElementSibling;
    label?.classList.add("selected");
  }

  return (
    <>
      <div className="text-input" style={{ marginTop: "1.7rem" }}>
        <input
          type="date"
          {...field}
          name={props.name}
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
