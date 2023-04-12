import LineButton from "../../../app/common/buttons/LineButton";
import MyTextInput from "../../../app/common/inputs/MyTextInput";
import { colors } from "../../../app/utility/SD";

interface Props {
  visible: boolean;
  goToPrevStep: () => void;
  loading: boolean;
}

export default function EditProfileStep3({
  visible,
  goToPrevStep,
  loading,
}: Props) {
  return (
    <li className={`step-3 ${visible ? "active" : ""}`}>
      <MyTextInput
        label="Email (optional)"
        name="email"
        icon="fa-thin fa-envelope"
      />
      <MyTextInput
        label="PhoneNumber (optional)"
        name="phoneNumber"
        icon="fa-thin fa-phone"
      />

      <div className="flex justify-between">
        <LineButton
          type="button"
          color={colors.edit}
          size="md"
          value="prev"
          onClick={goToPrevStep}
        />
        <LineButton
          type="submit"
          color={colors.edit}
          size="md"
          value="submit"
          loading={loading}
        />
      </div>
    </li>
  );
}
