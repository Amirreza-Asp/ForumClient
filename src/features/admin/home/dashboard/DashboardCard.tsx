import React from "react";

interface Props {
  icon: { name: string; color: string };
  data: { title: string; value: string };
}

export default function DashboardCard({ icon, data }: Props) {
  return (
    <div className="dashboard-card">
      <div className="body">
        <div
          className="icon-box"
          style={{
            boxShadow: `inset 0 0 18px  ${icon.color},
          0 0 7px ${icon.color}`,
          }}
        >
          <i className={`fa-thin fa-${icon.name}`}></i>
        </div>
        <div className="values">
          <h5 className="title">{data.title}</h5>
          <h3 className="value">{data.value}</h3>
        </div>
      </div>
      <div className="loader">
        <i className="fa fa-refresh"></i>
        <span>Reload</span>
      </div>
    </div>
  );
}
