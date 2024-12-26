import { RouteInterface } from "./types.ts";

export const routes: { [key: string]: RouteInterface } = {
  admin: {
    path: "/admin",
  },
  adminEdit: {
    path: "/adminEdit",
  },
  adminRecordsToday: {
    path: "/adminRecordsToday",
  },
};
