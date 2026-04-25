import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { cookies } from "next/headers";

type NotesResponse = {
  data: Note[];
  total: number;
};

function getCookieHeader() {
  const cookieStore = cookies();
  return cookieStore.toString();
}

export async function fetchNotes(params?: Record<string, string | number>) {
  const res = await api.get<NotesResponse>("/notes", {
    params,
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });

  return res.data;
}

export async function checkSession() {
  return await api.get("/auth/session", {
    headers: {
      Cookie: getCookieHeader(),
    },
  });
}
