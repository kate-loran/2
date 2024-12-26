export const BASE_URL =
  import.meta.env.VITE_APP_SERVER_BASE_URL ||
  "https://xn--b1albin0a.xn--p1ai:8081/api";

export const api = {
  days: (id?: number | string) => (id ? `/days/${id}` : `/days`),
};
