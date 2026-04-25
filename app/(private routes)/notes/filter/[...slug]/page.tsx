import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes(1, 12, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const filterValue = slug.join("/");
  const isAll = filterValue === "all";

  const title = isAll
    ? "All Notes | NoteHub"
    : `Notes tagged with "${filterValue}" | NoteHub`;
  const description = isAll
    ? "A collection of all notes."
    : `A collection of notes tagged with "${filterValue}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://goit.global",
        },
      ],
    },
  };
}
