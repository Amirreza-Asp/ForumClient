export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  like: number;
  disLike: number;
  reaction: string;
  author: {
    fullName: string;
    userName: string;
    image: string;
  };
  topicId?: string;
}

export class Comment implements Comment {
  constructor(
    id: string,
    author: { fullName: string; userName: string; image: string },
    topicId: string,
    content: string
  ) {
    this.id = id;
    this.author = author;
    this.topicId = topicId;
    this.content = content;
    this.like = 0;
    this.disLike = 0;
    this.reaction = "";
    this.createdAt = new Date();
  }
}

export interface CommentPagenationQuery {
  topicId: string;
  page?: number;
  size?: number;
}

export interface AddComment {
  id: string;
  content: string;
  topicId: string;
}

export interface UpdateComment {
  id: string;
  content: string;
}

export interface UnreadComment {
  id: string;
  content: string;
  createdAt: Date;
  topicTitle: string;
  topicId: string;
  like: number;
  disLike: number;
  author: {
    fullName: string;
    userName: string;
    image: string;
  };
}
