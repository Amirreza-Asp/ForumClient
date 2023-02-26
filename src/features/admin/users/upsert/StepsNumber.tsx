import React from "react";

interface Props {
  step: "step1" | "step2" | "step3" | "step4" | "step5";
  setStep: (step: "step1" | "step2" | "step3" | "step4" | "step5") => void;
  color: string;
}

export default function StepsNumber({ step, setStep, color }: Props) {
  const active2 = step !== "step1";
  const active3 = active2 && step !== "step2";
  const active4 = active3 && step !== "step3";
  const active5 = active4 && step !== "step4";

  return (
    <div className="upsert-user-steps">
      <ul className="list">
        <li
          onClick={() => setStep("step1")}
          className={`item active`}
          style={{
            borderColor: color,
            background: `radial-gradient(${color}, black)`,
          }}
        >
          1
        </li>
        <li
          onClick={() => setStep("step2")}
          className={`item ${active2 ? "active" : ""}`}
          style={{
            borderColor: color,
            background: active2
              ? `radial-gradient(${color}, black)`
              : "transparent",
          }}
        >
          2
        </li>
        <li
          onClick={() => setStep("step3")}
          className={`item ${active3 ? "active" : ""}`}
          style={{
            borderColor: color,
            background: active3
              ? `radial-gradient(${color}, black)`
              : "transparent",
          }}
        >
          3
        </li>
        <li
          onClick={() => setStep("step4")}
          className={`item ${active4 ? "active" : ""}`}
          style={{
            borderColor: color,
            background: active4
              ? `radial-gradient(${color}, black)`
              : "transparent",
          }}
        >
          4
        </li>
        <li
          onClick={() => setStep("step5")}
          className={`item ${active5 ? "active" : ""}`}
          style={{
            borderColor: color,
            background: active5
              ? `radial-gradient(${color}, black)`
              : "transparent",
          }}
        >
          5
        </li>
      </ul>
    </div>
  );
}
