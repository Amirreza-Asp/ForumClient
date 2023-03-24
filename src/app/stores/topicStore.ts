import { makeAutoObservable, runInAction } from "mobx";
import agent from "./../api/agent";
import { GridQuery } from "./../models/Queries";
import { Pagenation } from "../models/Shared";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { TopicDetails, TopicSummary, UpsertTopic } from "../models/Topic";

export default class TopicStore {
  topics: Pagenation<TopicSummary> | undefined;
  loadingTopics: boolean = false;
  selectedTopic?: TopicDetails;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTopics = async (query: GridQuery) => {
    this.loadingTopics = true;
    try {
      const topics = await agent.topic.pagenation(query);
      runInAction(() => {
        topics.data.forEach((topic) => {
          topic.createdAt = new Date(topic.createdAt);
        });

        this.topics = topics;
        this.loadingTopics = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingTopics = false));
    }
  };

  findTopic = async (id: string) => {
    try {
      const topic = await agent.topic.find(id);
      runInAction(() => (this.selectedTopic = topic));
    } catch (error) {
      console.log(error);
    }
  };

  clearTopic = () => {
    this.selectedTopic = undefined;
  };

  createTopic = async (model: UpsertTopic) => {
    try {
      await agent.topic.add(model);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  updateTopic = async (model: UpsertTopic) => {
    try {
      await agent.topic.update(model);
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  removeTopic = async (id: string) => {
    try {
      await agent.topic.remove(id);
    } catch (error) {
      console.log(error);
    }
  };
}
