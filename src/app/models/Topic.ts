export interface Topic {}

export interface TopicSummary {
  id: string;
  title: string;
  authorName: string;
  authorPhoto: string;
  community: string;
  view: number;
  like: number;
  disLike: number;
  createdAt: Date;
}
export interface TopicDetails {
  id: string;
  title: string;
  content: string;
  communityId: string;
  authorId: string;
  view: number;
  like: number;
  disLike: number;
  createdAt: Date;
}

export interface UpsertTopic {
  id?: string;
  title: string;
  communityId: string;
  content: string;
}
