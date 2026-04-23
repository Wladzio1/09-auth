import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

// NOTES

export const fetchNotes = async (params: {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
}) => {
  const res = await api.get<Note[]>("/notes", { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await api.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};

// AUTH

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getMe = async () => {
  const res = await api.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
};
