"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data?.title}</h2>

      <p>{data?.content}</p>

      <p>{data?.tag}</p>

      <p>{data?.createdAt}</p>

      <button onClick={() => router.back()}>Close</button>
    </Modal>
  );
}
