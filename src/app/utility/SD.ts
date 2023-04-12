export const routes = {
  Home: "/",
  ServerError: "/error/server-error",
  TopicDetails: (id?: string) =>
    id ? `/topic/details/${id}` : "/topic/details/:id",
  Communities: "/communities",
  CommunityDetails: (id?: string) =>
    id ? `/communities/details/${id}` : "/communities/details/:id",
  Admin_Dashboard: "/admin",
  Admin_Users: "/admin/User",
  Admin_Communities: "/admin/Community",
  Admin_Topics: "/admin/Topic",
  Admin_Logs: "/admin/Log",
};

export const roles = {
  Admin: "admin",
  SuperManager: "super manager",
  Manager: "manager",
  User: "user",
};

export const colors = {
  info: "cyan",
  edit: "rgb(255, 232, 104)",
  add: "rgb(84, 255, 150)",
  delete: "red",
  dark: "rgb(36, 36, 36)",
  white: "#ccc",
};
