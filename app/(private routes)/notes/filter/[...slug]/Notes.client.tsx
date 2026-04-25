"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes } from "@/lib/api/clientApi";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearch, currentPage, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: debouncedSearch,
        tag,
      }),
  });

  const notes = data ?? [];

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div>
      <Link href="/notes/action/create">Create note +</Link>

      <SearchBox onChange={handleSearchChange} />

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found</p>}

      <Pagination
        pageCount={notes.length === 12 ? currentPage + 1 : currentPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
