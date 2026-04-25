import Link from "next/link";

export default function Default() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul>
      <li>
        <Link href="/notes/filter/all">All notes</Link>
      </li>

      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
