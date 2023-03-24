import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export default function AdminLayout({ children }: Props) {
  function getCurrentPage(): string {
    const location = window.location.pathname;
    const filteredLocation = location
      .replaceAll("/", "")
      .replaceAll("admin", "")
      .replaceAll("Admin", "");

    if (filteredLocation) return filteredLocation;

    return "Dashboard";
  }

  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(getCurrentPage());

  return (
    <div className="layout-conatiner">
      <AdminHeader page={current} active={active} setActive={setActive} />
      <AdminSidebar current={current} setCurrent={setCurrent} active={active} />
      {children}
    </div>
  );
}
