import "./header.css";
import { observer } from "mobx-react-lite";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderOther from "./HeaderOther";
import React from "react";
import { useStore } from "../../app/stores/store";

export default observer(function Header() {
  const {
    layoutStore: { close, toggleClose },
  } = useStore();

  return (
    <header className="header">
      <nav className="header-nav">
        <HeaderLogo close={close} toggleClose={toggleClose} />
        <HeaderSearch />
        <HeaderOther />
      </nav>
    </header>
  );
});
