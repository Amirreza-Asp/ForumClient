import React from "react";
import { useStore } from "../../app/stores/store";
import NeonButton from "../../app/common/buttons/NeonButton";
import { history } from "../..";

export default function ServerErrorPage() {
  const { commonStore } = useStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "white" }}>Server Error</h1>
      <h5 style={{ color: "red" }}>{commonStore.error?.message}</h5>
      {commonStore.error?.details && (
        <div>
          <h4 style={{ color: "teal" }}>Stack trace</h4>
          <code style={{ marginTop: 10 }}>{commonStore.error?.details}</code>
        </div>
      )}
      <NeonButton type="button" value="Ok" onClick={() => history.goBack()} />
    </div>
  );
}
