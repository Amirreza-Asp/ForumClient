import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import AccountStore from "./accountStore";
import LayoutStore from "./layoutStore";
import RoleStore from "./roleStore";
import CommunityStore from "./communityStore";
import TopicStore from "./topicStore";
import LogStore from "./logStore";
import HomeStore from "./homeStore";
import CommentStore from "./commentStore";
import AdminStore from "./adminStore";

interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  accountStore: AccountStore;
  layoutStore: LayoutStore;
  roleStore: RoleStore;
  communityStore: CommunityStore;
  topicStore: TopicStore;
  logStore: LogStore;
  homeStore: HomeStore;
  commentStore: CommentStore;
  adminStore: AdminStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  accountStore: new AccountStore(),
  layoutStore: new LayoutStore(),
  roleStore: new RoleStore(),
  communityStore: new CommunityStore(),
  topicStore: new TopicStore(),
  logStore: new LogStore(),
  homeStore: new HomeStore(),
  commentStore: new CommentStore(),
  adminStore: new AdminStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
