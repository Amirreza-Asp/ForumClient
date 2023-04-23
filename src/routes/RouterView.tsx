import { Route, Switch } from "react-router-dom";
import AdminLayout from "../features/admin/layout/AdminLayout";
import { routes } from "../app/utility/SD";
import Dashboard from "../features/admin/home/dashboard/Dashboard";
import UserPagenation from "../features/admin/users/pagenation/UserPagenation";
import CommunityPagenation from "../features/admin/communities/pagenation/CommunityPagenation";
import Layout from "../layout/Layout";
import Home from "../features/home/Home";
import ServerErrorPage from "../features/errors/ServerErrorPage";
import TopicPagenation from "../features/admin/topics/pagenation/TopicPagenation";
import LogPagenation from "../features/admin/logs/pagenation/LogPagenation";
import TopicDetails from "../features/topics/details/TopicDetails";
import CommunitiesList from "../features/communities/list/CommunitiesList";
import CommunityDetails from "../features/communities/details/CommunityDetails";
import UnreadComments from "../features/comments/unreadComments/UnreadComments";

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
            <Route
              path={routes.Admin_Topics}
              exact
              component={TopicPagenation}
            />
            <Route path={routes.Admin_Logs} exact component={LogPagenation} />
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
            <Route
              path={routes.TopicDetails()}
              exact
              component={TopicDetails}
            />
            <Route
              path={routes.Communities}
              exact
              component={CommunitiesList}
            />
            <Route
              path={routes.CommunityDetails()}
              exact
              component={CommunityDetails}
            />
            <Route
              path={routes.UnreadComments}
              exact
              component={UnreadComments}
            />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
