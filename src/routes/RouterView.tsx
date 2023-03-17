import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "../features/admin/layout/AdminLayout";
import { routes } from "../app/utility/SD";
import Dashboard from "../features/admin/home/dashboard/Dashboard";
import UserPagenation from "../features/admin/users/pagenation/UserPagenation";
import CommunityPagenation from "../features/admin/communities/pagenation/CommunityPagenation";
import Layout from "../layout/Layout";
import Home from "../features/home/Home";
import ServerErrorPage from "../features/errors/ServerErrorPage";
import ProfilePage from "../features/account/profile/ProfilePage";

export default function RouterView() {
  return (
    <Switch>
      <Route path="/admin/:path?" exact>
        <AdminLayout>
          <Switch>
            <Route path={routes.Admin_Dashboard} exact component={Dashboard} />
            <Route path={routes.Admin_Users} exact component={UserPagenation} />
            <Route
              path={routes.Admin_Communities}
              exact
              component={CommunityPagenation}
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
            <Route path="/profile" exact component={ProfilePage} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
