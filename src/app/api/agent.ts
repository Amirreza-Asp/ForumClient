import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import {
  Login,
  Register,
  UpsertUser,
  User,
  UserDetails,
  UserResult,
  UserSummary,
} from "../models/User";
import { Profile } from "../models/Profile";
import { store } from "../stores/store";
import { routes } from "../utility/SD";
import { GridQuery } from "../models/Queries";
import { Pagenation } from "../models/Shared";
import { Role } from "../models/Role";

axios.defaults.baseURL = process.env.REACT_APP_SERVER;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token)
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  async (error: AxiosError) => {
    await sleep(500);
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (data.errors) {
          const modelStateErrors = [];
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
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("account/current"),
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
};

const role = {
  getAll: () => requests.get<Role[]>("role/getAll"),
};

const profile = {
  get: (userName: string) =>
    requests.get<Profile>(`profile/details?userName=${userName}`),
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

const agent = {
  Account,
  profile,
  user,
  role,
};

export default agent;
