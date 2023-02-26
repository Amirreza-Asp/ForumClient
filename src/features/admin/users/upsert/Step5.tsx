import React from "react";
import LineButton from "../../../../app/common/buttons/LineButton";
import NeonButton from "../../../../app/common/buttons/NeonButton";
import ImageUploadWidget from "../../../../app/common/imageUpload/ImageUploadWidget";
import MySelectOption, {
  SelectOptions,
} from "../../../../app/common/inputs/MySelectOption";
import { Role } from "../../../../app/models/Role";

interface Props {
  visible: boolean;
  goToPrevStep: () => void;
  isSubmitting: boolean;
  roles: Role[];
  color: string;
}

export default function Step5({
  visible,
  goToPrevStep,
  isSubmitting,
  roles,
  color,
}: Props) {
  const selectRoles: SelectOptions[] = [];
  roles.forEach((role) => {
    let roleOption: SelectOptions = { text: role.title, value: role.title };
    selectRoles.push(roleOption);
  });

  return (
    <div className={`step-5 ${visible ? "active" : ""}`}>
      <MySelectOption options={selectRoles} name="role" />
      <div className="btn-conatiner">
        <LineButton
          type="button"
          size="md"
          color={color}
          value="prev"
          onClick={goToPrevStep}
        />
        <LineButton
          loading={isSubmitting}
          type="submit"
          size="md"
          color={color}
          value="submit"
        />
      </div>
    </div>
  );
}
