export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 text-sm text-neutral-500 flex justify-between">
      <span>© {new Date().getFullYear()}</span>
      <span>Built with care.</span>
    </footer>
  );
}
