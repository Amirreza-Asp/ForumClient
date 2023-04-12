import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Loading from "../../../../app/common/loading/Loading";
import PageSize from "../../../../app/common/table/PageSize";
import { LogFilters, LogPagenationQuery } from "../../../../app/models/Log";
import { useStore } from "../../../../app/stores/store";
import LogFiltersComponent from "./LogFiltersComponent";
import LogDetails from "../details/LogDetails";
import "./style.css";

export default observer(function LogPagenation() {
  const { logStore, modalStore } = useStore();
  const { logs, loadLogs, fetchLogs } = logStore;
  const [query, setQuery] = useState<LogPagenationQuery>({ size: 10, page: 1 });
  const [filters, setFilters] = useState<LogFilters>({});
  const [open, setOpen] = useState(false);

  function changeSize(size: number) {
    setQuery({ ...query, size: size });
  }

  useEffect(() => {
    fetchLogs(query);
  }, [fetchLogs, query]);

  if (loadLogs) return <Loading width={80} />;

  return (
    <section className="page log-page">
      <div className="flex justify-between align-center mb-20">
        <PageSize size={query.size} handleChangeSize={changeSize} />
        <button className="filter-btn" onClick={() => setOpen(!open)}>
          Filters <i className="fa-thin fa-filter"></i>
        </button>
      </div>
      <LogFiltersComponent
        open={open}
        handleFilterClick={() => setQuery({ ...query, ...filters })}
        filters={filters}
        setFilters={setFilters}
      />
      <ul>
        {logs?.data.map((log) => (
          <li className="log-item" key={log.id}>
            <div className="flex justify-between align-items-center">
              <h3
                style={{
                  color:
                    log.level === "Warning"
                      ? "gold"
                      : log.level === "Error"
                      ? "red"
                      : "greenyellow",
                }}
              >
                {log.level}
              </h3>
              <span className="created">
                {format(log.timestamp, "yyyy-MM-dd hh:mm:ss")}
              </span>
            </div>

            <p className="message">
              <span>Message Template :</span> {log.messageTemplate}
            </p>
            <p className="rendered">
              <span>Rendered Message :</span> {log.renderedMessage}
            </p>
            {log.exception && (
              <p className="exception">Exception : {log.exception}</p>
            )}

            <button
              type="button"
              onClick={() => modalStore.openModal(<LogDetails id={log.id} />)}
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
});
