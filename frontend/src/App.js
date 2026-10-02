import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Lenis from "lenis";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, Check, Clipboard, Cloud, Code2, ExternalLink, Github, Instagram, Linkedin, Mail, Menu, Phone, Sparkles, X, Zap } from "lucide-react";
import { Toaster, toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EASE = [0.16, 1, 0.3, 1];

const IMG = {
  workspace: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNyZWF0aXZlJTIwc3R1ZGlvJTIwd29ya3NwYWNlJTIwY29kZSUyMGxhcHRvcHxlbnwwfHx8fDE3OTA5MTQzNzB8MA&ixlib=rb-4.1.0&q=85",
  portal: "https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNyZWF0aXZlJTIwc3R1ZGlvJTIwd29ya3NwYWNlJTIwY29kZSUyMGxhcHRvcHxlbnwwfHx8fDE3OTA5MTQzNzB8MA&ixlib=rb-4.1.0&q=85",
  desk: "https://images.unsplash.com/photo-1525373698358-041e3a460346?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNyZWF0aXZlJTIwc3R1ZGlvJTIwd29ya3NwYWNlJTIwY29kZSUyMGxhcHRvcHxlbnwwfHx8fDE3OTA5MTQzNzB8MA&ixlib=rb-4.1.0&q=85",
};

export const LogoMark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" data-testid="logo-mark">
    <rect x="5" y="20" width="22" height="6" rx="3" fill="#D7FF3E" opacity="0.35" />
    <rect x="5" y="13" width="22" height="6" rx="3" fill="#D7FF3E" opacity="0.65" />
    <rect x="5" y="6" width="22" height="6" rx="3" fill="#D7FF3E" />
  </svg>
);

const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.9, delay, ease: EASE }} {...rest}>
    {children}
  </motion.div>
);

const HeroLine = ({ children, delay }) => (
  <span className="hero-mask">
    <motion.span initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: 1.15, delay, ease: EASE }}>
      {children}
    </motion.span>
  </span>
);

const services = [
  { n: "01", t: "Fully custom & animated", d: "Dynamic visual effects, buttery scroll motion and interactive UI shaped around your brand — never a template.", Icon: Sparkles, cls: "bento-a", orb: true },
  { n: "02", t: "End-to-end functionality", d: "Front-end UI to back-end integrations, dashboards, forms and database management. One team, whole stack.", Icon: Code2, cls: "bento-b" },
  { n: "03", t: "Cloud infrastructure", d: "Fast, secure Google Cloud configurations built for growth and uptime — deployed, monitored, maintained.", Icon: Cloud, cls: "bento-c" },
  { n: "04", t: "Studio-grade, lean pricing", d: "High-end design and engineering at prices small businesses, startups and personal brands can actually move on.", Icon: Zap, cls: "bento-d" },
];

const cases = [
  {
    index: "01", tag: "HACKATHON BUILD · 48 HRS", title: <>Cloud in<br /><em>motion.</em></>,
    desc: "An interactive cloud-hosted application built from scratch under hackathon pressure — real-time API inputs behind a slick, responsive interface that held up live on stage.",
    facts: [["ROLE", "Lead developer"], ["STACK", "React · Node · GCP"], ["TIMELINE", "48 hours"], ["OUTCOME", "Live demo, judged panel"]],
    img: IMG.desk, alt: "Hackathon workstation mid-build", label: "REAL-TIME API APP",
    testid: "project-card-one", linkTest: "project-one-link", cta: "Discuss a similar build",
  },
  {
    index: "02", tag: "HACKATHON BUILD · 36 HRS", title: <>Built for<br /><em>momentum.</em></>,
    desc: "A multi-page portal structured for Google Cloud from the first commit — lightweight assets and deliberate caching kept every transition instant, on every device in the room.",
    facts: [["ROLE", "Front-end & deploy"], ["STACK", "React · GCP · Firebase"], ["TIMELINE", "36 hours"], ["OUTCOME", "Portal shipped & presented"]],
    img: IMG.portal, alt: "Developer setup during cloud portal build", label: "MULTI-PAGE CLOUD PORTAL",
    testid: "project-card-two", linkTest: "project-two-link", cta: "Start your portal",
  },
];

