import "./layout.css";
import React, { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { userImage } from "../../../app/api/image";
import { Link } from "react-router-dom";
import { routes } from "../../../app/utility/SD";

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
    accountStore: { user },
  } = useStore();

  return (
    <header>
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
        <Link to={routes.Home}>
          <i className="fa fa-home"></i>
        </Link>

        <img src={userImage(user?.image, 100, 100)} alt="user" />
      </div>
    </header>
  );
});
