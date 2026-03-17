export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        The Headlines Today &middot; AI-curated by Maxwell &middot; &copy; {year}
      </p>
    </footer>
  );
}
