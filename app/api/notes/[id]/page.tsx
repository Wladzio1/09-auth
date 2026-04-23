import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ FIX

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  // Створюємо змінні, щоб не дублювати slice
  const title = note.title;
  const description = note.content.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://twoja-strona.com/notes/${id}`,
      images: [
        {
          // 2. Використовуй лінк із завдання
          url: "https://goit.global",
        },
      ],
    },
  };
}
