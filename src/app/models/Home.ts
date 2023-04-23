import { TopicDetails, TopicSummary } from "./Topic";
import { Community } from "./Community";

export interface TopicDetailsViewModel {
  topic: TopicDetails;
  author: {
    userName: string;
    fullName: string;
    photo: string;
  };
  community: Community;
  feeling?: string;
}

export interface CommunitiesListDto {
  id: string;
  title: string;
  description?: string;
  image?: string;
  icon: string;
  createAt: Date;
  topicsCount: number;
}

export interface CommunityPresentationQuery {
  communityId: string;
}

export interface CommunityPresentation {
  id: string;
  title: string;
  image: string;
}

export interface CommunityTopicsFilter {
  sortBy?: string;
  from?: Date;
  to?: Date;
  title?: string;
  author?: string;
}

export interface TopContributors {
  userName: string;
  fullName: string;
  image: string;
  topicsCount: number;
}

export interface CommunityTopicsQuery {
  communityId: string;

  sortBy?: string;
  from?: Date;
  to?: Date;
  title?: string;
  author?: string;

  page?: number;
  size?: number;
}
