import React, { useEffect } from "react";
import DashboardCard from "./DashboardCard";
import DashboardContentChart from "./DashboardContentChart";
import "./dashboard.css";
import NewMemberChart from "./NewMemberChart";
import CommunityWithMostTopics from "./CommunityWithMostTopics";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import Loading from "../../../../app/common/loading/Loading";
import UsersCountByAge from "./UsersCountByAge";

const icons = [
  {
    name: "handshake",
    color: "#ff54e2",
  },
  {
    name: "broadcast-tower",
    color: "#54ff96",
  },
  {
    name: "comment-alt-dots",
    color: "cyan",
  },
  {
    name: "user",
    color: "#fcf47c",
  },
];

export default observer(function Dashboard() {
  const {
    adminStore: {
      loadingDashboard,
      dashboard,
      fetchDashboard,
      fetchCommentsCount,
      fetchCommunitiesCount,
      fetchTopicsCount,
      fetchUsersCount,
    },
  } = useStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loadingDashboard || !dashboard) return <Loading width={80} />;

  return (
    <section className="page">
      <div style={{ height: "200px", width: "100%" }}>
        <DashboardContentChart
          numberOfTopicsPerMonth={dashboard?.numberOfTopicPerMonth}
        />
      </div>
      <div className="card-conatiner">
        <DashboardCard
          key={1}
          icon={icons[0]}
          data={{ title: "Topics", value: dashboard.topicsCount.toString() }}
          refreshHandler={fetchTopicsCount}
        />
        <DashboardCard
          key={2}
          icon={icons[1]}
          data={{
            title: "Communities",
            value: dashboard.communitiesCount.toString(),
          }}
          refreshHandler={fetchCommunitiesCount}
        />
        <DashboardCard
          key={3}
          icon={icons[2]}
          data={{
            title: "Comments",
            value: dashboard.commentsCount.toString(),
          }}
          refreshHandler={fetchCommentsCount}
        />
        <DashboardCard
          key={4}
          icon={icons[3]}
          data={{ title: "Users", value: dashboard.usersCount.toString() }}
          refreshHandler={fetchUsersCount}
        />
      </div>
      <div className="charts-container">
        <UsersCountByAge userCountByAge={dashboard.usersCountByAge} />
        <NewMemberChart newMembersJoined={dashboard.newMembersJoined} />
        <CommunityWithMostTopics
          communitiesWithMostTopics={dashboard.communitiesWithMostTopics}
        />
      </div>
    </section>
  );
});
