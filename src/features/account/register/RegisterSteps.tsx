import React from "react";

interface Props {
  step: number;
  setStep: (step: number) => void;
}

export default function RegisterSteps({ step, setStep }: Props) {
  return (
    <div className="register-steps">
      <ul className="list">
        <li onClick={() => setStep(1)} className={`item active`}>
          1
        </li>
        <li
          onClick={() => setStep(2)}
          className={`item ${step > 1 ? "active" : ""}`}
        >
          2
        </li>
        <li
          onClick={() => setStep(3)}
          className={`item ${step > 2 ? "active" : ""}`}
        >
          3
        </li>
        <li
          onClick={() => setStep(4)}
          className={`item ${step > 3 ? "active" : ""}`}
        >
          4
        </li>
        <li
          onClick={() => setStep(5)}
          className={`item ${step > 4 ? "active" : ""}`}
        >
          5
        </li>
      </ul>
    </div>
  );
}
