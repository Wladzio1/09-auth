import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export async function fetchNotes(params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) {
  const res = await api.get("/notes", {
    params: {
      perPage: 12,
      ...params,
    },
  });

  return res.data; // ❗ CAŁY OBIEKT (not just Note[])
}

export async function fetchNoteById(id: string) {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: {
  title: string;
  content: string;
  tag: string;
}) {
  const res = await api.post("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}

// AUTH
export async function register(data: { email: string; password: string }) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  const res = await api.get("/auth/session");
  return res.data;
}

export async function getMe() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function updateMe(data: Partial<User>) {
  const res = await api.patch("/users/me", data);
  return res.data;
}
