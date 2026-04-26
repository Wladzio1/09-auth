import { api } from "./api";
import { cookies } from "next/headers";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { AxiosResponse } from "axios";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

// NOTES
export async function fetchNotes(params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<{ data: Note[]; total: number }> {
  const cookieHeader = await getCookieHeader();

  const res = await api.get("/notes", {
    headers: {
      Cookie: cookieHeader,
    },
    params: {
      perPage: 12,
      ...params,
    },
  });

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();

  const res = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

// AUTH
export async function checkSession(): Promise<AxiosResponse> {
  const cookieHeader = await getCookieHeader();

  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}

export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();

  const res = await api.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}
