import { Metadata } from "next";
import css from "./Home.module.css";

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "404 - Not Found",
    description: "The page you are looking for does not exist.",
    url: "https://07-routing-nextjs-6z5t84csi-wladzio1s-projects.vercel.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-404.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Image",
      },
    ],
  },
};
