import {api} from "../api/axios";

export async function getUserById(id) {
  const { data } = await api.get(`/user/${id}`);
  return data;
}