import "./register.css";
import { Formik } from "formik";
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

export default observer(function RegisterForm() {
  const { accountStore } = useStore();
  const [step, setStep] = useState<"step1" | "step2" | "step3" | "step4">(
    "step1"
  );

  const [submit, setSubmit] = useState(false);

  function goToNextStep() {
    switch (step) {
      case "step1":
        setStep("step2");
        break;
      case "step2":
        setStep("step3");
        break;
      case step:
        setStep("step4");
        break;
    }
  }
  function goToPrevStep() {
    switch (step) {
      case "step2":
        setStep("step1");
        break;
      case "step3":
        setStep("step2");
        break;
      case "step4":
        setStep("step3");
        break;
    }
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required("UserName is required"),
    name: Yup.string().required("Name is required"),
    family: Yup.string().required("Family is required"),
    age: Yup.string().required("age is required").nullable(),
    password: Yup.string().required("Password is required"),
    isMale: Yup.bool().required("please enter your gender"),
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
              setSubmit(true);
              values.isMale = values.isMale === true.toString() ? true : false;
              accountStore.register(values).catch((error) => {
                setSubmit(false);
                toast.error(error);
              });
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form className="form" onSubmit={handleSubmit} autoComplete="off">
                <RegisterSteps setStep={setStep} step={step} />
                <RegisterStep1
                  visible={step === "step1"}
                  goToNextStep={goToNextStep}
                />
                <RegisterStep2
                  visible={step === "step2"}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
                <RegisterStep3
                  visible={step === "step3"}
                  goToNextStep={goToNextStep}
                  goToPrevStep={goToPrevStep}
                />
                <RegisterStep4
                  isSubmitting={isSubmitting && false}
                  visible={step === "step4"}
                  goToPrevStep={goToPrevStep}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
});
