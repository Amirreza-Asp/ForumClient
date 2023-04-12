import {
  AddComment,
  Comment,
  CommentPagenationQuery,
  UpdateComment,
} from "../models/Comment";
import { Pagenation } from "../models/Shared";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class CommentStore {
  comments?: Pagenation<Comment>;
  loadingComments = false;
  groupedComments: Comment[] = [];
  loadingRemoveComment = false;
  unreadCommentsCount?: number;

  constructor() {
    makeAutoObservable(this);
  }

  fetchComments = async (query: CommentPagenationQuery) => {
    this.loadingComments = true;
    try {
      const comments = await agent.comments.pagenation(query);
      runInAction(() => {
        comments.data.forEach((comment) => {
          comment.createdAt = new Date(comment.createdAt + "Z");
        });

        this.comments = comments;
        this.groupedComments = [...this.groupedComments, ...comments.data];
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loadingComments = false));
    }
  };

  clearComments = () => {
    this.comments = undefined;
    this.groupedComments = [];
  };

  upsertReaction = async (model: { commentId: string; reaction: string }) => {
    const comment = this.groupedComments.find((b) => b.id == model.commentId);
    if (!comment) return;

    if (model.reaction === "like") {
      if (comment.reaction === "dislike") comment.disLike -= 1;
      comment.like++;
    } else {
      if (comment.reaction === "like") comment.like -= 1;
      comment.disLike++;
    }
    comment.reaction = model.reaction;

    try {
      await agent.comments.upsertReaction(model);
    } catch (error) {
      console.log(error);
    }
  };

  removeComment = async (model: { commentId: string }) => {
    this.loadingRemoveComment = true;
    try {
      await agent.comments.remove(model);
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => (this.loadingRemoveComment = false));
    }
  };

  addComment = async (model: AddComment) => {
    try {
      await agent.comments.add(model);
      runInAction(() => {
        if (this.comments?.page === this.comments?.totalPages) {
          const user = store.accountStore.user;
          let comment = new Comment(
            model.id,
            {
              fullName: user!.fullName,
              userName: user!.userName,
              image: user!.image,
            },
            model.topicId,
            model.content
          );
          this.groupedComments.push(comment);
        }
      });
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  updateComment = async (model: UpdateComment) => {
    try {
      await agent.comments.update(model);
      runInAction(() => {
        const selectedComment = this.groupedComments.find(
          (b) => b.id === model.id
        );

        if (selectedComment) {
          selectedComment.content = model.content;
        }
      });
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  fetchUnreadCommentsCount = async () => {
    try {
      const count = await agent.comments.unreadCommentsCount();

      runInAction(() => {
        if (count > 0) this.unreadCommentsCount = count;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
