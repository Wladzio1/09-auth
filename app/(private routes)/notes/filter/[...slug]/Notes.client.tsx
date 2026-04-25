"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useState } from "react";

import type { Note } from "@/types/note";
import Pagination from "@/components/Pagination/Pagination";

type NotesResponse = {
  data: Note[];
  total: number;
};

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ page }),
  });

  const notes = data?.data ?? [];

  return (
    <div>
      {notes.map((note: Note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
        </div>
      ))}

      {data && (
        <Pagination
          currentPage={page}
          pageCount={Math.ceil(data.total / 10)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
