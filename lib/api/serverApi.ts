import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

const cookieHeader = (cookies: string) => ({
  headers: { Cookie: cookies },
});

// NOTES LIST
export async function fetchNotes(params: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<AxiosResponse<{ data: Note[] }>> {
  return api.get("/notes", { params });
}

// NOTE BY ID
export async function fetchNoteById(
  id: string,
  cookies: string,
): Promise<Note> {
  const res = await api.get(`/notes/${id}`, cookieHeader(cookies));
  return res.data;
}

// USER
export async function getMe(cookies: string): Promise<User> {
  const res = await api.get("/users/me", cookieHeader(cookies));
  return res.data;
}

// SESSION
export async function checkSession(
  cookies: string,
): Promise<AxiosResponse<User>> {
  return api.get("/auth/session", cookieHeader(cookies));
}
