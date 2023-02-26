import { makeAutoObservable, reaction } from "mobx";
import { history } from "../..";
import agent from "./../api/agent";
import { Login, Register, User, UserResult } from "./../models/User";
import { store } from "./store";

export default class AccountStore {
  user: User | null = null;
  popUp: boolean = false;

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
      history.push("/");
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

  private setUser = (userResult: UserResult) => {
    this.user = new User(userResult);
  };
}
