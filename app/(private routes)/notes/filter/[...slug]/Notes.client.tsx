"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import type { Note } from "@/types/note";

type Props = {
  tag?: string;
};

type NotesResponse = {
  data: Note[];
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: async () => {
      const res = await fetchNotes({
        search: debouncedSearch,
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
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search..."
      />

      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>

      {notes.length > 0 && (
        <Pagination
          pageCount={10}
          currentPage={page}
          onPageChange={(p: number) => setPage(p)}
        />
      )}
    </div>
  );
}
