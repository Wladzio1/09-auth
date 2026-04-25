type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
