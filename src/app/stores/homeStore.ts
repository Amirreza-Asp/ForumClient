import {
  CommunitiesListDto,
  CommunityTopicsFilter,
  CommunityTopicsQuery,
  TopContributors,
  TopicDetailsViewModel,
} from "../models/Home";
import agent from "../api/agent";
import { makeAutoObservable, runInAction } from "mobx";
import {
  CommunityPresentation,
  CommunityPresentationQuery,
} from "../models/Home";
import { TopicSummary } from "../models/Topic";
import { Pagenation } from "../models/Shared";

export default class HomeStore {
  topicDetailsVM?: TopicDetailsViewModel;
  loadingTopicDetails = false;
  communities?: CommunitiesListDto[];
  loadingCommunities = false;
  selectedCommunity?: CommunityPresentation;
  loadingSelectedCommunity = false;
  communityTopics?: Pagenation<TopicSummary>;
  loadingCommunityTopics = false;
  communityTopicsFilters: CommunityTopicsFilter = {};
  mainTopics?: Pagenation<TopicSummary>;
  loadingMainTopics = false;
  topContributors?: TopContributors[];
  laodingTopContributors = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTopicDetailsVM = async (id: string) => {
    this.loadingTopicDetails = true;
    try {
      const topicDetails = await agent.home.findTopic(id);
      runInAction(() => (this.topicDetailsVM = topicDetails));
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingTopicDetails = false));
    }
  };

  fetchCommunities = async () => {
    this.loadingCommunities = true;
    try {
      const communitites = await agent.home.communitiesList();
      runInAction(() => (this.communities = communitites));
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingCommunities = false));
    }
  };

  findCommunity = async (query: CommunityPresentationQuery) => {
    this.loadingSelectedCommunity = true;
    try {
      const community = await agent.home.communityPresentation(query);
      runInAction(() => {
        this.selectedCommunity = community;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingSelectedCommunity = false));
    }
  };

  fetchCommunityTopics = async (query: CommunityTopicsQuery) => {
    this.loadingCommunityTopics = true;
    try {
      const topics = await agent.home.communityTopics(query);
      runInAction(() => {
        topics.data.forEach((item) => {
          item.createdAt = new Date(item.createdAt);
        });
        this.communityTopics = topics;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingCommunityTopics = false));
    }
  };

  setCommunityTopicsFilters = (filters: CommunityTopicsFilter) => {
    this.communityTopicsFilters = filters;
  };

  fetchMainTopics = async (model: { filter: string; page: number }) => {
    this.loadingMainTopics = true;
    try {
      const topics = await agent.home.mainTopics(model);
      runInAction(() => {
        topics.data.forEach((item) => {
          item.createdAt = new Date(item.createdAt + "Z");
        });
        this.mainTopics = topics;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingMainTopics = false));
    }
  };

  fetchTopContributors = async () => {
    this.laodingTopContributors = true;
    try {
      const topContributors = await agent.home.topContributors();
      runInAction(() => (this.topContributors = topContributors));
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.laodingTopContributors = false));
    }
  };
}
