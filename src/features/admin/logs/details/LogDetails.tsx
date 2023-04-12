import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "../../../../app/common/loading/Loading";
import { useStore } from "../../../../app/stores/store";
import "./style.css";

interface Props {
  id: string;
}

export default observer(function LogDetails({ id }: Props) {
  const {
    logStore: {
      selectedLog,
      loadingSelectedLog,
      fetchSelectedLog,
      clearSelectedLog,
    },
  } = useStore();

  useEffect(() => {
    fetchSelectedLog(id);

    return () => clearSelectedLog();
  }, [fetchSelectedLog, id]);

  return (
    <div className="bg-glass border-glass log-details">
      {loadingSelectedLog ? (
        <Loading width={30} containerHeight={400} />
      ) : selectedLog == undefined ? (
        <h3 style={{ color: "red", padding: "40px" }}>Log is not found</h3>
      ) : (
        <>
          <div className="header">
            <h4
              style={{
                color:
                  selectedLog.level === "Warning"
                    ? "gold"
                    : selectedLog.level === "Error"
                    ? "red"
                    : "greenyellow",
              }}
            >
              {selectedLog?.level}
            </h4>
          </div>

          <ul className="list">
            <li className="message">
              MessageTemplate : {selectedLog.messageTemplate}
            </li>
            <li className="rendered">
              RenderedMessage : {selectedLog.renderedMessage}
            </li>
            <li className="props">
              Properties
              <ul>
                {Object.keys(selectedLog.properties).map((key) => {
                  if (
                    typeof selectedLog.properties[key] !== "function" &&
                    typeof selectedLog.properties[key] !== "object"
                  )
                    return (
                      <li key={key}>
                        {key} : {selectedLog.properties[key]}
                      </li>
                    );

                  return "";
                })}
              </ul>
            </li>
            {selectedLog.exception && (
              <li className="exception">Exception : {selectedLog.exception}</li>
            )}
          </ul>

          <span className="time">
            {format(selectedLog.timestamp, "yyyy-MM-dd hh:mm:ss")}
          </span>
        </>
      )}
    </div>
  );
});
