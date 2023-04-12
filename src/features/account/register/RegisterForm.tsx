import "./register.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Register } from "../../../app/models/User";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import RegisterSteps from "./RegisterSteps";
import { useState } from "react";
import { toast } from "react-toastify";
import RegisterStep5 from "./RegisterStep5";

export default observer(function RegisterForm() {
  const { accountStore } = useStore();
  const [step, setStep] = useState<number>(1);

  function goToNextStep() {
    setStep(Math.min(step + 1, 5));
  }
  function goToPrevStep() {
    setStep(Math.max(step - 1, 1));
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required("UserName is required"),
    name: Yup.string().required("Name is required"),
    family: Yup.string().required("Family is required"),
    age: Yup.string().required("Age is required").nullable(),
    password: Yup.string().required("Password is required"),
    isMale: Yup.bool().required("Please enter your gender"),
  });

  return (
    <section className="register">
      <div className="register-container">
        <div className="register-container-inner">
          <div className="title">
            <h2>Welcome to Arila</h2>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={new Register()}
            onSubmit={(values) => {
              values.isMale = values.isMale === true.toString() ? true : false;
              accountStore.register(values).catch((error) => {
                toast.error(error);
              });
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form className="form" onSubmit={handleSubmit} autoComplete="off">
                <RegisterSteps setStep={setStep} step={step} />
                <RegisterStep1
                  visible={step === 1}
                  goToNextStep={goToNextStep}
                />
                <RegisterStep2
                  visible={step === 2}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
                <RegisterStep3
                  visible={step === 3}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
                <RegisterStep4
                  visible={step === 4}
                  goToPrevStep={goToPrevStep}
                  goToNextStep={goToNextStep}
                />
                <RegisterStep5
                  visible={step === 5}
                  goToPrevStep={goToPrevStep}
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
});
