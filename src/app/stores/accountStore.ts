import { makeAutoObservable, reaction, runInAction } from "mobx";
import { history } from "../..";
import agent from "./../api/agent";
import {
  Login,
  Register,
  UpdateUser,
  User,
  UserResult,
} from "./../models/User";
import { store } from "./store";

export default class AccountStore {
  user: User | null = null;
  popUp: boolean = false;
  loadingUpsertPhoto = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPopUp = (popUp: boolean) => {
    this.popUp = popUp;
  };

  get IsLoggedIn() {
    return this.user !== null;
  }

  login = async (model: Login) => {
    try {
      var user = await agent.Account.login(model);
      store.commonStore.setToken(user.token);
      store.commonStore.setRefreshToken(user.refreshToken);
      this.setUser(user);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  loginWithRefreshToken = async () => {
    try {
      var userResult = await agent.Account.refreshTokenLogin(
        store.commonStore.refreshToken!
      );
      this.setUser(userResult);
      store.commonStore.token = userResult.token;
      store.commonStore.setRefreshToken(userResult.refreshToken);
    } catch (error) {
      store.commonStore.removeRefreshToken();
      throw error;
    }
  };

  logout = () => {
    store.commonStore.token = null;
    store.commonStore.removeRefreshToken();
    this.user = null;
    history.push("/");
  };

  update = async (model: UpdateUser) => {
    try {
      const userResult = await agent.Account.update(model);
      this.setUser(userResult);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  register = async (model: Register) => {
    try {
      var result = await agent.Account.register(model);
      store.commonStore.token = result.token;
      store.commonStore.setRefreshToken(result.refreshToken);
      this.setUser(result);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  upsertPhoto = async (file: Blob) => {
    this.loadingUpsertPhoto = true;
    try {
      const result = await agent.Account.changePhoto(file);
      runInAction(() => {
        this.user!.image = result.data;
        this.loadingUpsertPhoto = false;
      });
      store.modalStore.closeModal();
    } catch (error) {
      runInAction(() => (this.loadingUpsertPhoto = false));
      throw error;
    }
  };

  private setUser = (userResult: UserResult) => {
    this.user = { ...userResult, age: new Date(userResult.age) };
  };
}
