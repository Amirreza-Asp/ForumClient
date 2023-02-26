import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { userImage } from "../../app/api/image";
import HeaderAuthPopUp from "./HeaderAuthPopUp";
import LoginForm from "../../features/account/login/LoginForm";
import RegisterForm from "../../features/account/register/RegisterForm";

export default observer(function HeaderOther() {
  const { accountStore, modalStore } = useStore();
  const { user } = accountStore;

  return (
    <div className="header-nav-other">
      {accountStore.IsLoggedIn ? (
        <>
          <div className="header-nav-other-bell">
            <i className="fa fa-bell"></i>
            <span className="notif">4</span>
          </div>
          <div className="header-nav-other-message">
            <i className="fa fa-comment-alt-dots"></i>
            <span className="notif">3</span>
          </div>

          <div className="header-nav-other-user">
            <img
              className="header-nav-other-user-img"
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
