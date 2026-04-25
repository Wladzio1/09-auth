import { api } from "./api";

function cookieHeader(cookies?: string) {
  return cookies ? { Cookie: cookies } : {};
}

// NOTES
export async function fetchNotes(params?: any, cookies?: string) {
  const res = await api.get("/notes", {
    params: {
      perPage: 12,
      ...params,
    },
    headers: cookieHeader(cookies),
  });

  return res;
}

export async function fetchNoteById(id: string, cookies?: string) {
  const res = await api.get(`/notes/${id}`, {
    headers: cookieHeader(cookies),
  });

  return res;
}

// USER
export async function getMe(cookies?: string) {
  const res = await api.get("/users/me", {
    headers: cookieHeader(cookies),
  });

  return res;
}

export async function checkSession(cookies?: string) {
  const res = await api.get("/auth/session", {
    headers: cookieHeader(cookies),
  });

  return res;
}
