import React from "react";

interface Props {
  step: "step1" | "step2" | "step3" | "step4";
  setStep: (step: "step1" | "step2" | "step3" | "step4") => void;
}

export default function RegisterSteps({ step, setStep }: Props) {
  return (
    <div className="register-steps">
      <ul className="list">
        <li
          onClick={() => setStep("step1")}
          className={`item ${
            step === "step1" ||
            step === "step2" ||
            step === "step3" ||
            step === "step4"
              ? "active"
              : ""
          }`}
        >
          1
        </li>
        <li
          onClick={() => setStep("step2")}
          className={`item ${
            step === "step2" || step === "step3" || step === "step4"
              ? "active"
              : ""
          }`}
        >
          2
        </li>
        <li
          onClick={() => setStep("step3")}
          className={`item ${
            step === "step3" || step === "step4" ? "active" : ""
          }`}
        >
          3
        </li>
        <li
          onClick={() => setStep("step4")}
          className={`item ${step === "step4" ? "active" : ""}`}
        >
          4
        </li>
      </ul>
    </div>
  );
}
