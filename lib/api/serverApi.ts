import { api } from "./api";

function getCookieHeader(cookies?: string) {
  return cookies ? { Cookie: cookies } : {};
}

export async function fetchNotes(
  params?: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
  },
  cookies?: string,
) {
  const { data } = await api.get("/notes", {
    params: {
      perPage: 12,
      ...params,
    },
    headers: getCookieHeader(cookies),
  });

  return data;
}

export async function fetchNoteById(id: string, cookies?: string) {
  const { data } = await api.get(`/notes/${id}`, {
    headers: getCookieHeader(cookies),
  });

  return data;
}

export async function getMe(cookies?: string) {
  const { data } = await api.get("/users/me", {
    headers: getCookieHeader(cookies),
  });

  return data;
}

export async function checkSession(cookies?: string) {
  const { data } = await api.get("/auth/session", {
    headers: getCookieHeader(cookies),
  });

  return data;
}
