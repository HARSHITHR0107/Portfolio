import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const projectData = {
  'equalvoice': {
    title: 'EqualVoice',
    subtitle: 'AI-Powered Comm Platform • Real-time Audio',
    description: 'EqualVoice is an AI-powered communication platform designed to provide real-time audio processing and translation. It bridges communication gaps by leveraging advanced machine learning models for speech recognition and generation.',
    techStack: ['React', 'Node.js', 'WebRTC', 'TensorFlow', 'Socket.io'],
    bgColor: '#e2e2e2',
    fontColor: '#111',
    mockupType: 'iphone',
    slides: [
      { text: 'Login & Authentication', bg: '#4A90E2' },
      { text: 'Real-time Audio Dashboard', bg: '#E24A4A' },
      { text: 'Translation Settings', bg: '#4AE2B5' }
    ]
  },
  'circlify': {
    title: 'Circlify',
    subtitle: 'Virtual Fashion Try-On • Generative AI',
    description: 'Circlify revolutionizes the e-commerce fashion industry by allowing users to virtually try on clothing. It uses generative AI to superimpose garments onto user photos with highly realistic physics and lighting.',
    techStack: ['Python', 'PyTorch', 'React Native', 'AWS', 'FastAPI'],
    bgColor: '#ff5722',
    fontColor: '#111',
    mockupType: 'iphone',
    slides: [
      { text: 'Scan Your Body', bg: '#914AE2' },
      { text: 'Select a Garment', bg: '#E2914A' },
      { text: 'Try-On Preview', bg: '#B5E24A' }
    ]
  },
  'nexus': {
    title: 'Nexus',
    subtitle: 'Project Management Platform • Cloud AI',
    description: 'Nexus is a comprehensive project management platform that integrates cloud AI to automate task assignment, predict project bottlenecks, and optimize resource allocation for large-scale enterprise teams.',
    techStack: ['Vue.js', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
    bgColor: '#e2e2e2',
    fontColor: '#111',
    mockupType: 'laptop',
    slides: [
      { text: 'Enterprise Dashboard', bg: '#4A4AE2' },
      { text: 'AI Resource Allocation', bg: '#E24AB5' },
      { text: 'Project Timeline View', bg: '#4AE24A' }
    ]
  },
  'nfcura-app': {
    title: 'Nfcura App',
    subtitle: 'NFC-Based Healthcare App • Firebase',
    description: 'Nfcura is a healthcare application that utilizes NFC technology to instantly retrieve patient records, verify medications, and streamline the hospital admission process. Built with robust security using Firebase.',
    techStack: ['Flutter', 'Firebase', 'NFC API', 'GCP', 'Kotlin'],
    bgColor: '#111111',
    fontColor: '#e2e2e2',
    mockupType: 'iphone',
    slides: [
      { text: 'NFC Scan Prompt', bg: '#2C3E50' },
      { text: 'Patient Medical Profile', bg: '#E74C3C' },
      { text: 'Secure Prescription Log', bg: '#3498DB' }
    ]
  }
};
const DeviceShowcase = ({ type, slides, theme = 'dark' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const mockupClass = `mockup-container ${theme === 'light' ? 'mockup-light' : 'mockup-dark'}`;

  const renderSlides = () => (
    <div 
      className="slides-wrapper"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="slide-content"
          style={{ backgroundColor: slide.bg }}
        >
          {slide.text}
        </div>
      ))}
    </div>
  );

  return (
    <div className={mockupClass}>
      <div className="device-wrapper">
        {type === 'laptop' ? (
          <div className="laptop-mockup">
            <div className="laptop-screen">
              <div className="laptop-notch"></div>
              <div className="mockup-slideshow">
                {renderSlides()}
              </div>
            </div>
            <div className="laptop-base"></div>
          </div>
        ) : (
          <div className="iphone-mockup">
            <div className="dynamic-island"></div>
            <div className="mockup-slideshow">
              {renderSlides()}
            </div>
          </div>
        )}
      </div>

      <div className="keyboard-controls">
        <div className="key-row">
          <button className="mech-key" onClick={handlePrev} title="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        </div>
        <div className="key-row">
          <button className="mech-key" onClick={handlePrev} title="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button className="mech-key" onClick={handleNext} title="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </button>
          <button className="mech-key" onClick={handleNext} title="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="portfolio">
        <div className="dark-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>PROJECT NOT FOUND</h1>
          <button className="contact-link" onClick={() => navigate('/')} style={{ marginTop: '2rem', cursor: 'pointer', background: 'transparent', border: 'none', color: '#ff5722' }}>
            &larr; BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio" style={{ backgroundColor: project.bgColor, color: project.fontColor, minHeight: '100vh' }}>

      {/* Custom Navigation for Project Page */}
      <header className="navbar" style={{ mixBlendMode: 'difference', padding: '2.5rem 4rem', marginBottom: '0', position: 'relative', zIndex: 10 }}>
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div className="logo-pill" style={{ backgroundColor: '#fff' }}></div>
          <div className="logo-text">
            <span className="logo-line" style={{ color: '#fff' }}>Back to Home</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="project-hero">

        {/* Device Container */}
        <div className={`project-device-container ${project.mockupType}`}>
          <DeviceShowcase type={project.mockupType} slides={project.slides} theme={project.bgColor === '#111111' ? 'light' : 'dark'} />
        </div>

        {/* Text Container */}
        <div className={`project-text-container ${project.mockupType}`}>
          <h1 className="project-title" style={{ color: project.fontColor }}>
            {project.title.toUpperCase()}
          </h1>
          {/* Compressed Subtitle Text */}
          <div className="hero-subtitle project-subtitle-container">
            <p className="subtitle-desc project-subtitle" style={{ color: project.fontColor }}>
              {project.subtitle}
            </p>
            <div className="tech-stack-pills">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-pill" style={{
                  color: project.fontColor,
                  border: `1px solid ${project.fontColor === '#111111' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'}`,
                  backgroundColor: project.fontColor === '#111111' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Project Content */}
      <div className="content-sections" style={{ backgroundColor: 'transparent', paddingTop: '0' }}>
        <section className="section about-section" style={{ backgroundColor: 'transparent' }}>
          <div className="section-header">
            <h2 className="section-title" style={{ color: project.fontColor }}>OVERVIEW</h2>
            <div className="section-line" style={{ backgroundColor: project.fontColor, opacity: 0.3 }}></div>
          </div>
          <div className="about-content">
            <p className="large-text" style={{ color: project.fontColor }}>
              {project.description}
            </p>
          </div>
        </section>

        {/* Footer */}
        <section className="section contact-section" style={{ backgroundColor: 'transparent' }}>
          <footer className="footer" style={{ borderTopColor: project.fontColor }}>
            <div className="footer-links">
              <span style={{ cursor: 'pointer', color: project.fontColor }} onClick={() => navigate('/')}>Home</span>
            </div>
            <p style={{ color: project.fontColor, opacity: 0.7 }}>&copy; 2026 HARSHITH R. ALL RIGHTS RESERVED.</p>
          </footer>
        </section>

      </div>
    </div>
  );
}

export default ProjectDetail;
