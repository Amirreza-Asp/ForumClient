import "./layout.css";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { userImage } from "../../../app/api/image";
import HeaderAuthPopUp from "../../../layout/Header/HeaderAuthPopUp";

interface Props {
  setActive: (active: boolean) => void;
  active: boolean;
  page: string;
}

export default observer(function AdminHeader({
  setActive,
  active,
  page,
}: Props) {
  const {
    accountStore: { user, setPopUp, popUp },
  } = useStore();

  return (
    <header className="header-admin">
      <div className={`header-nav-logo`}>
        <div
          className={`header-nav-logo-hamburger ${active ? "active" : ""}`}
          onClick={() => {
            if (window.innerWidth < 800) {
              setActive(!active);
            }
          }}
        >
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </div>
        <h3>{page}</h3>
      </div>
      <div className="info">
        <div className="flex align-center justify-content gap-5">
          <img
            src={userImage(user?.image, 150, 150)}
            alt="user"
            onClick={() => (!popUp ? setPopUp(true) : setPopUp(false))}
          />
        </div>

        <HeaderAuthPopUp
          isAdmin={true}
          style={{ background: "rgba(10,10,10 , .7)" }}
        />
      </div>
    </header>
  );
});
