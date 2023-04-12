import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import "./style.css";
import { useEffect, useState } from "react";
import EditProfileStep1 from "./EditProfileStep1";
import EditProfileStep2 from "./EditProfileStep2";
import EditProfileStep3 from "./EditProfileStep3";
import EditProfileSteps from "./EditProfileSteps";
import { format } from "date-fns";
import { UpdateUser } from "../../../app/models/User";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  family: Yup.string().required("Family is required"),
  age: Yup.date().required("age is required"),
});

export default observer(function EditProfile() {
  const [step, setStep] = useState(1);

  function goToNextStep() {
    setStep(Math.min(step + 1, 3));
  }
  function goToPrevStep() {
    setStep(Math.max(step - 1, 1));
  }

  const {
    accountStore: { user, update },
  } = useStore();

  const initValues: UpdateUser = {
    userName: user!.userName,
    name: user!.name,
    family: user!.family,
    age: format(user!.age, "yyyy-MM-dd"),
    email: user!.email,
    isMale: user!.isMale,
    phoneNumber: user!.phoneNumber,
  };

  return (
    <div className="bg-glass border-glass edit-profile">
      <Formik
        validationSchema={validationSchema}
        initialValues={initValues}
        onSubmit={(values) => {
          values.isMale =
            values.isMale === "true"
              ? true
              : values.isMale === "false"
              ? false
              : values.isMale;

          update(values);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form className="form" onSubmit={handleSubmit} autoComplete="off">
            <input name="userName" value={user!.userName} hidden />
            <h2 className="header">Edit profile</h2>
            <EditProfileSteps step={step} setStep={setStep} />
            <ul>
              <EditProfileStep1
                visible={step === 1}
                goToNextStep={goToNextStep}
              />
              <EditProfileStep2
                visible={step === 2}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
              />
              <EditProfileStep3
                visible={step === 3}
                goToPrevStep={goToPrevStep}
                loading={isSubmitting}
              />
            </ul>
          </Form>
        )}
      </Formik>
    </div>
  );
});
