import LineButton from "../../../app/common/buttons/LineButton";
import MyTextInput from "../../../app/common/inputs/MyTextInput";
import { colors } from "../../../app/utility/SD";

interface Props {
  visible: boolean;
  goToNextStep: () => void;
}

export default function EditProfileStep1({ visible, goToNextStep }: Props) {
  return (
    <li className={`step-1 ${visible ? "active" : ""}`}>
      <MyTextInput
        name="name"
        placeholder="name"
        icon="fa-thin fa-address-book"
        label="Name"
      />
      <MyTextInput
        name="family"
        placeholder="family"
        icon="fa-thin fa-address-card"
        label="Family"
      />
      <div className="flex justify-end">
        <LineButton
          type="button"
          color={colors.edit}
          size="md"
          value="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </li>
  );
}
