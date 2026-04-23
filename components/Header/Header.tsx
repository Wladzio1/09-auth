import css from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/">NoteHub</Link>

      <nav>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
