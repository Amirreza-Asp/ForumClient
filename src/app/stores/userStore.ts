import { makeAutoObservable, runInAction } from "mobx";
import agent from "./../api/agent";
import { UpsertUser, UserDetails, UserSummary } from "./../models/User";
import { GridQuery } from "./../models/Queries";
import { Pagenation } from "../models/Shared";
import { v4 as uuid } from "uuid";
import { store } from "./store";

export default class UserStore {
  users: Pagenation<UserSummary> | undefined;
  loadingUsers: boolean = false;
  selectedUser?: UserDetails;
  loadSelectedUser: boolean = false;
  upsertLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = async (query: GridQuery) => {
    this.setLoadingUsers(true);
    try {
      const users = await agent.user.pagenation(query);
      runInAction(() => {
        this.users = users;
        this.loadingUsers = false;
      });
    } catch (error) {
      console.log(error);
      this.setLoadingUsers(false);
    }
  };

  fetchSelectedUser = async (userName: string) => {
    this.loadSelectedUser = true;
    try {
      const user = await agent.user.get(userName);
      runInAction(() => {
        this.selectedUser = user;
        this.loadSelectedUser = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadSelectedUser = false));
    }
  };

  removeUser = async (userName: string) => {
    try {
      await agent.user.remove(userName);
      runInAction(() => {
        if (this.users) {
          this.users.data = this.users.data.filter(
            (b) => b.userName !== userName
          );
          this.users.size = this.users.size - 1;
        }
      });
    } catch (error) {
      throw error;
    }
  };

  addUser = async (model: UpsertUser) => {
    this.upsertLoading = true;
    try {
      model.id = uuid();
      await agent.user.add(model);
      store.modalStore.closeModal();
      runInAction(() => {
        this.upsertLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.upsertLoading = false;
      });
      console.log(error);
    }
  };

  updateUser = async (model: UpsertUser) => {
    this.upsertLoading = true;
    try {
      await agent.user.update(model);
      store.modalStore.closeModal();
      runInAction(() => {
        this.upsertLoading = false;
        this.selectedUser = undefined;
      });
    } catch (error) {
      runInAction(() => {
        this.upsertLoading = false;
      });
      throw error;
    }
  };

  private setLoadingUsers(loading: boolean) {
    this.loadingUsers = loading;
  }
}
