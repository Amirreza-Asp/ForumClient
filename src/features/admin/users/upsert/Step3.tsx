import MyTextInput from "../../../../app/common/inputs/MyTextInput";
import NeonButton from "../../../../app/common/buttons/NeonButton";
import React from "react";
import LineButton from "../../../../app/common/buttons/LineButton";

interface Props {
  visible: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  color: string;
}

export default function Step3({
  visible,
  goToNextStep,
  goToPrevStep,
  color,
}: Props) {
  return (
    <div className={`step-3 ${visible ? "active" : ""}`}>
      <MyTextInput
        name="userName"
        placeholder="UserName"
        icon="fa-thin fa-user"
      />
      <MyTextInput
        type="password"
        name="password"
        placeholder="Password"
        icon="fa-thin fa-lock"
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
