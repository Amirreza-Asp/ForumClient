import { useStore } from "../../app/stores/store";
import UpsertTopicPage from "../admin/topics/upsert/UpsertTopicPage";
import { WarningSwal } from "../../app/common/modals/SwalModal";
import { observer } from "mobx-react-lite";

export default observer(function HomeMainQuestion() {
  const {
    modalStore: { openModal },
    accountStore: { IsLoggedIn },
  } = useStore();

  const openUpsertTopicPage = () => {
    if (!IsLoggedIn) {
      WarningSwal("You must login to add a topic", () => {});
      return;
    }

    openModal(<UpsertTopicPage home={true} />);
  };

  return (
    <div className="question">
      <div className="question-box">
        <img src="assets/images/diego-ph-fIq0tET6llw-unsplash.jpg" alt="ask" />
        <div className="question-box-content">
          <h4>Can't find an answer?</h4>
          <p>Make use of a qualified tutor to get the answer</p>
        </div>
      </div>
      <button className="hover-button" onClick={openUpsertTopicPage}>
        <span>Ask a Question</span>
      </button>
    </div>
  );
});
