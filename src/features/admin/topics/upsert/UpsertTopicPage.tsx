import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "../../../../app/common/inputs/MyTextInput";
import LineButton from "../../../../app/common/buttons/LineButton";
import { colors } from "../../../../app/utility/SD";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { GridQuery } from "../../../../app/models/Queries";
import Loading from "../../../../app/common/loading/Loading";
import MyTextEditor from "../../../../app/common/inputs/MyTextEditor";
import { SelectOptions } from "../../../../app/models/Shared";
import agent from "../../../../app/api/agent";
import MySelectOption from "../../../../app/common/inputs/MySelectOption";
import "./style.css";
import { UpsertTopic } from "../../../../app/models/Topic";
import { useStore } from "../../../../app/stores/store";
import { SuccessSwal } from "../../../../app/common/modals/SwalModal";

interface Props {
  query: GridQuery;
  id?: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("title is required"),
  communityId: Yup.string().required("community is required"),
  content: Yup.string().required("content is required"),
});

export default observer(function UpsertTopicPage({ query, id }: Props) {
  const { topicStore } = useStore();
  const { selectedTopic } = topicStore;

  const [communities, setCommunities] = useState<SelectOptions[]>([]);
  const [showContentError, setShowContentError] = useState(false);

  useEffect(() => {
    console.log(communities);
    console.log(selectedTopic);

    if (communities.length == 0)
      agent.communities.selectOptions().then((data) => {
        setCommunities(data);
      });

    if (id) {
      topicStore.findTopic(id);
    }

    return topicStore.clearTopic();
  }, [communities, topicStore.findTopic]);

  async function handleClick(values: {
    title: string;
    communityId: string;
    content: string;
  }) {
    var model: UpsertTopic = {
      ...values,
      id: id ?? uuid(),
    };

    id
      ? await topicStore.updateTopic(model)
      : await topicStore.createTopic(model);
  }

  if (communities.length === 0 || (id && !selectedTopic))
    return <Loading width={30} color={id ? colors.edit : colors.add} />;

  return (
    <section
      className="add-container bg-glass border-glass br-5 upsert-topic"
      style={{ width: "min(600px, 88vw)" }}
    >
      <h2 className="header" style={{ color: id ? colors.edit : colors.add }}>
        {id ? "Edit" : "Create"} Topic
      </h2>
      <Formik
        initialValues={{
          title: id ? selectedTopic?.title ?? "" : "",
          communityId: id ? selectedTopic?.communityId ?? "" : "",
          content: id ? selectedTopic?.content ?? "" : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleClick(values).then(() => {
            SuccessSwal(`Topic ${id ? "edited" : "created"} successfully`, () =>
              topicStore.fetchTopics(query)
            );
          });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Title</label>
              <MyTextInput
                className="upsert-topic-input"
                name="title"
                placeholder="title"
              />
            </div>

            <div className="input-container">
              <label>Community</label>
              <MySelectOption
                className="upsert-topic-select"
                name="communityId"
                options={communities}
              />
            </div>

            <div className="input-container">
              <label>Content</label>
              <MyTextEditor style={{ marginTop: "1rem" }} name="content" />
              {showContentError && (
                <span
                  style={{
                    color: "red",
                    marginTop: 10,
                    display: "inline-block",
                  }}
                >
                  content is Required
                </span>
              )}
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
    </section>
  );
});
