import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/Profile";

export default class ProfileStore {
  profile?: Profile;
  loadingProfile: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.profile.get(userName);
      runInAction(() => {
        this.profile = profile;
        this.profile.age = new Date(profile.age);
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingProfile = false));
      console.log(error);
    }
  };

  clearProfile = () => {
    this.profile = undefined;
  };
}
