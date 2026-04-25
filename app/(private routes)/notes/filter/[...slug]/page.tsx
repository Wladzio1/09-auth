import { fetchNotes } from "@/lib/api/serverApi";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] ?? "";

  const data = await fetchNotes({ tag });

  return (
    <div>
      {data.data.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}
