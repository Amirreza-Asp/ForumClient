import React from "react";
import BorderButton from "../../../../app/common/buttons/BorderButton";
import LineButton from "../../../../app/common/buttons/LineButton";
import NeonButton from "../../../../app/common/buttons/NeonButton";
import MyTextInput from "../../../../app/common/inputs/MyTextInput";

interface Props {
  visible: boolean;
  name?: string;
  family?: string;
  goToNextStep: () => void;
  color: string;
}

export default function Step1({ visible, goToNextStep, color }: Props) {
  return (
    <div className={`step-1 ${visible ? "active" : ""}`}>
      <MyTextInput
        name="name"
        placeholder="Name"
        icon="fa-thin fa-address-book"
      />
      <MyTextInput
        name="family"
        placeholder="Family"
        icon="fa-thin fa-address-card"
      />
      <div className="btn-conatiner" style={{ justifyContent: "end" }}>
        <LineButton
          type="button"
          value="next"
          color={color}
          size="md"
          onClick={goToNextStep}
        />
      </div>
    </div>
  );
}
