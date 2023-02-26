import React from "react";
import NeonButton from "../../../../app/common/buttons/NeonButton";
import MySelectOption, {
  SelectOptions,
} from "../../../../app/common/inputs/MySelectOption";
import MyDateInput from "../../../../app/common/inputs/MyDateInput";
import LineButton from "../../../../app/common/buttons/LineButton";
interface Props {
  visible: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  color: string;
  isMale?: boolean;
}

export default function RegisterStep2({
  visible,
  goToNextStep,
  goToPrevStep,
  color,
}: Props) {
  const genderOptions: SelectOptions[] = [
    { text: "Man", value: true.toString() },
    { text: "Woman", value: false.toString() },
  ];

  return (
    <div className={`step-2 ${visible ? "active" : ""}`}>
      <MyDateInput name="age" placeholder="Age" />
      <MySelectOption name="isMale" options={genderOptions} />
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
