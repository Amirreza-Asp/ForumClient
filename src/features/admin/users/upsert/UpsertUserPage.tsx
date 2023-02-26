import "./upsertUser.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Register, UpsertUser } from "../../../../app/models/User";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import StepsNumber from "./StepsNumber";
import { useEffect, useState } from "react";
import Loading from "../../../../app/common/loading/Loading";
import { colors } from "../../../../app/utility/SD";
import Swal from "sweetalert2";
import { GridQuery } from "../../../../app/models/Queries";

interface Props {
  userName?: string;
  query: GridQuery;
}

export default observer(function UpsertUserPage({ userName, query }: Props) {
  const {
    roleStore: { roles, fetchRoles, loadingRoles },
    userStore: {
      selectedUser,
      fetchUsers,
      fetchSelectedUser,
      addUser,
      updateUser,
      loadSelectedUser,
      upsertLoading,
    },
  } = useStore();

  const [step, setStep] = useState<
    "step1" | "step2" | "step3" | "step4" | "step5"
  >("step1");

  function goToNextStep() {
    switch (step) {
      case "step1":
        setStep("step2");
        break;
      case "step2":
        setStep("step3");
        break;
      case "step3":
        setStep("step4");
        break;
      case "step4":
        setStep("step5");
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
      case "step5":
        setStep("step4");
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
    role: Yup.string().required("please enter your role"),
  });

  useEffect(() => {
    if (!roles) fetchRoles();
    if (userName && (!selectedUser || selectedUser.userName !== userName)) {
      fetchSelectedUser(userName);
    }
  }, [fetchRoles, fetchSelectedUser, userName]);

  function update(model: UpsertUser) {
    updateUser(model).then(() => {
      Swal.fire({
        title: "User edited successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: `${colors.add}`,
        timer: 3000,
        timerProgressBar: true,
        preConfirm: () => {
          return fetchUsers(query);
        },
      });
    });
  }

  function add(model: UpsertUser) {
    addUser(model).then(() => {
      Swal.fire({
        title: "User added successfully",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: `${colors.add}`,
        timer: 3000,
        timerProgressBar: true,
        preConfirm: () => {
          return fetchUsers(query);
        },
      });
    });
  }

  const edit: boolean = !!userName;

  return (
    <section className="upsert-user">
      <div
        className="upsert-user-container"
        style={{ borderColor: userName ? colors.edit : colors.add }}
      >
        <div className="upsert-user-container-inner">
          {loadingRoles || !roles || loadSelectedUser ? (
            <Loading
              width={40}
              containerHeight={300}
              color={edit ? colors.edit : colors.add}
            />
          ) : (
            <>
              <div className="title">
                <h2>{edit ? "Edit" : "Add"} User</h2>
              </div>
              <Formik
                validationSchema={validationSchema}
                initialValues={
                  new UpsertUser(userName ? selectedUser : undefined)
                }
                onSubmit={(values) => {
                  values.isMale =
                    values.isMale === true.toString() ? true : false;
                  if (values.id) update(values);
                  else add(values);
                }}
              >
                {({ handleSubmit, isSubmitting }) => (
                  <form
                    className="form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <StepsNumber
                      color={edit ? colors.edit : colors.add}
                      setStep={setStep}
                      step={step}
                    />
                    <Step1
                      visible={step === "step1"}
                      goToNextStep={goToNextStep}
                      color={edit ? colors.edit : colors.add}
                    />
                    <Step2
                      visible={step === "step2"}
                      goToNextStep={goToNextStep}
                      goToPrevStep={goToPrevStep}
                      color={edit ? colors.edit : colors.add}
                    />
                    <Step3
                      visible={step === "step3"}
                      goToNextStep={goToNextStep}
                      goToPrevStep={goToPrevStep}
                      color={edit ? colors.edit : colors.add}
                    />
                    <Step4
                      visible={step === "step4"}
                      goToPrevStep={goToPrevStep}
                      goToNextStep={goToNextStep}
                      color={edit ? colors.edit : colors.add}
                    />
                    <Step5
                      roles={roles!}
                      isSubmitting={upsertLoading}
                      visible={step === "step5"}
                      goToPrevStep={goToPrevStep}
                      color={edit ? colors.edit : colors.add}
                    />
                  </form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </section>
  );
});
