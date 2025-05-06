import { EncodeResponse, ListResponse } from "@/types";
import { api } from "./axios";

export const queryKeys = {
  listLinks: ["list", "links"],
};

export const endpoints = {
  encode: (data: { url: string }) =>
    api.post<EncodeResponse>("/api/encode", data),
  list: () => api.get<ListResponse>("/api/list"),
};
