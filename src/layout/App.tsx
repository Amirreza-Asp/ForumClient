import "./styles/App.css";
import "./../lib/FontAwesome.Pro.6.2.1/css/all.css";
import { observer } from "mobx-react-lite";
import { history } from "..";
import { ToastContainer } from "react-toastify";
import ModalContainer from "../app/common/modals/ModalContainer";
import { store, StoreContext, useStore } from "../app/stores/store";
import { useEffect, useState } from "react";
import RouterView from "../routes/RouterView";
import "react-quill/dist/quill.snow.css";

function App() {
  const { accountStore, commonStore } = useStore();

  history.listen(() => {
    accountStore.setPopUp(false);
  });

  useEffect(() => {
    if (commonStore.refreshToken && !accountStore.IsLoggedIn)
      accountStore.loginWithRefreshToken();
  }, [history.location]);

  return (
    <StoreContext.Provider value={store}>
      <ToastContainer
        theme="dark"
        autoClose={3000}
        closeOnClick
        hideProgressBar={false}
        position="bottom-right"
      />
      <ModalContainer />

      <RouterView />
    </StoreContext.Provider>
  );
}

export default observer(App);
