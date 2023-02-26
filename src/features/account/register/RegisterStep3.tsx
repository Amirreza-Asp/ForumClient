import MyTextInput from "../../../app/common/inputs/MyTextInput";
import NeonButton from "../../../app/common/buttons/NeonButton";

interface Props {
  visible: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

export default function RegisterStep3({
  visible,
  goToNextStep,
  goToPrevStep,
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
