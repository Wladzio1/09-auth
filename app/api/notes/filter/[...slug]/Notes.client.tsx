"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { fetchNotes } from "@/lib/api";

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
    queryFn: () => fetchNotes(currentPage, 12, debouncedSearch, tag),
  });

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

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      <Pagination
        pageCount={data?.totalPages ?? 1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
