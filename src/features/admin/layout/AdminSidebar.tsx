import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { roles, routes } from "../../../app/utility/SD";

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
  const {
    accountStore: { user, IsLoggedIn },
  } = useStore();

  const items = [
    {
      icon: "fa-thin fa-tachometer-alt",
      title: "Dashboard",
      href: routes.Admin_Dashboard,
      show: IsLoggedIn && user?.role === roles.Admin,
    },
    {
      icon: "fa-thin fa-user",
      title: "User",
      href: routes.Admin_Users,
      show: IsLoggedIn && roles.Admin === user?.role,
    },
    {
      icon: "fa-thin fa-broadcast-tower",
      title: "Community",
      href: routes.Admin_Communities,
      show:
        IsLoggedIn &&
        (user?.role === roles.Admin || user?.role === roles.SuperManager),
    },
    {
      icon: "fa-thin fa-handshake",
      title: "Topic",
      href: routes.Admin_Topics,
      show:
        IsLoggedIn &&
        (user?.role === roles.Admin || user?.role === roles.SuperManager),
    },
    {
      icon: "fa-thin fa-history",
      title: "Log",
      href: routes.Admin_Logs,
      show: IsLoggedIn && user?.role === roles.Admin,
    },
    {
      icon: "fa-thin fa-sign-out",
      title: "Exit",
      href: routes.Home,
      show: true,
    },
  ];

  return (
    <aside className={`admin-sidebar ${active ? "active" : ""}`}>
      <div>
        <Link to={routes.Home} className="brand header">
          <img src="/assets/images/arila.png" alt="" />
          <span>ARILA</span>
        </Link>
        <ul className="tools">
          {items.map((item) => (
            <li
              className={window.location.pathname === item.href ? "active" : ""}
              key={item.title}
              style={{ display: !item.show ? "none" : undefined }}
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
