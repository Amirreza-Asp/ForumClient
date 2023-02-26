import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { roles, routes } from "../../app/utility/SD";
import ProfilePage from "../../features/account/profile/ProfilePage";

export default observer(function HeaderAuthPopUp() {
  const { accountStore, modalStore } = useStore();

  return (
    <div className={`header-auth-popup ${accountStore.popUp ? "active" : ""}`}>
      <ul className="list">
        {accountStore.user?.role === roles.Admin && (
          <li className="item">
            <Link to={routes.Admin_Dashboard}>
              <i className="fa fa-user-secret"></i>
              <span>Admin</span>
            </Link>
          </li>
        )}
        <li className="item">
          <div
            onClick={() =>
              modalStore.openModal(
                <ProfilePage userName={accountStore.user?.userName!} />
              )
            }
          >
            <i className="fa fa-lock"></i>
            <span>Profile</span>
          </div>
        </li>
        <li className="item">
          <div onClick={accountStore.logout}>
            <i className="fa fa-backward"></i>
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
});
