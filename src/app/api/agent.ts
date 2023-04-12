import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import {
  Login,
  Register,
  UpdateUser,
  UpsertUser,
  UserDetails,
  UserResult,
  UserSummary,
} from "../models/User";
import { Photo, Profile } from "../models/Profile";
import { store } from "../stores/store";
import { routes } from "../utility/SD";
import { GridQuery } from "../models/Queries";
import { Dashboard, Pagenation, SelectOptions } from "../models/Shared";
import { Role } from "../models/Role";
import { Community, UpsertCommunity } from "../models/Community";
import {
  InterestTopic,
  TopicDetails,
  TopicSummary,
  UpsertTopic,
} from "../models/Topic";
import { Log, LogPagenationQuery } from "../models/Log";
import {
  CommunitiesListDto,
  CommunityPresentation,
  CommunityPresentationQuery,
  CommunityTopicsQuery,
  TopicDetailsViewModel,
} from "../models/Home";
import {
  AddComment,
  Comment,
  CommentPagenationQuery,
  UpdateComment,
} from "../models/Comment";

axios.defaults.baseURL = process.env.REACT_APP_SERVER;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    ...config.headers,
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") await sleep(500);
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (data.errors) {
          const modelStateErrors: any[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        break;
      case 404:
        history.push("not-found");
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 500:
        console.log(data);
        store.commonStore.setServerError(data);
        store.modalStore.closeModal();
        history.push(routes.ServerError);
        break;
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}, config?: AxiosRequestConfig<any>) =>
    axios.put<T>(url, body, config).then(responseBody),
  patch: <T>(url: string, body: {}, config?: AxiosRequestConfig<any>) =>
    axios.patch<T>(url, body, config).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const communities = {
  top: () => requests.get<Community[]>("community/top"),
  pagenation: (query: GridQuery) =>
    requests.post<Pagenation<Community>>("community/pagenation", query),
  selectOptions: () => requests.get<SelectOptions[]>("community/SelectOptions"),
  find: (id: string) => requests.get<Community>(`community/find/${id}`),
  add: (model: UpsertCommunity) => requests.post("community/create", model),
  update: (model: UpsertCommunity) => requests.put("community/update", model),
  remove: (id: string) => requests.delete(`community/remove/${id}`),
  setManager: (model: { userName: string; communityId: string }) =>
    requests.post("community/setManager", model),
};

const comments = {
  pagenation: (query: CommentPagenationQuery) =>
    requests.post<Pagenation<Comment>>("comment/pagenation", query),
  upsertReaction: (model: { commentId: string; reaction: string }) =>
    requests.put("comment/upsertReaction", model),
  remove: (model: { commentId: string }) =>
    requests.delete(`comment/remove?commentId=${model.commentId}`),
  add: (model: AddComment) => requests.post(`comment/create`, model),
  update: (model: UpdateComment) => requests.put(`comment/update`, model),
  unreadCommentsCount: () =>
    requests.get<number>("comment/numberUnreadComments"),
  getUnreadComments: () => requests.get<Comment[]>("comment/getUnreadComments"),
};

const Account = {
  login: (model: Login) =>
    requests.get<UserResult>(
      `account/login?userName=${model.userName}&Password=${model.password}`
    ),
  refreshTokenLogin: (refreshToken: string) =>
    requests.get<UserResult>(
      `account/refreshTokenLogin?refreshToken=${refreshToken}`
    ),
  register: (model: Register) =>
    requests.post<UserResult>("account/register", model),
  update: (model: UpdateUser) =>
    requests.put<UserResult>("account/update", model),
  changePhoto: async (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file, file.type.replace("/", "."));
    return axios.post<string>("account/changePhoto", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};

const role = {
  getAll: () => requests.get<Role[]>("role/getAll"),
};

const profile = {
  get: (userName: string) =>
    requests.get<Profile>(`profile/details?userName=${userName}`),
  photos: (userName: String) =>
    requests.get<Photo[]>(`profile/allImages?userName=${userName}`),
};

const user = {
  pagenation: (query: GridQuery) =>
    requests.post<Pagenation<UserSummary>>(`user/pagenation`, query),
  get: (userName: string) =>
    requests.get<UserDetails>(`user/byUserName/${userName}`),
  remove: (userName: string) =>
    requests.delete(`user/remove/?userName=${userName}`),
  add: (model: UpsertUser) => requests.post("/user/create", model),
  update: (model: UpsertUser) => requests.put("/user/update", model),
};

const topic = {
  pagenation: (query: GridQuery) =>
    requests.post<Pagenation<TopicSummary>>(`topic/pagenation`, query),
  find: (id: string) => requests.get<TopicDetails>(`topic/find/${id}`),
  add: (model: UpsertTopic) => requests.post("topic/create", model),
  update: (model: UpsertTopic) => requests.put("topic/update", model),
  remove: (id: string) => requests.delete(`topic/remove?id=${id}`),
  interest: (model: InterestTopic) => requests.put("topic/interest", model),
};

const home = {
  findTopic: (id: string) =>
    requests.get<TopicDetailsViewModel>(`home/findTopic?id=${id}`),
  communitiesList: () =>
    requests.get<CommunitiesListDto[]>("home/communitiesList"),
  communityPresentation: (query: CommunityPresentationQuery) =>
    requests.get<CommunityPresentation>(
      `home/communityPresentation?communityId=${query.communityId}`
    ),
  communityTopics: (query: CommunityTopicsQuery) =>
    requests.post<Pagenation<TopicSummary>>(`home/communityTopics`, query),
  mainTopics: (query: { filter: string; page: number }) =>
    requests.get<Pagenation<TopicSummary>>(
      `home/mainTopics?filter=${query.filter}&page=${query.page}`
    ),
};

const log = {
  pagenation: (query: LogPagenationQuery) =>
    requests.post<Pagenation<Log>>("log/pagenation", query),
  find: (id: string) => requests.get<Log>(`log/find/${id}`),
};

const admin = {
  dashboard: () => requests.get<Dashboard>("admin/dashboard"),
  communitiesCount: () => requests.get<number>("admin/communitiesCount"),
  topicsCount: () => requests.get<number>("admin/topicsCount"),
  commentsCount: () => requests.get<number>("admin/commentsCount"),
  usersCount: () => requests.get<number>("admin/usersCount"),
};

const agent = {
  Account,
  profile,
  user,
  role,
  communities,
  topic,
  log,
  home,
  comments,
  admin,
};

export default agent;
