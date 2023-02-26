import { ServerError } from "../models/ServerError";
import { makeAutoObservable, reaction } from "mobx";
import agent from "../api/agent";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = localStorage.getItem("jwt");
  refreshToken: string | null = localStorage.getItem("refreshToken");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  setRefreshToken = (refreshToken: string) => {
    this.refreshToken = refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
  };

  removeRefreshToken = () => {
    this.refreshToken = null;
    localStorage.removeItem("refreshToken");
  };

  setServerError(error: ServerError) {
    this.error = error;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