const skills = ["React.js", "GSAP", "Framer Motion", "Tailwind CSS", "Node.js", "Express", "REST APIs", "GCP", "Firebase", "Cloud Storage", "Performance", "Git / GitHub"];
const marqueeWords = ["INTERACTION", "motion", "FUNCTION", "clarity", "PERFORMANCE", "delight", "CLOUD", "craft"];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project_type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 260, damping: 26 });
  const ringY = useSpring(cursorY, { stiffness: 260, damping: 26 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 16 });
  const smy = useSpring(my, { stiffness: 55, damping: 16 });
  const l1x = useTransform(smx, (v) => v * 34);
  const l1y = useTransform(smy, (v) => v * 26);
  const l2x = useTransform(smx, (v) => v * -24);
  const l2y = useTransform(smy, (v) => v * -18);
  const l3x = useTransform(smx, (v) => v * 14);
  const l3y = useTransform(smy, (v) => v * -30);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.removeEventListener("mousemove", move); };
  }, [cursorX, cursorY]);

  const goTo = (hash) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    lenisRef.current?.scrollTo(hash, { offset: -72 });
  };

  const heroMouse = (e) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const pitch = "Hi [Client Name], my name is Vikas Subramani. Together with my team at ShadowStack, we specialize in unique, fully functional and beautifully animated websites designed to help businesses stand out online. Let's connect for a quick 5-minute chat about what you need!";
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
    try {
      await axios.post(`${API}/inquiries`, form);
      setSubmitted(true);
      setForm({ name: "", email: "", project_type: "", message: "" });
      toast.success("Thanks — Vikas will be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please email Vikas directly.");
    }
  };

  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }} aria-hidden="true" />

      <header className="nav" data-testid="site-navigation">
        <a className="brand" href="#top" onClick={goTo("#top")} data-testid="brand-home">
          <LogoMark />
          <span className="brand-word">Shadow<em>Stack</em></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={goTo("#work")} data-testid="nav-work">Work</a>
          <a href="#services" onClick={goTo("#services")} data-testid="nav-services">Capabilities</a>
          <a href="#about" onClick={goTo("#about")} data-testid="nav-about">About</a>
          <a href="#contact" className="nav-cta" onClick={goTo("#contact")} data-testid="nav-contact">Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" data-testid="mobile-menu-button">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef} onMouseMove={heroMouse}>
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
              <span className="pulse-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="eyebrow-line" /> GOA, IN
            </motion.div>
            <h1>
              <HeroLine delay={0.2}>We build</HeroLine>
              <HeroLine delay={0.32}>websites</HeroLine>
              <HeroLine delay={0.44}><span className="serif-line">with a pulse.</span></HeroLine>
            </h1>
            <motion.p className="hero-lede" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease: EASE }}>
              I’m <strong>Vikas Subramani</strong> — lead developer at ShadowStack, a small studio crafting expressive, high-performance websites that make brands impossible to ignore.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease: EASE }}>
              <a href="mailto:vikasvikkim143@gmail.com" className="btn" data-testid="hero-email-button">Let’s build something <ArrowUpRight size={16} /></a>
              <a href="#work" className="btn btn-ghost" onClick={goTo("#work")} data-testid="hero-work-link">See selected work</a>
            </motion.div>
          </div>

          <motion.div className="hero-stack" style={{ opacity: heroFade }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.55, ease: EASE }} data-testid="hero-stack-visual">
            <motion.div className="stack-layer stack-back" style={{ x: l2x, y: l2y }} />
            <motion.div className="stack-layer stack-mid" style={{ x: l3x, y: l3y }}>
              <div className="terminal">
                <span className="t-row"><i />shadowstack --deploy</span>
                <span className="t-row ok">build compiled in 1.2s</span>
                <span className="t-row ok">animations locked at 60fps</span>
                <span className="t-row accent">→ shipping delight</span>
              </div>
            </motion.div>
            <motion.figure className="stack-layer stack-photo" style={{ x: l1x, y: l1y }}>
              <motion.img src={IMG.workspace} alt="ShadowStack studio workspace" style={{ y: photoY }} data-testid="hero-workspace-image" />
              <figcaption className="photo-badge">GOA<br /><small>INDIA · 2026</small></figcaption>
            </motion.figure>
          </motion.div>
        </section>

        <div className="marquee" aria-label="Studio principles marquee">
          <div className="marquee-track">
            {[0, 1].map((half) => (
              <div className="marquee-half" key={half} aria-hidden={half === 1}>
                {marqueeWords.map((word, i) => (
                  <span className="marquee-item" key={`${half}-${word}`}>
                    {i % 2 === 0 ? <span className="mq-word">{word}</span> : <em>{word}</em>}
                    <span className="mq-dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="services" className="section">
          <Reveal className="sec-head">
            <span className="sec-num">01 / CAPABILITIES</span>
            <h2>More than a<br /><em>pretty interface.</em></h2>
            <p>The sites we ship are engineered to feel as good as they look — every layer, from pixel to cloud, considered.</p>
          </Reveal>
          <div className="bento">
            {services.map(({ n, t, d, Icon, cls, orb }, i) => (
              <Reveal key={n} delay={i * 0.08} className={`bento-card ${cls}`} data-testid={`service-card-${n}`}>
                {orb && <div className="bento-orb" aria-hidden="true" />}
                <div className="bento-top"><span>{n}</span><Icon size={24} /></div>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="section work">
          <Reveal className="sec-head">
            <span className="sec-num">02 / CASE STUDIES</span>
            <h2>Selected<br /><em>experiments.</em></h2>
            <p>Two hackathon builds. Brutal timelines. Late nights, sharp outcomes.</p>
          </Reveal>
          {cases.map((c) => (
            <Reveal key={c.index} className="case" data-testid={c.testid}>
              <div className="case-meta"><span>{c.index} / {c.tag}</span><span>SHADOWSTACK STUDIO</span></div>
              <div className="case-body">
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="case-facts">
                    {c.facts.map(([k, v]) => <div key={k}><b>{k}</b><span>{v}</span></div>)}
                  </div>
                  <a href="#contact" className="case-link" onClick={goTo("#contact")} data-testid={c.linkTest}>{c.cta} <ArrowUpRight size={15} /></a>
                </div>
                <div className="case-shot">
                  <img src={c.img} alt={c.alt} loading="lazy" />
                  <span className="case-tag">{c.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <section id="about" className="section">
          <Reveal className="sec-head">
            <span className="sec-num">03 / ABOUT</span>
            <h2>Curious by<br /><em>default.</em></h2>
            <p>A student team with studio standards — and the shipping record to back it up.</p>
          </Reveal>
          <div className="about-grid">
            <Reveal>
              <p className="about-big">Second-year B.Tech at Parul University, Goa — leading a specialised web team turning ambitious ideas into <em>useful, unforgettable experiences.</em></p>
              <p className="about-sub">Two-time hackathon participant. Google Cloud trained. Always learning, always shipping.</p>
              <div className="timeline">
                <div><b>2028</b><span>B.Tech · Parul University<br />Expected graduation</span></div>
                <div><b>GCP</b><span>Cloud coursework<br />& skill badges</span></div>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="skills-panel">
              <div className="skills-label"><span>CORE TOOLKIT</span><span>↘</span></div>
              <div className="skill-tags">
                {skills.map((skill, index) => <span key={skill} data-testid={`skill-${index}`}>{skill}</span>)}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section pitch">
          <Reveal className="pitch-card">
            <div className="pitch-head">
              <span>THE PITCH / 01</span>
              <button onClick={copyPitch} data-testid="copy-pitch-button">{copied ? <Check size={15} /> : <Clipboard size={15} />} {copied ? "COPIED" : "COPY PITCH"}</button>
            </div>
            <blockquote>“Whether you need smooth interactive animations, cloud hosting setup, or complex backend features — <strong>we handle the entire project.</strong>”</blockquote>
            <div className="pitch-foot"><span>VIKAS SUBRAMANI · SHADOWSTACK</span><span>5-MINUTE CHAT?</span></div>
          </Reveal>
        </section>

        <section id="contact" className="section contact">
          <Reveal className="contact-intro">
            <span className="sec-num">04 / CONTACT</span>
            <h2>Have a good<br /><em>idea?</em></h2>
            <p>Tell me what you’re imagining. I’ll bring the team, the energy and a plan.</p>
            <div className="direct-links">
              <a href="mailto:vikasvikkim143@gmail.com" data-testid="contact-email-link"><Mail size={17} /> vikasvikkim143@gmail.com</a>
              <a href="tel:+916362368690" data-testid="contact-phone-link"><Phone size={17} /> +91 63623 68690</a>
              <a href="https://wa.me/916362368690" target="_blank" rel="noreferrer" data-testid="contact-whatsapp-link"><ExternalLink size={17} /> WhatsApp me</a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <form className="inquiry-form" onSubmit={submitInquiry} data-testid="inquiry-form">
              <div className="form-intro"><span>PROJECT INQUIRY</span><span>✳</span></div>
              <label>Your name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" data-testid="inquiry-name-input" required /></label>
              <label>Email address<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" data-testid="inquiry-email-input" required /></label>
              <label>What can we build?
                <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} data-testid="inquiry-type-select" required>
                  <option value="">Choose a project type</option>
                  <option>Brand website</option>
                  <option>Interactive web app</option>
                  <option>Cloud portal</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>Tell me a little more<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="The big idea is..." rows="3" data-testid="inquiry-message-input" required /></label>
              <button className="btn form-submit" type="submit" data-testid="inquiry-submit-button">{submitted ? "Message sent ✓" : "Send inquiry"} <ArrowUpRight size={16} /></button>
            </form>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-giant" aria-hidden="true">ShadowStack</div>
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top" onClick={goTo("#top")} data-testid="footer-brand"><LogoMark /><span className="brand-word">Shadow<em>Stack</em></span></a>
            <p>Websites with a pulse.<br />Designed & engineered in Goa, India.</p>
          </div>
          <div className="footer-right">
            <div className="socials">
              <a href="https://github.com/ShadowStack-byte" target="_blank" rel="noreferrer" aria-label="GitHub" data-testid="github-link"><Github size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="linkedin-link"><Linkedin size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="instagram-link"><Instagram size={18} /></a>
            </div>
            <p>© 2026 VIKAS SUBRAMANI · SHADOWSTACK</p>
          </div>
        </div>
      </footer>
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home />} /></Routes></BrowserRouter>;
}
export default App;
