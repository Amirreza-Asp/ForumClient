import React from "react";
import NeonButton from "../../../app/common/buttons/NeonButton";
import MySelectOption, {
  SelectOptions,
} from "../../../app/common/inputs/MySelectOption";
import MyDateInput from "./../../../app/common/inputs/MyDateInput";
interface Props {
  visible: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

export default function RegisterStep2({
  visible,
  goToNextStep,
  goToPrevStep,
}: Props) {
  const genderOptions: SelectOptions[] = [
    { text: "Men", value: true.toString() },
    { text: "Women", value: false.toString() },
  ];

  return (
    <div className={`step-2 ${visible ? "active" : ""}`}>
      <MyDateInput name="age" placeholder="Age" />
      <MySelectOption name="isMale" options={genderOptions} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <NeonButton
          type="button"
          shadow={false}
          value="prev"
          onClick={goToPrevStep}
        />
        <NeonButton
          type="button"
          shadow={false}
          value="next"
          onClick={goToNextStep}
        />
      </div>
    </div>
  );
}
