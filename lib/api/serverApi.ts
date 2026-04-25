import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (params: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}) => {
  const cookieHeader = await getCookieHeader();

  return api.get<{ data: Note[] }>("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = await getCookieHeader();

  return api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();

  return api.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  return api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};
