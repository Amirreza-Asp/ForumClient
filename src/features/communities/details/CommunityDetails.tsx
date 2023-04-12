import "./community-details.css";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../app/common/loading/Loading";
import { communityImage } from "../../../app/api/image";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import CommunityDetailsTopicFilters from "./CommunityDetailsTopicFilters";
import CommunityDetailsPagenation from "./CommunityDetailsPagenation";
import CommunityDetailsTopics from "./CommunityDetailsTopics";

export default observer(function CommunityDetails() {
  const {
    homeStore: { selectedCommunity, loadingSelectedCommunity, findCommunity },
  } = useStore();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    findCommunity({ communityId: id });
  }, [id, findCommunity]);

  if (loadingSelectedCommunity) return <Loading width={80} />;

  return (
    <section className="page community-details">
      <div className="header">
        <img src={communityImage(selectedCommunity?.image, 100, 100)} />
        <div className="container">
          <h3>{selectedCommunity?.title}</h3>
          <p>Created at : {format(new Date(), "yyyy-MM-dd")}</p>
        </div>
      </div>

      <CommunityDetailsTopics communityId={id} />
    </section>
  );
});
