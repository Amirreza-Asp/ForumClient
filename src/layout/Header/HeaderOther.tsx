import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { userImage } from "../../app/api/image";
import HeaderAuthPopUp from "./HeaderAuthPopUp";
import LoginForm from "../../features/account/login/LoginForm";
import RegisterForm from "../../features/account/register/RegisterForm";
import { useEffect } from "react";

export default observer(function HeaderOther() {
  const {
    accountStore,
    modalStore,
    commentStore: { unreadCommentsCount, fetchUnreadCommentsCount },
  } = useStore();
  const { user } = accountStore;

  useEffect(() => {
    if (!unreadCommentsCount) fetchUnreadCommentsCount();
  }, [fetchUnreadCommentsCount]);

  return (
    <div className="layout-header-nav-other">
      {accountStore.IsLoggedIn ? (
        <>
          <div className="layout-header-nav-other-bell">
            <i className="fa fa-bell"></i>
            {unreadCommentsCount && (
              <span className="notif">{unreadCommentsCount}</span>
            )}
          </div>
          <div className="layout-header-nav-other-message">
            <i className="fa fa-comment-alt-dots"></i>
            <span className="notif">3</span>
          </div>

          <div className="layout-header-nav-other-user">
            <img
              className="layout-header-nav-other-user-img"
              src={userImage(user?.image, 150, 150)}
              alt="user"
              onClick={() => accountStore.setPopUp(!accountStore.popUp)}
            />
          </div>
          <HeaderAuthPopUp />
        </>
      ) : (
        <div className="auth">
          <div className="login-entry">
            <span onClick={() => modalStore.openModal(<LoginForm />)}>
              Login
            </span>
          </div>
          <span className="amp">/</span>
          <div className="register-entry">
            <span onClick={() => modalStore.openModal(<RegisterForm />)}>
              Register
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
