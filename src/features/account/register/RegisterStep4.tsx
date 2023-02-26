import React, { useEffect } from "react";
import MyTextInput from "../../../app/common/inputs/MyTextInput";
import NeonButton from "../../../app/common/buttons/NeonButton";

interface Props {
  visible: boolean;
  goToPrevStep: () => void;
  isSubmitting: boolean;
}

export default function RegisterStep4({
  visible,
  goToPrevStep,
  isSubmitting,
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
          type="submit"
          shadow={false}
          isLoading={isSubmitting}
          value="Submit"
        />
      </div>
    </div>
  );
}
