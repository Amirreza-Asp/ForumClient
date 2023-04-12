import { observer } from "mobx-react-lite";
import React, { useRef } from "react";

interface Props {
  icon: { name: string; color: string };
  data: { title: string; value: string };
  refreshHandler: () => Promise<void>;
}

export default observer(function DashboardCard({
  icon,
  data,
  refreshHandler,
}: Props) {
  const refreshBtn = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    refreshBtn.current?.classList.add("active");
    refreshHandler().finally(() => {
      refreshBtn.current?.classList.remove("active");
    });
  };

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
      <div className="loader" onClick={handleRefresh} ref={refreshBtn}>
        <i className="fa fa-refresh"></i>
        <span>Reload</span>
      </div>
    </div>
  );
});
