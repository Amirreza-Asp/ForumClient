import { useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { GridQuery } from "../../../../app/models/Queries";
import Loading from "../../../../app/common/loading/Loading";
import { observer } from "mobx-react-lite";
import "./set-manager.css";
import { SuccessSwal } from "../../../../app/common/modals/SwalModal";

interface Props {
  manager?: string;
  communityId: string;
}

export default observer(function SetManager({ manager, communityId }: Props) {
  const {
    userStore: { users, fetchUsers, loadingUsers, setLoadingUsers },
    communityStore: { setManager },
  } = useStore();

  const [query, setQuery] = useState<GridQuery>(new GridQuery());

  useEffect(() => {
    fetchUsers(query);
  }, [fetchUsers, query]);

  const handleType = (value: string) => {
    setQuery({ ...query, filters: [{ column: "userName", value: value }] });
  };

  const handleSetManager = (userName: string) => {
    setLoadingUsers(true);
    setManager({ userName: userName, communityId: communityId }).then(() => {
      SuccessSwal("manager for selected community assigned", () => {});
    });
  };

  return (
    <div className="bg-glass border-glass set-manager">
      <h3>Set manager</h3>
      <h4>Current manager : {manager ? manager : "None"}</h4>
      <div className="set-manager-input">
        <input
          type="search"
          placeholder="Search UserName..."
          onKeyUp={(e) => handleType(e.currentTarget.value)}
        />
        <ul className="set-manager-items">
          {users && !loadingUsers ? (
            users.data.map((item) => (
              <li
                key={item.userName}
                onClick={() => handleSetManager(item.userName)}
              >
                {item.userName}
              </li>
            ))
          ) : (
            <Loading width={50} containerHeight={200} />
          )}
        </ul>
      </div>
    </div>
  );
});
