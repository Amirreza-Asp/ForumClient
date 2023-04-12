import LineButton from "../../../app/common/buttons/LineButton";
import MyDateInput from "../../../app/common/inputs/MyDateInput";
import MySelectOption from "../../../app/common/inputs/MySelectOption";
import MyTextInput from "../../../app/common/inputs/MyTextInput";
import { SelectOptions } from "../../../app/models/Shared";
import { colors } from "../../../app/utility/SD";

interface Props {
  visible: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const genderOptions: SelectOptions[] = [
  { text: "Men", value: true.toString() },
  { text: "Women", value: false.toString() },
];

export default function EditProfileStep2({
  visible,
  goToNextStep,
  goToPrevStep,
}: Props) {
  return (
    <li className={`step-2 ${visible ? "active" : ""}`}>
      <MyDateInput label="Age" name="age" />
      <MySelectOption label="Gender" name="isMale" options={genderOptions} />

      <div className="flex justify-between mt-40">
        <LineButton
          type="button"
          color={colors.edit}
          size="md"
          value="prev"
          onClick={goToPrevStep}
        />
        <LineButton
          type="button"
          color={colors.edit}
          size="md"
          value="next"
          onClick={goToNextStep}
        />
      </div>
    </li>
  );
}
