import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const experience = [
  {
    role: 'OCC Analyst',
    company: 'L2M Rail Pvt Ltd',
    period: 'March 2026 – Present',
    responsibilities: [
      'Monitor railway operations to ensure smooth and efficient functioning.',
      'Analyze operational data to identify issues and irregularities.',
      'Coordinate operational activities to support uninterrupted railway services.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Zidio Development',
    period: 'August 2026 – October 2026',
    responsibilities: [
      'Contributed to web application development.',
      'Developed responsive web applications using full-stack technologies.',
      'Contributed to frontend and backend development as part of development projects.',
    ],
  },
];

const projects = [
  {
    title: 'WOMEN SAFETY CCTV SURVEILLANCE SYSTEM',
    category: 'Computer Vision',
    problem: 'The project addresses the need for proactive monitoring and body-language analysis to improve women’s safety in public and semi-public spaces.',
    solution: 'A deep learning-based surveillance concept that interprets pose and movement patterns to detect suspicious or irregular activity in real time.',
    tags: ['Computer Vision', 'Deep Learning', 'Human Pose Estimation', '17 Keypoints', 'Real-time surveillance'],
    accent: 'safety',
    metric: '17',
    detail: 'Body connections',
  },
  {
    title: 'PLANT DISEASE DETECTION',
    category: 'AI for Agriculture',
    problem: 'Early detection of plant disease is essential for protecting crop health and reducing losses in agricultural workflows.',
    solution: 'A deep learning system that analyzes plant images, classifies visible symptoms, and supports faster disease identification for crop monitoring.',
    tags: ['Deep Learning', 'Image Classification', 'Plant Image Analysis', 'Disease Identification', 'Crop Monitoring'],
    accent: 'plant',
    metric: 'AI',
    detail: 'Image-driven detection',
  },
  {
    title: 'LOOP — CUSTOMER REVIEW ANALYTICS PLATFORM',
    category: 'Business Intelligence',
    problem: 'Large businesses often struggle to organize massive review datasets into actionable insight and trend analysis.',
    solution: 'A platform for processing customer review data, organizing stream data, and visualizing sentiment and operational patterns through interactive dashboards.',
    tags: ['CSV Data Processing', 'Review Organization', 'Interactive Dashboards', 'Recharts', 'Visualization'],
    accent: 'loop',
    metric: 'Dash',
    detail: 'Customer insights',
  },
];

const skills = {
  Programming: ['Python', 'C', 'C++', 'Java'],
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js'],
  Database: ['MongoDB', 'SQL'],
  'AI / Machine Learning': ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'RAG'],
  'Data Visualization': ['Power BI', 'Tableau'],
};

const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Information Science & Engineering',
    institution: 'Aditya College of Engineering and Technology, Bangalore',
    period: 'Expected Graduation: 2027',
    meta: 'CGPA: 8.74',
  },
  {
    degree: 'Pre-University – PCMC',
    field: '',
    institution: 'Viveka Pre-University College, Kota, Udupi',
    period: 'Completed: April 2023',
    meta: '',
  },
];

const certifications = [
  { name: 'NPTEL', detail: 'Cloud Computing' },
  { name: 'Simplilearn', detail: 'TensorFlow for Beginners' },
];

const hackathons = ['GeeksforGeeks Hackathon — 2026', 'EPOCH Hackathon — 2026', 'Hack Buzz Hackathon — 2026'];

