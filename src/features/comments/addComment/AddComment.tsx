import { Form, Formik } from "formik";
import "./add-comment.css";
import MyTextArea from "../../../app/common/inputs/MyTextArea";
import { v4 as uuid } from "uuid";
import { AddComment } from "../../../app/models/Comment";
import { useStore } from "../../../app/stores/store";
import { SuccessSwal, WarningSwal } from "../../../app/common/modals/SwalModal";
import { observer } from "mobx-react-lite";

interface Props {
  topicId: string;
}

export default observer(function AddComment({ topicId }: Props) {
  const {
    commentStore: { addComment },
    accountStore: { IsLoggedIn },
  } = useStore();

  function handleSubmit(
    content: string,
    setSubmitting: (isSubmitting: boolean) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldError: (field: string, message: string | undefined) => void
  ) {
    if (!IsLoggedIn) {
      WarningSwal("You must be logged in to add a comment", () => {});
      setSubmitting(false);
      return;
    }

    if (content.trim().length < 10) {
      setFieldError("content", "The comment must be more than ten characters");
      setSubmitting(false);
      return;
    }

    var model: AddComment = {
      id: uuid(),
      content: content,
      topicId: topicId,
    };

    addComment(model)
      .then(() => {
        setFieldValue("content", "");
        setSubmitting(false);
        SuccessSwal("Comment added successfully", () => {});
      })
      .catch((error) => {
        setSubmitting(false);
      });
  }

  return (
    <div className="add-comment">
      <Formik
        initialValues={{ content: "" }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, setFieldValue, setFieldError }) => {
          handleSubmit(
            values.content,
            setSubmitting,
            setFieldValue,
            setFieldError
          );
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <h3>Add Comment</h3>
            <MyTextArea
              name="content"
              placeholder="enter your comment..."
              rows={5}
            />
            <div className="btn-container">
              <button type="submit" className="add-button">
                {isSubmitting ? <span>Loading...</span> : <span>Submit</span>}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
});
