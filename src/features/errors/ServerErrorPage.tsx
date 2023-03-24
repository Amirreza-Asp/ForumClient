import React from "react";
import { useStore } from "../../app/stores/store";
import NeonButton from "../../app/common/buttons/NeonButton";
import { history } from "../..";
import "./style.css";

export default function ServerErrorPage() {
  const { commonStore } = useStore();

  return (
    <section className="page server-error">
      <h1 className="title">Server Error</h1>
      {commonStore.error && (
        <div className="stack-box">
          <h4 style={{ color: "teal", marginBottom: 15 }}>Stack trace</h4>
          <code>{commonStore.error}</code>
        </div>
      )}
    </section>
  );
}