const starParticles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 13.7) % 100}%`,
  top: `${(index * 17.3) % 100}%`,
  size: `${(index % 3) + 2}px`,
  duration: `${7 + (index % 8)}s`,
  delay: `${(index % 9) * 0.8}s`,
  opacity: 0.35 + (index % 5) * 0.12,
}));

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const validateForm = (values) => {
    const nextErrors = {};

    if (!values.name.trim()) nextErrors.name = 'Name is required.';
    if (!values.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!values.subject.trim()) nextErrors.subject = 'Subject is required.';
    if (!values.message.trim()) nextErrors.message = 'Message is required.';
    else if (values.message.trim().length < 10) nextErrors.message = 'Message should be at least 10 characters long.';

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Please correct the highlighted fields and try again.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Unable to send message right now.');
      }

      setStatus({ type: 'success', message: 'Your message has been sent successfully. I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong while sending the form.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>Name</span>
          <input aria-invalid={Boolean(errors.name)} name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
          {errors.name ? <small>{errors.name}</small> : null}
        </label>

        <label className="field">
          <span>Email</span>
          <input aria-invalid={Boolean(errors.email)} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>
      </div>

      <label className="field">
        <span>Subject</span>
        <input aria-invalid={Boolean(errors.subject)} name="subject" value={formData.subject} onChange={handleChange} placeholder="Project discussion, collaboration, or idea" />
        {errors.subject ? <small>{errors.subject}</small> : null}
      </label>

      <label className="field">
        <span>Message</span>
        <textarea aria-invalid={Boolean(errors.message)} name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Tell me about the idea, challenge, or opportunity." />
        {errors.message ? <small>{errors.message}</small> : null}
      </label>

      <button type="submit" className="primary-button" disabled={loading}>
        {loading ? 'Sending...' : 'Submit Message'}
      </button>

      {status.message ? <p className={`form-status ${status.type}`}>{status.message}</p> : null}
    </form>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry && visibleEntry.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: [0.2, 0.4, 0.7] },
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleJump = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="page-shell">
        <div className="galaxy-bg" aria-hidden="true">
          {starParticles.map((star) => (
            <span
              key={star.id}
              className="star-particle"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDuration: star.duration,
                animationDelay: star.delay,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <header className="site-header">
          <div className="container nav-bar">
            <a href="#home" className="brand-mark" onClick={(event) => { event.preventDefault(); handleJump('home'); }}>
              SINCHANA POOJARY
            </a>

            <nav className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className={activeSection === item.href.replace('#', '') ? 'nav-link active' : 'nav-link'}
                  onClick={() => handleJump(item.href.replace('#', ''))}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button type="button" className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen((state) => !state)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <main>
          <section id="home" className="hero section">
            <div className="container hero-grid">
              <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                <p className="eyebrow">Portfolio · Bangalore, India</p>
                <h1>Engineering Ideas Into Meaningful Digital Experiences.</h1>
                <p className="lead">
                  I&apos;m Sinchana Poojary, an Information Science engineering student and aspiring software engineer passionate about full-stack development,
                  artificial intelligence, and building technology that solves real-world problems.
                </p>

                <div className="hero-badges" aria-label="Professional titles">
                  <span>Sinchana Poojary</span>
                  <span>Software Engineer</span>
                  <span>Full Stack Developer</span>
                  <span>AI/ML Enthusiast</span>
                </div>

                <div className="hero-actions">
                  <button type="button" className="primary-button" onClick={() => handleJump('projects')}>
                    Explore My Work <ArrowRight size={18} />
                  </button>

                  <a href="mailto:sinchhh09@gmail.com?subject=Resume%20Request" className="secondary-button">
                    <Download size={18} /> Download Resume
                  </a>

                  <button type="button" className="secondary-button" onClick={() => handleJump('contact')}>
                    Let&apos;s Connect
                  </button>
                </div>

                <div className="social-row" aria-label="Social links">
                  <a href="https://github.com/Sinchu-7" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                    <GitBranch size={18} />
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                    <Link2 size={18} />
                  </a>
                  <a href="mailto:sinchhh09@gmail.com" aria-label="Email Sinchana">
                    <Mail size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div className="hero-panel" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
                <div className="profile-card">
                  <div className="avatar-placeholder" aria-label="Profile placeholder">
                    <Sparkles size={38} />
                  </div>
                  <div className="profile-detail">
                    <p className="topline">Current Focus</p>
                    <h3>Full-stack product engineering</h3>
                    <ul>
                      <li>AI-driven applications</li>
                      <li>Web system design</li>
                      <li>Practical problem solving</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="section muted-section">
            <div className="container">
              <SectionHeader
                eyebrow="About"
                title="Engineering student with a passion for building useful technology."
                description="I enjoy learning by building, problem-solving through code, and translating ideas into products that solve real-world challenges."
              />

              <div className="about-grid">
                <div className="about-copy">
                  <p>
                    I am a B.E. Information Science &amp; Engineering student at Aditya College of Engineering and Technology, with a strong interest in full-stack development,
                    artificial intelligence, and machine learning. My academic journey and project work have shaped my interest in designing systems that are useful,
                    scalable, and aligned with real-world needs.
                  </p>
                  <p>
                    I enjoy building practical applications, learning continuously, and exploring technologies that can create meaningful impact. Through hands-on project
                    development and technical exploration, I am building a foundation in software engineering, product thinking, and problem solving.
                  </p>
                </div>

                <aside className="info-panel">
                  <div className="info-item"><span>Degree</span><strong>BE – Information Science &amp; Engineering</strong></div>
                  <div className="info-item"><span>Institution</span><strong>Aditya College of Engineering and Technology</strong></div>
                  <div className="info-item"><span>CGPA</span><strong>8.74</strong></div>
                  <div className="info-item"><span>Expected Graduation</span><strong>2027</strong></div>
                  <div className="info-item"><span>Location</span><strong>Bangalore, India</strong></div>
                </aside>
              </div>
            </div>
          </section>

          <section id="experience" className="section">
            <div className="container">
              <SectionHeader eyebrow="Experience" title="Career and hands-on development experience." />
              <div className="timeline">
                {experience.map((entry) => (
                  <article className="timeline-item" key={entry.role}>
                    <div className="timeline-marker" aria-hidden="true" />
                    <div className="timeline-content">
                      <div className="timeline-meta">
                        <span className="timeline-date">{entry.period}</span>
                        <span className="timeline-role">{entry.role}</span>
                      </div>
                      <h3>{entry.company}</h3>
                      <ul>
                        {entry.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="section muted-section">
            <div className="container">
              <SectionHeader
                eyebrow="Featured Projects"
                title="Research-driven ideas translated into practical systems."
                description="Each project focuses on solving a real challenge using applied AI, data workflows, and engineering design principles."
              />

              <div className="project-stack">
                {projects.map((project) => (
                  <article className={`project-card ${project.accent}`} key={project.title}>
                    <div className="project-visual" aria-hidden="true">
                      <div className="visual-device">
                        <span className="metric">{project.metric}</span>
                        <span className="metric-label">{project.detail}</span>
                      </div>
                    </div>
                    <div className="project-copy">
                      <p className="project-category">{project.category}</p>
                      <h3>{project.title}</h3>
                      <p className="project-summary">{project.problem}</p>
                      <p>{project.solution}</p>
                      <div className="tag-list">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="section">
            <div className="container">
              <SectionHeader eyebrow="Technical Skills" title="A balanced toolkit across software, data, and AI." />

              <div className="skills-grid">
                {Object.entries(skills).map(([group, items]) => (
                  <div className="skill-group" key={group}>
                    <h3>{group}</h3>
                    <div className="skill-list">
                      {items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="education" className="section muted-section">
            <div className="container">
              <SectionHeader eyebrow="Education" title="Academic foundation and continuous learning." />

              <div className="education-list">
                {education.map((entry) => (
                  <article className="education-card" key={`${entry.degree}-${entry.institution}`}>
                    <div className="education-icon"><GraduationCap size={22} /></div>
                    <div>
                      <h3>{entry.degree}</h3>
                      {entry.field ? <p className="education-field">{entry.field}</p> : null}
                      <p>{entry.institution}</p>
                      <p className="education-meta">{entry.period}</p>
                      {entry.meta ? <p className="education-meta">{entry.meta}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="achievements" className="section">
            <div className="container achieve-wrap">
              <SectionHeader eyebrow="Achievements" title="Recognition for applied problem solving." />

              <div className="achievement-card">
                <div className="achievement-mark">
                  <Award size={28} />
                </div>
                <div>
                  <p className="achievement-label">Winner</p>
                  <h3>AI-Powered Solutions for Real-World Problems — 2026</h3>
                </div>
              </div>
            </div>
          </section>

          <section className="section muted-section" id="certifications">
            <div className="container">
              <SectionHeader eyebrow="Certifications" title="Validated learning in cloud and AI technologies." />

              <div className="info-chips">
                {certifications.map((certification) => (
                  <div className="chip-card" key={`${certification.name}-${certification.detail}`}>
                    <span>{certification.name}</span>
                    <strong>{certification.detail}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="hackathons">
            <div className="container">
              <SectionHeader eyebrow="Hackathons" title="Competitive and collaborative problem-solving." />

              <div className="hackathon-list">
                {hackathons.map((hackathon) => (
                  <div className="hackathon-item" key={hackathon}>
                    <CheckCircle2 size={18} />
                    <span>{hackathon}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="section contact-section">
            <div className="container contact-grid">
              <div className="contact-copy">
                <SectionHeader eyebrow="Contact" title="Have an Idea? Let&apos;s Build Something Meaningful." />
                <div className="contact-details">
                  <p><Mail size={18} /> sinchhh09@gmail.com</p>
                  <p><MapPin size={18} /> Bangalore, India</p>
                  <p><Phone size={18} /> 7760489756</p>
                </div>

                <div className="contact-links">
                  <a href="https://github.com/Sinchu-7" target="_blank" rel="noreferrer"><GitBranch size={18} /> GitHub</a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Link2 size={18} /> LinkedIn</a>
                </div>
              </div>

              <ContactForm />
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <h3>Sinchana Poojary.</h3>
              <p>Building technology with clarity, purpose, and practical impact.</p>
            </div>

            <div className="footer-links">
              {navItems.map((item) => (
                <button type="button" key={item.label} onClick={() => handleJump(item.href.replace('#', ''))}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="footer-socials">
              <a href="https://github.com/Sinchu-7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:sinchhh09@gmail.com">Email</a>
            </div>
          </div>
          <div className="container footer-meta">
            <span>© {new Date().getFullYear()} Sinchana Poojary.</span>
            <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to top <ArrowUpRight size={16} />
            </button>
          </div>
        </footer>

        {showBackToTop ? (
          <button type="button" className="fab-back" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUpRight size={18} />
          </button>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}

export default App;
