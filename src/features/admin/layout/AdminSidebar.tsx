import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { routes } from "../../../app/utility/SD";

interface Props {
  active: boolean;
  current: string;
  setCurrent: (current: string) => void;
}

export default observer(function AdminSidebar({
  active,
  current,
  setCurrent,
}: Props) {
  const items = [
    {
      icon: "fa-thin fa-tachometer-alt",
      title: "Dashboard",
      href: routes.Admin_Dashboard,
    },
    { icon: "fa-thin fa-user", title: "User", href: routes.Admin_Users },
    { icon: "fa-thin fa-calendar-days", title: "Community", href: "#" },
    { icon: "fa-thin fa-handshake", title: "Topics", href: "#" },
    { icon: "fa-thin fa-earth", title: "Info", href: "#" },
    { icon: "fa-thin fa-user-secret", title: "Exit", href: "#" },
  ];

  return (
    <aside className={`admin-sidebar ${active ? "active" : ""}`}>
      <div>
        <a href={routes.Home} className="brand header">
          <img src="/assets/images/arila.png" alt="" />
          <span>ARILA</span>
        </a>
        <ul className="tools">
          {items.map((item) => (
            <li
              className={
                window.location.pathname.replaceAll("/", "") ===
                item.href.replaceAll("/", "")
                  ? "active"
                  : ""
              }
              key={item.title}
            >
              <Link to={item.href} onClick={() => setCurrent(item.title)}>
                <i className={item.icon}></i>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});
