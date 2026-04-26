"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";

import type { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

type NotesResponse = {
  data: Note[];
  total: number;
};

export default function NotesClient() {
  const params = useParams<{ slug?: string[] }>();
  const tag = params?.slug?.[0] ?? "";

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState<number>(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading } = useQuery<NotesResponse>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        tag: tag || "",
      }),
  });

  const notes = data?.data ?? [];
  const total = data?.total ?? 0;

  return (
    <div>
      <Link href="/notes/action/create">Create note</Link>

      <SearchBox onChange={handleSearchChange} />

      {isLoading && <p>Loading...</p>}

      {!isLoading && <NoteList notes={notes} />}

      {notes.length > 0 && (
        <Pagination
          currentPage={page}
          pageCount={Math.ceil(total / 12)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
