import { useEffect } from 'react';
import { X, GitBranch, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onInquire }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-category">{project.category}</span>
            <h2 id="modal-title">{project.title}</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Challenge &amp; Problem</h3>
            <p>{project.problem}</p>
          </div>

          <div className="modal-section">
            <h3>Architecture &amp; Solution</h3>
            <p>{project.solution}</p>
          </div>

          <div className="modal-section">
            <h3>Key Technologies</h3>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href={project.repoUrl || 'https://github.com/Sinchu-7'}
            target="_blank"
            rel="noreferrer"
            className="project-link-btn"
          >
            <GitBranch size={16} /> View Code
          </a>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              onClose();
              if (onInquire) onInquire();
            }}
          >
            Discuss Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
