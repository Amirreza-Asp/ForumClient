import { makeAutoObservable, runInAction } from "mobx";
import { Role } from "../models/Role";
import agent from "../api/agent";

export default class RoleStore {
  roles?: Role[];
  loadingRoles: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchRoles = async () => {
    this.loadingRoles = true;
    try {
      const roles = await agent.role.getAll();
      runInAction(() => {
        this.roles = roles;
        this.loadingRoles = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingRoles = false));
      console.log(error);
    }
  };
}
