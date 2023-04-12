import { Dashboard } from "../models/Shared";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class AdminStore {
  dashboard?: Dashboard;
  loadingDashboard = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchDashboard = async () => {
    this.loadingDashboard = true;
    try {
      const dashboard = await agent.admin.dashboard();
      runInAction(() => {
        this.dashboard = dashboard;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingDashboard = false));
    }
  };

  fetchUsersCount = async () => {
    try {
      const number = await agent.admin.usersCount();
      runInAction(() => {
        if (this.dashboard) this.dashboard.usersCount = number;
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchCommentsCount = async () => {
    try {
      const number = await agent.admin.commentsCount();
      runInAction(() => {
        if (this.dashboard) this.dashboard.commentsCount = number;
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchCommunitiesCount = async () => {
    try {
      const number = await agent.admin.communitiesCount();
      runInAction(() => {
        if (this.dashboard) this.dashboard.communitiesCount = number;
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchTopicsCount = async () => {
    try {
      const number = await agent.admin.topicsCount();
      runInAction(() => {
        if (this.dashboard) this.dashboard.topicsCount = number;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
