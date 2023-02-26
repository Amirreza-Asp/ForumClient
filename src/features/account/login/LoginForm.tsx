import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import "./login.css";
import MyTextInput from "../../../app/common/inputs/MyTextInput";
import NeonButton from "../../../app/common/buttons/NeonButton";

export default observer(function LoginForm() {
  const { accountStore } = useStore();

  const validationSchema = Yup.object({
    userName: Yup.string().required("UserName is required"),
    password: Yup.string().required("Password is required"),
  });

  function InputFocused(event: React.FocusEvent<HTMLInputElement, Element>) {
    const label = event.target.previousElementSibling;
    label?.classList.add("selected");
  }

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-container-inner">
          <div className="title">
            <h2>Login</h2>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ userName: "", password: "", error: null }}
            onSubmit={(values) => accountStore.login(values)}
          >
            {({ handleSubmit, isSubmitting, errors }) => (
              <form className="form" onSubmit={handleSubmit} autoComplete="off">
                <MyTextInput
                  name="userName"
                  label="UserName"
                  icon="fa fa-user"
                />
                <MyTextInput
                  name="password"
                  label="Password"
                  icon="fa fa-lock"
                  type="password"
                />
                <NeonButton
                  type="submit"
                  value="submit"
                  isLoading={isSubmitting}
                />
                {/* <div style={{height:500}}></div> */}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
});
