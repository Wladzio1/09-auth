"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import type { Note } from "@/types/note";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debounced] = useDebounce(search, 500);

  const { data } = useQuery({
    queryKey: ["notes", debounced, page, tag],
    queryFn: async () => {
      const res = await fetchNotes({
        search: debounced,
        page,
        perPage: 12,
        tag,
      });

      return res.data;
    },
  });

  const notes: Note[] = data?.data ?? [];

  return (
    <div>
      <Link href="/notes/action/create">Create note</Link>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}
