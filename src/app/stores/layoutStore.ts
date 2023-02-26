import { makeAutoObservable } from "mobx";

export default class LayoutStore {
  close: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleClose = () => {
    this.close = !this.close;
  };
}
