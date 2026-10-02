import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clipboard, Code2, Cloud, ExternalLink, Github, Instagram, Linkedin, Mail, Menu, Phone, Sparkles, X, Zap } from "lucide-react";
import { Toaster, toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project_type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const cursor = document.querySelector(".cursor-dot");
    const move = (event) => { if (cursor) { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; } };
    window.addEventListener("mousemove", move);
    return () => { reveal.disconnect(); window.removeEventListener("mousemove", move); };
  }, []);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const alreadyCounted = sessionStorage.getItem("vs-visit-counted");
        const res = alreadyCounted ? await axios.get(`${API}/visits/count`) : await axios.post(`${API}/visits/track`);
        sessionStorage.setItem("vs-visit-counted", "1");
        setVisits(res.data.count);
      } catch {}
    };
    trackVisit();
  }, []);

  const pitch = "Hi [Client Name], my name is Vikas Subramani. Together with my team, we specialize in unique, fully functional and beautifully animated websites designed to help businesses stand out online. Let's connect for a quick 5-minute chat about what you need!";
  const copyPitch = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(pitch);
      else throw new Error("Clipboard API unavailable");
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = pitch;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      const copiedWithFallback = document.execCommand("copy");
      fallback.remove();
      if (!copiedWithFallback) return toast.error("Copy is unavailable in this browser");
    }
    setCopied(true);
    toast.success("Pitch copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };
  const submitInquiry = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.project_type || !form.message) return toast.error("Please complete all project details");
    try { await axios.post(`${API}/inquiries`, form); setSubmitted(true); setForm({ name: "", email: "", project_type: "", message: "" }); toast.success("Thanks — Vikas will be in touch soon."); } catch { toast.error("Something went wrong. Please email Vikas directly."); }
  };
  const services = [["01", "Fully custom & animated", "Dynamic visual effects, smooth scroll animations and interactive UI shaped around your brand.", Sparkles, "pink"], ["02", "End-to-end functionality", "From front-end UI to back-end integrations, dashboards, forms and database management.", Code2, "blue"], ["03", "Cloud infrastructure", "Fast, secure and reliable Google Cloud configurations built for growth and uptime.", Cloud, "yellow"], ["04", "Studio-grade, lean pricing", "High-end design and engineering for small businesses, startups and personal brands.", Zap, "green"]];
  const skills = ["React.js", "GSAP", "Framer Motion", "Tailwind CSS", "Node.js", "Express", "REST APIs", "GCP", "Firebase", "Cloud Storage", "Performance", "Git / GitHub"];

  return <div className="portfolio-shell">
    <div className="cursor-dot" aria-hidden="true" />
    <nav className="nav-wrap" data-testid="site-navigation"><a className="brand" href="#top" data-testid="brand-home">VS<span>.</span></a><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#work" data-testid="nav-work">Work</a><a href="#services" data-testid="nav-services">Capabilities</a><a href="#about" data-testid="nav-about">About</a><a href="#contact" className="nav-contact" data-testid="nav-contact">Start a project <ArrowUpRight size={16} /></a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" data-testid="mobile-menu-button">{menuOpen ? <X /> : <Menu />}</button></nav>
    <main id="top">
      <section className="hero section-pad"><div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-line" /></div><h1>Digital ideas,<br /><em>with a pulse.</em></h1><p className="hero-lede">I’m Vikas — a lead web developer building expressive, high-performance websites that make brands impossible to ignore.</p><div className="hero-actions"><a href="mailto:vikasvikkim143@gmail.com" className="button button-dark" data-testid="hero-email-button">Let’s build something <ArrowUpRight size={17} /></a><a href="#work" className="text-link" data-testid="hero-work-link">See selected work <span>↓</span></a></div></div><div className="hero-visual reveal"><div className="image-frame"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85" alt="Creative developer workspace" data-testid="hero-workspace-image" /><div className="image-sticker">GOA<br /><small>INDIA · 2025</small></div></div><div className="hero-caption"><span>WEB DEVELOPER / TEAM LEAD</span><span>SCROLL TO EXPLORE ↓</span></div></div></section>
      <div className="marquee" aria-label="Services marquee"><div>INTERACTION <span>✳</span> FUNCTION <span>✳</span> PERFORMANCE <span>✳</span> INTERACTION <span>✳</span> FUNCTION <span>✳</span></div></div>
      <section id="services" className="section-pad services-section"><div className="section-heading reveal"><span className="section-number">01 / 04</span><h2>More than a<br /><em>pretty interface.</em></h2><p>The websites I build are designed to feel as good as they work — with every layer considered.</p></div><div className="service-grid">{services.map(([num, title, text, Icon, color]) => <motion.article whileHover={{ y: -8, rotate: color === "pink" ? -1 : 1 }} className={`service-card ${color} reveal`} key={num} data-testid={`service-card-${num}`}><div className="service-top"><span>{num}</span><Icon size={25} /></div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="card-arrow" size={22} /></motion.article>)}</div></section>
      <section id="work" className="work-section section-pad"><div className="section-heading reveal"><span className="section-number">02 / 04</span><h2>Selected<br /><em>experiments.</em></h2><p>Two hackathon builds. Tight timelines. A lot of late nights and even better outcomes.</p></div><div className="project-list"><article className="project-card project-one reveal" data-testid="project-card-one"><div className="project-meta"><span>01 / HACKATHON PROJECT</span><span>INTERACTIVE WEB APP</span></div><div className="project-body"><div><h3>Cloud<br /><em>in motion.</em></h3><p>An interactive cloud-hosted application built from scratch under pressure, with real-time API inputs and a slick, responsive interface.</p><a href="#contact" className="project-link" data-testid="project-one-link">Discuss a similar build <ArrowUpRight size={16} /></a></div><div className="project-art art-one"><div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" /><div className="art-core">API<br /><small>LIVE</small></div></div></div></article><article className="project-card project-two reveal" data-testid="project-card-two"><div className="project-meta"><span>02 / HACKATHON PROJECT</span><span>MULTI-PAGE PORTAL</span></div><div className="project-body"><div><h3>Built for<br /><em>momentum.</em></h3><p>A high-performance portal structured for Google Cloud, using lightweight assets to keep every transition fast across devices.</p><a href="#contact" className="project-link" data-testid="project-two-link">Start your portal <ArrowUpRight size={16} /></a></div><div className="project-art art-two"><div className="portal-window"><div className="portal-bar" /><div className="portal-lines" /><div className="portal-block" /></div></div></div></article></div></section>
      <section id="about" className="about-section section-pad"><div className="section-heading reveal"><span className="section-number">03 / 04</span><h2>Curious by<br /><em>default.</em></h2></div><div className="about-grid"><div className="about-copy reveal"><p className="large-copy">I’m a second-year B.Tech student at Parul University, Goa — leading a specialized web team that loves turning ambitious ideas into <span>useful, unforgettable experiences.</span></p><p>Two-time hackathon participant. Google Cloud trained. Always learning, always shipping.</p><div className="timeline"><div><strong>2028</strong><span>B.Tech · Parul University<br />Expected graduation</span></div><div><strong>GCP</strong><span>Cloud coursework<br />& skill badges</span></div></div></div><div className="skills-panel reveal"><div className="skills-label">CORE TOOLKIT <span>↘</span></div><div className="skill-tags">{skills.map((skill, index) => <span key={skill} className={index % 4 === 0 ? "tag-highlight" : ""} data-testid={`skill-${index}`}>{skill}</span>)}</div></div></div></section>
      <section className="pitch-section section-pad"><div className="pitch-card reveal"><div className="pitch-head"><span>THE PITCH / 01</span><button onClick={copyPitch} data-testid="copy-pitch-button">{copied ? <Check size={16} /> : <Clipboard size={16} />} {copied ? "COPIED" : "COPY PITCH"}</button></div><blockquote>“Whether you need smooth interactive animations, cloud hosting setup, or complex backend features — <em>we handle the entire project.</em>”</blockquote><div className="pitch-foot"><span>VIKAS SUBRAMANI · LEAD WEB DEVELOPER</span><span>5-MINUTE CHAT?</span></div></div></section>
      <section id="contact" className="contact-section section-pad"><div className="contact-intro reveal"><span className="section-number">04 / 04</span><h2>Have a good<br /><em>idea?</em></h2><p>Tell me what you’re imagining. I’ll bring the team, the energy and a plan.</p><div className="direct-links"><a href="mailto:vikasvikkim143@gmail.com" data-testid="contact-email-link"><Mail size={18} /> vikasvikkim143@gmail.com</a><a href="tel:+916362368690" data-testid="contact-phone-link"><Phone size={18} /> +91 63623 6890</a><a href="https://wa.me/916362368690" target="_blank" rel="noreferrer" data-testid="contact-whatsapp-link"><ExternalLink size={18} /> WhatsApp me</a></div></div><form className="inquiry-form reveal" onSubmit={submitInquiry} data-testid="inquiry-form"><div className="form-intro">PROJECT INQUIRY <span>✳</span></div><label>Your name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" data-testid="inquiry-name-input" required /></label><label>Email address<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" data-testid="inquiry-email-input" required /></label><label>What can we build?<select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} data-testid="inquiry-type-select" required><option value="">Choose a project type</option><option>Brand website</option><option>Interactive web app</option><option>Cloud portal</option><option>Something else</option></select></label><label>Tell me a little more<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="The big idea is..." rows="3" data-testid="inquiry-message-input" required /></label><button className="button button-dark form-submit" type="submit" data-testid="inquiry-submit-button">{submitted ? "Message sent ✓" : "Send inquiry"} <ArrowUpRight size={17} /></button></form></section>
    </main>
    <footer className="footer"><div><a className="brand" href="#top" data-testid="footer-brand">VS<span>.</span></a><p>Websites with a pulse.<br />Built in Goa, India.</p></div><div className="footer-right"><div className="socials"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" data-testid="github-link"><Github size={19} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="linkedin-link"><Linkedin size={19} /></a><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="instagram-link"><Instagram size={19} /></a></div><span>© 2025 VIKAS SUBRAMANI</span></div></footer><Toaster position="bottom-right" richColors />
  </div>;
};

function App() { return <BrowserRouter><Routes><Route path="/" element={<Home />} /></Routes></BrowserRouter>; }
export default App;