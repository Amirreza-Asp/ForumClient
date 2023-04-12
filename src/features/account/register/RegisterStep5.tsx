import { observer } from "mobx-react-lite";
import { useState } from "react";
import NeonButton from "../../../app/common/buttons/NeonButton";
import ImageUploadWidget from "../../../app/common/imageUpload/ImageUploadWidget";
import MyFileInput from "../../../app/common/inputs/MyFileInput";

interface Props {
  visible: boolean;
  goToPrevStep: () => void;
  isSubmitting: boolean;
}

export default observer(function RegisterStep5({
  visible,
  goToPrevStep,
  isSubmitting,
}: Props) {
  const [imgStepNumber, setImgStepNumber] = useState(1);

  return (
    <div className={`step-5 ${visible ? "active" : ""} ${imgStepNumber}`}>
      <p>Photo (optional)</p>
      <MyFileInput
        name="photo"
        value="Choose"
        setFile={() => console.log("sdklfnsld")}
      />
      <div className="flex justify-between">
        <NeonButton
          type="button"
          shadow={false}
          value="prev"
          onClick={goToPrevStep}
        />
        <NeonButton
          type="submit"
          shadow={false}
          value="submit"
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
});
