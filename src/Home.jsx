import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './App.css';

/* ─── Pixel Art "OPEN TO WORK" Glyph Badge ─── */
const PIXEL_GRID = [
  '..................................................................',
  '..##...###...####..#..#....#####...##.....#...#...##...###...#..#.',
  '.#..#..#..#..#.....##.#......#....#..#....#...#..#..#..#..#..#.#..',
  '.#..#..###...###...####......#....#..#....#.#.#..#..#..###...##...',
  '.#..#..#.....#.....#.##......#....#..#....##.##..#..#..#.#...#.#..',
  '..##...#.....####..#..#......#.....##.....#...#...##...#..#..#..#.',
  '..................................................................',
];

// Collect all lit pixel positions once
const LIT_PIXELS = [];
PIXEL_GRID.forEach((row, r) => {
  row.split('').forEach((cell, c) => {
    if (cell === '#') LIT_PIXELS.push(`${r}-${c}`);
  });
});

const PixelOpenToWork = () => {
  const cols = PIXEL_GRID[0].length;
  const rows = PIXEL_GRID.length;

  // Set of pixel keys currently blinking (briefly off)
  const [blinkSet, setBlinkSet] = useState(new Set());
  const intervalRef = useRef(null);

  useEffect(() => {
    let timer;
    const tick = () => {
      // Pick 30-45 random lit pixels to briefly blink off
      const newBlinks = new Set();
      const count = 8 + Math.floor(Math.random() * 7);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * LIT_PIXELS.length);
        newBlinks.add(LIT_PIXELS[idx]);
      }
      setBlinkSet(newBlinks);

      // Turn them back on after a short flash
      setTimeout(() => setBlinkSet(new Set()), 60 + Math.random() * 40);

      // Randomize next tick interval for organic feel
      timer = setTimeout(tick, 120 + Math.random() * 130);
    };

    timer = setTimeout(tick, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pixel-glyph-container">
      <div className="pixel-glyph-badge">
        <div
          className="pixel-grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {PIXEL_GRID.map((row, r) =>
            row.split('').map((cell, c) => {
              const isLit = cell === '#';
              const key = `${r}-${c}`;
              const isBlinking = isLit && blinkSet.has(key);
              const isRedPixel = r === 0 && c === 0;
              const cellStyle = isRedPixel
                ? { background: '#e53935' }
                : isBlinking
                  ? { opacity: 0.15 }
                  : undefined;
              return (
                <div
                  key={key}
                  className={`pixel-cell ${isLit ? 'lit' : ''} ${isRedPixel ? 'red-pixel' : ''}`}
                  style={cellStyle}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Pixel Art Winking Face for About Section ─── */
const CIRCLE_MASK = [
  '....#####....',
  '..#########..',
  '.###########.',
  '.###########.',
  '#############',
  '#############',
  '#############',
  '#############',
  '#############',
  '.###########.',
  '.###########.',
  '..#########..',
  '....#####....',
];

const SMILEY_GRID = [
  '.............',
  '.............',
  '..###...##...',
  '..###...##...',
  '..###....#...',
  '..###........',
  '.............',
  '.............',
  '..#.......#..',
  '...#.....#...',
  '....#####....',
  '.............',
  '.............',
];

const SMILEY_LIT = [];
SMILEY_GRID.forEach((row, r) => {
  row.split('').forEach((cell, c) => {
    if (cell === '#' && CIRCLE_MASK[r][c] === '#') SMILEY_LIT.push(`${r}-${c}`);
  });
});

const PixelSmiley = () => {
  const cols = SMILEY_GRID[0].length;
  const rows = SMILEY_GRID.length;
  const [blinkSet, setBlinkSet] = useState(new Set());

  useEffect(() => {
    let timer;
    const tick = () => {
      const newBlinks = new Set();
      const count = 4 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * SMILEY_LIT.length);
        newBlinks.add(SMILEY_LIT[idx]);
      }
      setBlinkSet(newBlinks);
      setTimeout(() => setBlinkSet(new Set()), 60 + Math.random() * 40);
      timer = setTimeout(tick, 150 + Math.random() * 200);
    };
    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="pixel-grid smiley-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {SMILEY_GRID.map((row, r) =>
        row.split('').map((cell, c) => {
          const key = `${r}-${c}`;
          const isVisible = CIRCLE_MASK[r][c] === '#';
          if (!isVisible) {
            return <div key={key} style={{ background: 'transparent' }} />;
          }
          const isLit = cell === '#';
          const isBlinking = isLit && blinkSet.has(key);
          return (
            <div
              key={key}
              className={`pixel-cell ${isLit ? 'lit' : ''}`}
              style={isBlinking ? { opacity: 0.15 } : undefined}
            />
          );
        })
      )}
    </div>
  );
};

/* ─── Scroll-Highlight Word ─── */
const ScrollHighlightWord = ({ word, index, total, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.4'],
  });

  const wordStart = index / total;
  const wordEnd = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.15, 1]);

  return (
    <>
      <motion.span style={{ opacity, transition: 'opacity 0.1s ease' }} className="scroll-word">
        {word}
      </motion.span>
      {' '}
    </>
  );
};

