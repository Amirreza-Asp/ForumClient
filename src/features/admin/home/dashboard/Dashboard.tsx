import React from "react";
import DashboardCard from "./DashboardCard";
import DashboardContentChart from "./DashboardContentChart";
import "./dashboard.css";
import DashboardAvgUserOnline from "./DashboardAvgUserOnline";
import NewMemberChart from "./NewMemberChart";
import BestCommunityActivityTime from "./BestCommunityActivityTime";

export default function Dashboard() {
  const icons = [
    {
      name: "star",
      color: "#ff54e2",
    },
    {
      name: "user",
      color: "#54ff96",
    },
    {
      name: "handshake",
      color: "cyan",
    },
    {
      name: "earth",
      color: "#fcf47c",
    },
  ];
  const data = {
    title: "Test",
    value: "1100GB",
  };
  return (
    <>
      <div style={{ height: "200px", width: "100%" }}>
        <DashboardContentChart />
      </div>
      <div className="card-conatiner">
        {icons.map((item, index) => (
          <DashboardCard key={index} icon={item} data={data} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <DashboardAvgUserOnline />
        <NewMemberChart />
        <BestCommunityActivityTime />
      </div>
    </>
  );
}
