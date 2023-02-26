import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

export default function AdminLayout({ children }: Props) {
  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState(
    window.location.pathname.replaceAll("/", "")
  );

  return (
    <div className="layout-conatiner">
      <AdminHeader page={current} active={active} setActive={setActive} />
      <AdminSidebar current={current} setCurrent={setCurrent} active={active} />
      {children}
    </div>
  );
}