const ScrollHighlightText = ({ text }) => {
  const containerRef = useRef(null);
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <p className="scroll-highlight-text" ref={containerRef}>
      {words.map((word, i) => (
        <ScrollHighlightWord
          key={i}
          word={word}
          index={i}
          total={words.length}
          containerRef={containerRef}
        />
      ))}
    </p>
  );
};

/* ─── Experience Item ─── */
const CertificateItem = ({ year, title, subtitle, description, image }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="blog-item">
        <div className="blog-meta">{year}</div>
        <h3>{title}<br /><span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>{subtitle}</span></h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>{description}</p>
        {image && (
          <button className="cert-pill-btn" onClick={() => setShowModal(true)}>
            View Certificate
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        )}
      </div>

      {/* Certificate Modal */}
      {showModal && (
        <div className="cert-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <div className="cert-modal-image-wrapper">
              <img src={image} alt={title} className="cert-modal-image" />
              <div className="cert-modal-image-caption">
                <strong>{title}</strong> &mdash; {subtitle} &middot; {year}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProjectCard = ({ title, subtitle, bgColor, btnBg, btnColor, fontColor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="work-card"
      style={{ backgroundColor: bgColor, color: fontColor, cursor: 'pointer' }}
      onClick={() => navigate(`/project/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`)}
    >
      {/* Inverted Cutout Background Curve */}
      <div className="card-cutout-tr">
        {/* Clean Circular Button Container */}
        <div className="round-btn" style={{ backgroundColor: btnBg, color: btnColor }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>

      <div className="work-info">
        <h3 style={{ color: fontColor }}>{title}</h3>
        <p style={{ color: fontColor }}>{subtitle}</p>
      </div>

      <div className="work-img-box" style={{ backgroundColor: '#1f1f1f' }}>
        {/* Insert eventual image here */}
      </div>
    </div>
  );
};

function Home() {
  const { scrollY } = useScroll();
  const xTransform = useTransform(scrollY, [0, 5000], [0, -2500]);

  return (
    <div className="portfolio">
      <div className="dark-section">
        {/* Navigation */}
        <header className="navbar">
          <div className="logo">
            <div className="logo-pill"></div>
            <div className="logo-text">
              <span className="logo-line">Harshith
                R</span>
            </div>
          </div>
          <nav className="nav-links">
            <a href="#work">Projects</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* Hero Text */}
        <main className="hero">
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 10vw, 12rem)' }}>FULL STACK ENGINEER</h1>
          <div className="hero-subtitle">
            <p className="subtitle-desc">
              Full Stack and Mobile App Developer with<br />
              experience in Flutter, Kotlin, Firebase,<br />
              REST APIs, and cloud-based applications.
            </p>
            <div className="subtitle-right">
              <p className="subtitle-desc">
                I build scalable mobile and web applications with<br />
                real-time data, authentication, and backend integrations,<br />
                driving innovation through IoT and AI.
              </p>
              <a href="#contact" className="contact-link">GET IN TOUCH &rarr;</a>
            </div>
          </div>
        </main>
      </div>

      {/* Grid Graphic Section */}
      <div className="graphic-section-container">
        <div className="graphic-section">
          {/* Decorative Stickers Removed */}

          <div className="intro-text-container">
            <h1 className="intro-name">HARSHITH R.</h1>
            <p className="intro-title">A passionate innovator</p>
            <div className="intro-socials">
              <a href="https://linkedin.com/in/harshith-r-dev" target="_blank" rel="noreferrer" className="social-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="https://github.com/HARSHITHR0107" target="_blank" rel="noreferrer" className="social-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </a>
              <a href="mailto:harshith.r53583@gmail.com" className="social-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </a>
            </div>
          </div>

          <div className="portrait-container">
            <img src="/profile.png" alt="Harshith R" className="portrait-img" />
          </div>
        </div>
      </div>

      {/* --- Content Sections --- */}
      <div className="content-sections">

        {/* About Section */}
        <section id="about" className="section about-section dark-alt">
          <div className="section-header">
            <h2 className="section-title">ABOUT ME</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-content">
            <div className="about-left">
              <ScrollHighlightText text="I am a Full Stack and Mobile App Developer with experience building scalable applications. My focus spans real-time data, authentication, robust backend integrations, and cutting-edge API utilization." />
              <div className="skills-tags">
                <span>Flutter</span>
                <span>React Native</span>
                <span>React.js</span>
                <span>Node.js</span>
                <span>Firebase</span>
                <span>GCP</span>
                <span>TensorFlow</span>
                <span>Java</span>
                <span>Python</span>
                <span>IoT</span>
              </div>
            </div>
            <div className="about-right">
              <div className="about-glyph-circle">
                <PixelSmiley />
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Divider */}
        <div className="marquee-divider">
          <div className="marquee-container">
            <motion.div
              className="marquee-content"
              style={{ x: xTransform }}
            >
              <span>projects . projects . projects . projects . projects . projects . projects . projects . projects . projects .&nbsp;</span>
              <span>projects . projects . projects . projects . projects . projects . projects . projects . projects . projects .&nbsp;</span>
              <span>projects . projects . projects . projects . projects . projects . projects . projects . projects . projects .&nbsp;</span>
            </motion.div>
          </div>
        </div>

        {/* Work Section */}
        <section id="work" className="section work-section">
          <div className="section-header">
            <h2 className="section-title">KEY PROJECTS</h2>
            <div className="section-line"></div>
          </div>
          <div className="work-grid">
            <ProjectCard
              title="EqualVoice"
              subtitle="AI-Powered Comm Platform &bull; Real-time Audio"
              bgColor="#e2e2e2"
              btnBg="#ff5722"
              btnColor="#111"
              fontColor="#111"
            />
            <ProjectCard
              title="Circlify"
              subtitle="Virtual Fashion Try-On &bull; Generative AI"
              bgColor="#ff5722"
              btnBg="#e2e2e2"
              btnColor="#111"
              fontColor="#111"
            />
            <ProjectCard
              title="Nexus"
              subtitle="Project Management Platform &bull; Cloud AI"
              bgColor="#e2e2e2"
              btnBg="#ff5722"
              btnColor="#111"
              fontColor="#111"
            />
            <ProjectCard
              title="Nfcura App"
              subtitle="NFC-Based Healthcare App &bull; Firebase"
              bgColor="#111111"
              btnBg="#ff5722"
              btnColor="#111"
              fontColor="#e2e2e2"
            />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section blog-section dark-alt">
          <div className="section-header">
            <h2 className="section-title">PROFESSIONAL EXPERIENCE</h2>
            <div className="section-line"></div>
          </div>
          <div className="blog-list">
            <CertificateItem
              year="2025"
              title="Flutter Developer (Freelance)"
              subtitle="Proofbox App | Remote"
              description="Developed cross-platform mobile application utilizing Firebase and Git-based collaborative workflows."
            />
            <CertificateItem
              year="2024"
              title="Hackathon Participant"
              subtitle="Metadome AI"
              description="Built an AI-powered web app integrating Face-API.js and React.js dynamically adapting explanations based on real-time expression detection."
              image="/certificates/metadome.png"
            />
            <CertificateItem
              year="2026"
              title="JPMorgan Job Simulation"
              subtitle="Forage | Certificate"
              description="Software Engineering Job Simulation focusing on agile frameworks and enterprise development environments."
              certColor="#00897b"
              certTitle="JPMorgan Chase & Co."
              image="/certificates/jpmorgan.png"
            />
            <CertificateItem
              year="2026"
              title="Building with the Claude API"
              subtitle="Anthropic Education | Certificate"
              description="Learned to integrate and utilize the Claude API to build robust AI-powered solutions."
              certColor="#d4a056"
              certTitle="Anthropic Education"
              image="/certificates/anthropic-claude-api.jpg"
            />
            <CertificateItem
              year="2026"
              title="Claude Code in Action"
              subtitle="Anthropic Education | Certificate"
              description="Explored practical, hands-on techniques for real-world software engineering tasks with Claude."
              certColor="#7c4dff"
              certTitle="Anthropic Education"
              image="/certificates/anthropic-claude-code.jpg"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="contact-content">
            <PixelOpenToWork />
            <h2 className="massive-title">LET'S TALK</h2>
            <p>Ready to create something amazing together? Drop me a line.</p>
            <a href="mailto:harshith.r53583@gmail.com" className="email-link">harshith.r53583@gmail.com</a>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>+91-9353678244</p>
          </div>

          <footer className="footer">
            <div className="footer-links">
              <a href="https://linkedin.com/in/harshith-r-dev" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/HARSHITHR0107" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <p>&copy; 2026 HARSHITH R. ALL RIGHTS RESERVED.</p>
          </footer>
        </section>

      </div>
    </div>
  );
}

export default Home;
