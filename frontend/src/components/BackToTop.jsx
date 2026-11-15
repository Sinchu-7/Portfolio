import { ArrowUp } from 'lucide-react';

export default function BackToTop({ show }) {
  if (!show) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className="fab-back-to-top"
      aria-label="Scroll back to top of page"
      onClick={scrollToTop}
    >
      <ArrowUp size={20} />
    </button>
  );
}
