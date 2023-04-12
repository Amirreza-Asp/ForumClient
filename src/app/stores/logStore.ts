import { Log, LogFilters, LogPagenationQuery } from "../models/Log";
import agent from "../api/agent";
import { makeAutoObservable, runInAction } from "mobx";
import { Pagenation } from "../models/Shared";
import { log } from "console";

export default class LogStore {
  logs?: Pagenation<Log>;
  loadLogs = false;
  selectedLog?: Log;
  loadingSelectedLog = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchLogs = async (model: LogPagenationQuery) => {
    this.loadLogs = true;
    try {
      const logs = await agent.log.pagenation(model);
      runInAction(() => {
        logs.data.forEach((log) => {
          log.timestamp = new Date(log.timestamp);
        });
        this.logs = logs;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadLogs = false));
    }
  };

  fetchSelectedLog = async (id: string) => {
    this.loadingSelectedLog = true;
    try {
      const log = await agent.log.find(id);
      runInAction(
        () =>
          (this.selectedLog = { ...log, timestamp: new Date(log.timestamp) })
      );
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingSelectedLog = false));
    }
  };

  clearSelectedLog = () => {
    this.selectedLog = undefined;
  };
}
