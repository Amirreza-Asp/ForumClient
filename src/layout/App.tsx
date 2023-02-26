import "./styles/App.css";
import "./../lib/FontAwesome.Pro.6.2.1/css/all.css";
import Home from "./../features/home/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import { routes } from "../app/utility/SD";
import { observer } from "mobx-react-lite";
import { history } from "..";
import { ToastContainer } from "react-toastify";
import ModalContainer from "../app/common/modals/ModalContainer";
import ServerErrorPage from "./../features/errors/ServerErrorPage";
import AdminLayout from "../features/admin/layout/AdminLayout";
import Dashboard from "../features/admin/home/dashboard/Dashboard";
import UserPagenation from "../features/admin/users/pagenation/UserPagenation";
import Layout from "./Layout";
import { store, StoreContext, useStore } from "../app/stores/store";
import { useEffect } from "react";

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

      <Switch>
        <Route path="/admin/:path?" exact>
          <AdminLayout>
            <Switch>
              <Route
                path={routes.Admin_Dashboard}
                exact
                component={Dashboard}
              />
              <Route
                path={routes.Admin_Users}
                exact
                component={UserPagenation}
              />
            </Switch>
          </AdminLayout>
        </Route>

        <Route>
          <Layout>
            <Switch>
              <Route path={routes.Home} exact component={Home} />
              <Route
                path={routes.ServerError}
                exact
                component={ServerErrorPage}
              />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </StoreContext.Provider>
  );
}

export default observer(App);
