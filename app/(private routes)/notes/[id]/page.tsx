import { fetchNoteById } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const res = await fetchNoteById(id);

  const note = res.data;

  return (
    <main>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </main>
  );
}
