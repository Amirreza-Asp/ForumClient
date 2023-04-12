import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../../../app/common/inputs/MyTextInput";
import MyTextArea from "../../../../app/common/inputs/MyTextArea";
import "./style.css";
import LineButton from "../../../../app/common/buttons/LineButton";
import { colors } from "../../../../app/utility/SD";
import MyFileInput from "../../../../app/common/inputs/MyFileInput";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { getBase64, getExtension } from "../../../../app/utility/FileConvertor";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { UpsertCommunity } from "../../../../app/models/Community";
import { GridQuery } from "../../../../app/models/Queries";
import Loading from "../../../../app/common/loading/Loading";
import { SuccessSwal } from "../../../../app/common/modals/SwalModal";

interface Props {
  query: GridQuery;
  id?: string;
}

export default observer(function UpsertCommunityPage({ query, id }: Props) {
  const [image, setImage] = React.useState<File>();
  const [icon, setIcon] = React.useState<File>();

  const { communityStore } = useStore();

  useEffect(() => {
    if (id) communityStore.fetchCommunity(id);

    return () => communityStore.clearCommunity();
  }, [id, communityStore.fetchCommunities]);

  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
  });

  async function update(values: { title: string; description: string }) {
    var model: UpsertCommunity = {
      id: id!,
      ...values,
    };

    if (icon) model.icon = await getBase64(icon);
    if (image) {
      model.image = await getBase64(image);
      model.imageExtension = getExtension(image);
    }

    await communityStore.updateCommunity(model);
  }

  async function create(values: { title: string; description: string }) {
    var model: UpsertCommunity = {
      ...values,
      id: id ?? uuid(),
      icon: "",
      image: "",
      imageExtension: "",
    };

    model.icon = await getBase64(icon!);
    model.image = await getBase64(image!);
    model.imageExtension = getExtension(image!);

    await communityStore.addCommunity(model);
  }

  async function handleClick(values: { title: string; description: string }) {
    if (id) await update(values);
    else await create(values);
  }

  return (
    <section className="add-container bg-glass border-glass br-5">
      {id && communityStore.loadCommunity ? (
        <Loading
          width={30}
          containerHeight={390}
          color={id ? colors.edit : colors.add}
        />
      ) : (
        <>
          <h2
            className="header"
            style={{ color: id ? colors.edit : colors.add }}
          >
            {id ? "Edit" : "Create"} Community
          </h2>
          <Formik
            initialValues={{
              title: communityStore.selectedCommunity?.title ?? "",
              description: communityStore.selectedCommunity?.description ?? "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (!image && !id) {
                Swal.fire({
                  title: "Enter image",
                  icon: "error",
                  timer: 3000,
                });

                setSubmitting(false);
              } else if (!icon && !id) {
                Swal.fire({
                  title: "Enter icon",
                  icon: "error",
                  timer: 3000,
                });
                setSubmitting(false);
              } else {
                handleClick(values).then(() => {
                  SuccessSwal(
                    `Community ${id ? "edited" : "created"} successfully`,
                    () => communityStore.fetchCommunities(query)
                  );
                });
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <MyTextInput name="title" placeholder="title" />
                <MyTextArea
                  name="description"
                  placeholder="description"
                  rows={4}
                />

                <div
                  className="flex justify-center align-center"
                  style={{ gap: 5 }}
                >
                  <MyFileInput
                    setFile={setImage}
                    name="image"
                    value="image"
                    accept="image/*"
                  />
                  <MyFileInput
                    setFile={setIcon}
                    name="icon"
                    value="icon"
                    accept="image/png"
                  />
                </div>

                <div className="flex justify-center align-center mt-40">
                  <LineButton
                    size="md"
                    color={id ? colors.edit : colors.add}
                    value="submit"
                    type="submit"
                    loading={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </section>
  );
});
