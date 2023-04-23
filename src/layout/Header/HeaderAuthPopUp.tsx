import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { roles, routes } from "../../app/utility/SD";
import ProfilePage from "../../features/account/profile/ProfilePage";
import "./authPopup.css";

interface Props {
  style?: React.CSSProperties;
  isAdmin?: boolean;
}

export default observer(function HeaderAuthPopUp({
  style = {},
  isAdmin = false,
}: Props) {
  const { accountStore, modalStore } = useStore();

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        container.current != null &&
        !container.current.contains(e.target) &&
        !e.target.closest(".layout-header-nav-other-user")
      ) {
        accountStore.setPopUp(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      style={style}
      ref={container}
      className={`header-auth-popup ${accountStore.popUp ? "active" : ""} ${
        isAdmin ? "admin" : ""
      }`}
    >
      <ul className="list">
        {(accountStore.user?.role === roles.Admin ||
          accountStore.user?.role === roles.SuperManager) && (
          <li className="item">
            <Link to={isAdmin ? routes.Home : routes.Admin_Dashboard}>
              <i className={`fa ${isAdmin ? "fa-home" : "fa-user-secret"}`}></i>
              <span>
                {isAdmin
                  ? "Home"
                  : accountStore.user.role === roles.Admin
                  ? "Admin"
                  : "Manager"}
              </span>
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
