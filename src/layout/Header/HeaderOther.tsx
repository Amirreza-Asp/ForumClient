import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { userImage } from "../../app/api/image";
import HeaderAuthPopUp from "./HeaderAuthPopUp";
import LoginForm from "../../features/account/login/LoginForm";
import RegisterForm from "../../features/account/register/RegisterForm";
import { useEffect } from "react";
import UnreadComments from "../../features/comments/unreadComments/UnreadComments";
import { useHistory } from "react-router-dom";
import { routes } from "../../app/utility/SD";

export default observer(function HeaderOther() {
  const {
    accountStore: { IsLoggedIn, user, setPopUp, popUp },
    modalStore,
    commentStore: { unreadCommentsCount, fetchUnreadCommentsCount },
  } = useStore();

  const history = useHistory();

  useEffect(() => {
    if (!unreadCommentsCount && IsLoggedIn) fetchUnreadCommentsCount();
  }, [fetchUnreadCommentsCount, IsLoggedIn]);

  return (
    <div className="layout-header-nav-other">
      {IsLoggedIn ? (
        <>
          <div className="layout-header-nav-other-bell">
            <i className="fa fa-bell"></i>
            <span className="notif">3</span>
          </div>
          <div
            className="layout-header-nav-other-message"
            onClick={() => modalStore.openModal(<UnreadComments />)}
          >
            <i className="fa fa-comment-alt-dots"></i>
            {unreadCommentsCount && (
              <span className="notif">{unreadCommentsCount}</span>
            )}
          </div>

          <div className="layout-header-nav-other-user">
            <img
              className="layout-header-nav-other-user-img"
              src={userImage(user?.image, 150, 150)}
              alt="user"
              onClick={() => setPopUp(!popUp)}
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
