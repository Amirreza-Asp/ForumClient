import React from "react";
import MyTextInput from "../../../../app/common/inputs/MyTextInput";
import NeonButton from "../../../../app/common/buttons/NeonButton";
import LineButton from "../../../../app/common/buttons/LineButton";

interface Props {
  visible: boolean;
  goToPrevStep: () => void;
  goToNextStep: () => void;
  color: string;
}

export default function RegisterStep4({
  visible,
  goToPrevStep,
  goToNextStep,
  color,
}: Props) {
  return (
    <div className={`step-4 ${visible ? "active" : ""}`}>
      <MyTextInput
        type="email"
        name="email"
        placeholder="Email (optional)"
        icon="fa-thin fa-envelope"
      />
      <MyTextInput
        name="phoneNumber"
        placeholder="PhoneNumber (optional)"
        icon="fa-thin fa-phone"
      />
      <div className="btn-conatiner">
        <LineButton
          type="button"
          size="md"
          color={color}
          value="prev"
          onClick={goToPrevStep}
        />
        <LineButton
          type="button"
          size="md"
          color={color}
          value="next"
          onClick={goToNextStep}
        />
      </div>
    </div>
  );
}
