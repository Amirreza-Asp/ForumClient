import { Community, UpsertCommunity } from "../models/Community";
import { GridQuery } from "./../models/Queries";
import agent from "../api/agent";
import { makeAutoObservable, runInAction } from "mobx";
import { Pagenation } from "../models/Shared";
import { store } from "./store";

export default class CommunityStore {
  topCommunities?: Community[] = [];
  loadingTopCommunities = false;
  communities?: Pagenation<Community>;
  loadingCommunities: boolean = false;
  loadCommunity: boolean = false;
  selectedCommunity?: Community;
  loadingSetManager = false;

  constructor() {
    makeAutoObservable(this);
  }

  getTopCommunities = async () => {
    this.loadingTopCommunities = true;
    try {
      const communities = await agent.communities.top();

      runInAction(() => (this.topCommunities = communities));
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingTopCommunities = false));
    }
  };

  fetchCommunities = async (query: GridQuery) => {
    this.loadingCommunities = true;
    try {
      const communities = await agent.communities.pagenation(query);
      runInAction(() => {
        communities.data.forEach((item) => {
          item.createAt = new Date(item.createAt);
        });
        this.communities = communities;
        this.loadingCommunities = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingCommunities = false));
    }
  };

  addCommunity = async (model: UpsertCommunity) => {
    try {
      await agent.communities.add(model);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  updateCommunity = async (model: UpsertCommunity) => {
    try {
      await agent.communities.update(model);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  removeCommunity = async (id: string) => {
    try {
      await agent.communities.remove(id);
    } catch (error) {
      throw error;
    }
  };

  fetchCommunity = async (id: string) => {
    this.loadCommunity = true;
    try {
      const community = await agent.communities.find(id);
      runInAction(() => {
        this.selectedCommunity = community;
        this.loadCommunity = false;
      });
    } catch (error) {
      runInAction(() => (this.loadCommunity = false));
      console.log(error);
    }
  };

  clearCommunity = () => {
    this.selectedCommunity = undefined;
  };

  setManager = async (model: { userName: string; communityId: string }) => {
    this.loadingSetManager = true;
    try {
      await agent.communities.setManager(model);
      runInAction(() => {
        this.communities?.data.forEach((item) => {
          if (item.id === model.communityId) {
            item.manager = model.userName;
          }
        });
      });
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => (this.loadingSetManager = false));
    }
  };
}
