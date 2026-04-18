import Background from "./Background";
import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import Lenis from 'lenis';
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ProjectItem, CertificatesGrid } from "./ProjectLayouts";
import React from "react";

/* ═══════════════════════════════════ DATA ═══ */
const D = {
  name: ["TULYA", "JAIN"],
  role: "Full Stack Developer",
  location: "Ahmedabad, India",
  bio: (
    <>
      I'm a <span className="hl">Computer Engineering</span> student with a deep passion for <span className="hl">web development</span> and creating intuitive user experiences. My journey in tech is driven by curiosity and a commitment to continuous learning. Specializing in the <span className="hl">MERN stack</span>, I focus on building <span className="hl">responsive, modern web applications</span> that combine clean design with smooth animations. I believe in writing code that's not just functional, but elegant and maintainable. Through hands-on projects and real-world clone applications, I've developed a strong foundation in <span className="hl">frontend development</span> and <span className="hl">UI/UX design</span>. I'm constantly exploring new technologies and love to learn and explore new <span className="hl">AI tools</span> to push the boundaries of what's possible on the web.
    </>
  ),
  email: "tulya.jain.cg@gmail.com",
  whatsapp: "https://wa.me/917016747635",
  avatar: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_800/v1774937661/new_profile_brown_shirt_wpp7zr.jpg",
  ejs: { svc: "service_mik4w7c", tpl: "template_qkn4ddh", key: "IUgMaI57UFvt-q1Vz" },
  socials: [
    { label: "GitHub", href: "https://github.com/jaintulya" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tulya-jain-b84827372/" },
    { label: "LeetCode", href: "https://leetcode.com/u/o08s0tJtFp/" },
    { label: "YouTube", href: "https://www.youtube.com/@TulyaJain" },
  ],
  skills: [
    {
      cat: "Frontend",
      items: [
        { name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
        { name: "CSS", icon: "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg" },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
        { name: "React", icon: "https://cdn.simpleicons.org/react" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
      ],
    },
    {
      cat: "Backend",
      items: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
        { name: "Express", icon: "https://cdn.simpleicons.org/express/f0ece3" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      ],
    },
    {
      cat: "Tools & Languages",
      items: [
        { name: "C", icon: "https://cdn.simpleicons.org/c/f0ece3" },
        { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus" },
        { name: "Git", icon: "https://cdn.simpleicons.org/git" },
        { name: "GitHub", icon: "https://cdn.simpleicons.org/github/f0ece3" },
        { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
        { name: "Postman", icon: "https://cdn.simpleicons.org/postman" },
        { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/f0ece3" },
        { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify" },
      ],
    },
  ],
  projects: [
    {
      n: "01", name: "BEVEL Clone", year: "2025",
      desc: "Luxury men's grooming brand. Cinematic full-screen hero sections, layered parallax depth, and an immersive product story built in pure HTML/CSS.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461010/bevel-cover_hqccgt.png",
      live: "https://bevel-tulya.netlify.app",
      repo: "https://github.com/jaintulya/Bevel-clone-",
      videoId: "oHWpCMTIyZ0",
      cat: "Clones"
    },
    {
      n: "02", name: "AARKE Clone", year: "2025",
      desc: "Premium kitchen appliance brand — bold editorial typography, scroll-reveal animations, and exacting fidelity to the original brand language.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461065/aarke-cover_ghgd98.png",
      live: "https://aarke-tulya.netlify.app",
      repo: "https://github.com/jaintulya/Aarke-clone-",
      videoId: "TflxOJ40Tuo",
      cat: "Clones"
    },
    {
      n: "03", name: "PRIME Clone", year: "2025",
      desc: "A faithful recreation of Amazon Prime Video's interface. Responsive card grids, dynamic content layout, and smooth navigation — built to pixel precision.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461010/prime-coverpic_uvsmt9.png",
      live: "https://prime-tulya.netlify.app",
      repo: "https://github.com/jaintulya/Prime-clone-",
      videoId: "voQSKVaUi1k",
      cat: "Clones"
    },
    {
      n: "04", name: "PUMA Clone", year: "2025",
      desc: "High-performance sports apparel landing page clone. Replicated complex layouts, CSS grid structures, and interactive styling to match the iconic Puma global branding.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1771660286/puma_gcg0om.png",
      live: "https://puma-tulya.netlify.app",
      repo: "https://github.com/jaintulya/puma-clone",
      videoId: "zuadjEcaA5k",
      cat: "Clones"
    },
    {
      n: "05", name: "COCA-COLA Clone", year: "2025",
      desc: "Vibrant and refreshing Coca-Cola landing page. Features fluid responsive design, thematic color palettes, and engaging scroll interactions to emulate a global beverage campaign.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1771660281/coco_fjmccr.png",
      live: "https://cococola-tulya.netlify.app",
      repo: "https://github.com/jaintulya/cola-clone",
      videoId: "AtzCF1w-nfI",
      cat: "Clones"
    },
    {
      n: "06", name: "MovieHub", year: "2025",
      desc: "Feature-rich movie explorer. Allows users to search, browse, and save favorites using the OMDB API. Features smart real-time search, type filters, and locally persistent favorites.",
      tech: ["React", "API"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1775888763/cda5653d-46da-4d07-9613-b4eb0ade0d53.png",
      live: "https://advmovie.netlify.app",
      repo: "https://github.com/jaintulya/movie-filter-byreact",
      videoId: "zcg205b-HYk",
      cat: "Frontend"
    },
  ],
  certs: [
    {
      name: "Solution Architecture", org: "Amazon Web Services", year: "2026",
      desc: "Distributed systems on AWS — compute, storage, networking, security, and cost optimisation for scalable architectures.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/aws_certificate_pages-to-jpg-0001_wsdave.jpg"
    },
    {
      name: "Software Engineering", org: "Wells Fargo", year: "2026",
      desc: "Agile workflows, code review, debugging, and building fintech features in a real engineering simulation.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/well_fargo_page-0001_tmy6tq.jpg"
    },
    {
      name: "Software Engineering", org: "Walmart Global Tech", year: "2026",
      desc: "Data structures, algorithms, system design, and scalable software at global retail scale.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/walmart_page-0001_oedx1f.jpg"
    },
    {
      name: "Generative AI Studio", org: "Google Cloud", year: "2025",
      desc: "Vertex AI, prompt engineering, foundation model tuning, multi-modal AI, and GCP pipeline deployment.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180240/introduction_to_generative_ai_studio_page-0001_xb6gpj.jpg"
    },
    {
      name: "Front-End Engineering", org: "Skyscanner", year: "2026",
      desc: "Accessible, internationalised React components using Skyscanner's Backpack design system.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/skyscanner_page-0001_xtalcr.jpg"
    },
    {
      name: "Excel Automation with AI", org: "Microsoft", year: "2025",
      desc: "Automating Excel workflows with ChatGPT — intelligent formulas and spreadsheet solutions without code.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/Excel_automation_using_chagpt_pages-to-jpg-0001_jc6nmq.jpg"
    },
    {
      name: "Claude Code in Action", org: "Anthropic", year: "2025",
      desc: "Completed Claude Code in Action focused on AI-assisted development workflows, prompt engineering, and practical coding productivity.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776508203/clode_code_in_action_antropic_page-0001_hsvu1j.jpg"
    },
  ],
  hackathons: [
    {
      name: "Neural Nexus", issuer: "IIT Jammu", year: "2025",
      desc: "Participated in Neural Nexus, a hackathon centered around innovation, collaborative problem solving, and prototype-driven challenges.",
      tags: ["Hackathon", "Innovation", "AI/ML", "Team Challenge"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776508222/neural_nexus_iit_jammu_page-0001_xgaqka.jpg"
    },
    {
      name: "ArtForge", issuer: "IISc Bangalore", year: "2025",
      desc: "Participated in ArtForge, an innovation-oriented challenge focused on creative thinking and solution building.",
      tags: ["Hackathon", "Innovation", "Design Challenge", "Problem Solving"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776508222/Artforge_iisc_bnaglore_page-0001_p0ukyc.jpg"
    },
    {
      name: "Dev Heat", issuer: "IIIT Surat", year: "2025",
      desc: "Participated in Dev Heat, a development-focused coding challenge involving technical problem solving and software ideation.",
      tags: ["Hackathon", "Development", "Coding Challenge", "Problem Solving"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776508221/Dev_Heat_IIIT_surat_page-0001_cfnycb.jpg"
    },
    {
      name: "MetaCode", issuer: "IIT Kharagpur", year: "2025",
      desc: "Participated in MetaCode, a competitive technical challenge focused on problem solving and software innovation.",
      tags: ["Hackathon", "Tech Challenge", "Problem Solving", "Competitive Coding"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776508220/iiit_kharakpur_metacode_page-0001_nkngox.jpg"
    },
  ],
};

/* ═══════════════════════════════════ GLOBAL CSS ═══ */
const G = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;background:#0d0c0a;}
body{background:#0d0c0a;color:#f0ece3;overflow-x:hidden;}
:root{
  --bg:#0d0c0a; --bg2:#161410; --bg3:#1e1b16;
  --ink:#f0ece3; --ink2:#a09880; --ink3:#5a5548;
  --gold:#c9a84c; --gold2:#8a6e2e;
  --rule:rgba(240,236,227,0.08);
  --serif:'Cormorant Garamond',Georgia,serif;
  --mono:'DM Mono','Courier New',monospace;
  --sans:'Syne',sans-serif;
  --card-r:16px;
  --gold-glow: rgba(201, 168, 76, 0.4);
}
*{cursor:none!important;}
a, button {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}
a:hover, button:hover {
  opacity: 0.9;
  transform: translateY(-2px) scale(1.02);
}
::selection{background:rgba(201,168,76,0.22);color:var(--ink);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--ink3);border-radius:2px;}
input,textarea{
  background:transparent;border:none;border-bottom:1px solid var(--rule);
  color:var(--ink);font-family:var(--mono);font-size:0.85rem;
  letter-spacing:0.04em;padding:10px 0;width:100%;outline:none;
  transition:border-color 0.3s;
}
input::placeholder,textarea::placeholder{color:var(--ink3);}
input:focus,textarea:focus{border-bottom-color:var(--gold);}
textarea{resize:none;}
input:-webkit-autofill,textarea:-webkit-autofill{
  -webkit-box-shadow:0 0 0 1000px #0d0c0a inset!important;
  -webkit-text-fill-color:#f0ece3!important;
}
/* grain */
.pg::before{
  content:'';position:fixed;inset:-50%;width:200%;height:200%;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:0.032;pointer-events:none;z-index:1;animation:grn 6s steps(8) infinite;
}
@keyframes grn{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,-2%)}50%{transform:translate(2%,1%)}75%{transform:translate(-1%,2%)}};
h1, h2, h3, h4, h5, h6 { font-weight: 300; }
.card-wrap{will-change:transform, opacity;}
.skill-icon-bg{width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.skill-icon-img{filter:brightness(1) contrast(1.1);}
.status-pill{background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.3);border-radius:6px;}
.hl{color:var(--gold);font-weight:500;font-style:normal;}
.marquee-strip{overflow:hidden;white-space:nowrap;padding:1.4rem 0;background:var(--bg);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);display:flex;align-items:center;}
.marquee-inner{display:flex;gap:4rem;animation:scroll 40s linear infinite;}
.about-watermark{position:absolute;right:-5%;top:20%;font-family:var(--serif);font-size:25vw;font-weight:300;color:rgba(240,236,227,0.03);pointer-events:none;z-index:0;user-select:none;line-height:1;}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
`;


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  CURSOR ═ ═ ═  */
function Cursor() {
  const [p, setP] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  const [mode, setMode] = useState("normal");

  useEffect(() => {
    const mv = e => setP({ x: e.clientX, y: e.clientY });
    const over = e => {
      setHov(!!e.target.closest("a,button,input,textarea,[data-cur]"));
      setMode(e.target.closest("[data-cursor-mode='design']") ? "design" : "normal");
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", over); };
  }, []);

  const size = hov ? (mode === "design" ? 44 : 32) : (mode === "design" ? 28 : 18);
  const col = mode === "design" ? "#f0ece3" : "#c9b84c";

  return (
    <div style={{
      position: "fixed", left: p.x, top: p.y,
      transform: "translate(-50%,-50%)",
      zIndex: 99999, pointerEvents: "none",
      transition: "width 0.3s, height 0.3s, opacity 0.2s",
      width: size, height: size,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {mode === "design" ? (
        <>
          <div style={{ position: "absolute", width: "100%", height: 1.5, background: col, opacity: 0.85 }} />
          <div style={{ position: "absolute", height: "100%", width: 1.5, background: col, opacity: 0.85 }} />
          {hov && <div style={{ position: "absolute", width: "70%", height: "70%", border: `1px dashed ${col}`, borderRadius: "50%", opacity: 0.4 }} />}
        </>
      ) : (
        <>
          {/* Precision Reticle */}
          <div style={{ position: "absolute", borderRadius: "50%", border: `1px solid ${col}`, opacity: 0.35, width: "100%", height: "100%" }} />
          <div style={{ position: "absolute", width: "120%", height: 1, background: col, opacity: 0.25 }} />
          <div style={{ position: "absolute", height: "120%", width: 1, background: col, opacity: 0.25 }} />
          <div style={{ width: 2, height: 2, background: col, borderRadius: "50%" }} />
        </>
      )}
    </div>
  );
}

const NAVS = ["Home", "About", "Work", "Skills", "Hackathons", "Credentials", "Contact"];
const useMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
};
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItemStyle = (isActive) => ({
    fontFamily: "var(--sans)",
    fontSize: "0.68rem",
    fontWeight: isActive ? 600 : 400,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: isActive ? "rgba(240,236,227,0.06)" : "transparent",
    color: isActive ? "var(--ink)" : "var(--ink3)",
    padding: "6px 14px",
    borderRadius: 6,
    transition: "all 0.25s",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <>
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.5rem", height: 58,
          background: scrolled || menuOpen ? "rgba(13,12,10,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(18px)" : "none",
          borderBottom: `1px solid ${scrolled || menuOpen ? "var(--rule)" : "transparent"}`,
          transition: "all 0.4s",
        }}>
        <Link to="/" data-cur
          style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.22em", color: "var(--gold)", background: "none", border: "none", textDecoration: "none" }}>
          TJ.
        </Link>

        {!isMobile ? (
          <>
            <div style={{ display: "flex", gap: 4 }}>
              {NAVS.map(n => {
                const path = n === "Home" ? "/" : `/${n.toLowerCase()}`;
                return (
                  <NavLink key={n} to={path} end={n === "Home"} data-cur
                    style={({ isActive }) => navItemStyle(isActive)}>
                    {n}
                  </NavLink>
                );
              })}
            </div>
            <a href="https://drive.google.com/file/d/1m71b0KgRAl64M0ePunAcATVhIvV0sF9k/view?usp=sharing" target="_blank" rel="noreferrer" data-cur
              style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gold)", textDecoration: "none", border: "1px solid var(--gold2)", padding: "6px 16px", borderRadius: 4, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
              Resume
            </a>
          </>
        ) : (
          <button data-cur onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} style={{ width: 22, height: 1, background: "var(--ink)" }} />
            <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} style={{ width: 22, height: 1, background: "var(--ink)" }} />
            <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} style={{ width: 22, height: 1, background: "var(--ink)" }} />
          </button>
        )}
      </motion.nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 999, background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem 2rem", overflowY: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {NAVS.map((n, i) => {
                const path = n === "Home" ? "/" : `/${n.toLowerCase()}`;
                return (
                  <NavLink key={n} to={path} end={n === "Home"} onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      fontFamily: "var(--serif)", fontSize: "clamp(2rem, 12vw, 4rem)", fontWeight: 300,
                      color: isActive ? "var(--gold)" : "var(--ink)", textAlign: "left", background: "none", border: "none", textDecoration: "none"
                    })}>
                    {n}
                  </NavLink>
                );
              })}
            </div>
            <div style={{ marginTop: "auto", paddingTop: "3rem", borderTop: "1px solid var(--rule)" }}>
              <a href="https://drive.google.com/file/d/1m71b0KgRAl64M0ePunAcATVhIvV0sF9k/view?usp=sharing" target="_blank" rel="noreferrer"
                style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", letterSpacing: "0.15em", color: "var(--gold)", textDecoration: "none", border: "1px solid var(--gold)", padding: "12px 24px", borderRadius: 4, display: "inline-block" }}>
                VIEW RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════ BREATHING RINGS BG ═══ */
function BreathingRings() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -2000, y: -2000 });
  const isMobile = useMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, center = { x: 0, y: 0 };
    let rings = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      center = { x: w / 2, y: h / 2 };
      init();
    };

    const init = () => {
      rings = [];
      const count = isMobile ? 12 : 22;
      for (let i = 0; i < count; i++) {
        rings.push({
          r: 60 + i * (isMobile ? 28 : 42),
          s: (Math.random() - 0.5) * 0.005,
          off: Math.random() * Math.PI * 2,
          segs: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
            start: Math.random() * Math.PI * 2,
            len: 0.8 + Math.random() * 2.2
          }))
        });
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const mD = Math.sqrt(Math.pow(mouse.current.x - center.x, 2) + Math.pow(mouse.current.y - center.y, 2));
      const mRatio = Math.max(0, 1 - mD / (w * 0.5));
      const breath = Math.sin(t * 0.0008) * 12;

      rings.forEach((ring, ri) => {
        const currentR = ring.r + breath + (mRatio * 35 * (ri / rings.length));
        const rot = t * ring.s + ring.off;

        // Warped Arc Geometry
        ctx.strokeStyle = `rgba(201, 168, 76, ${0.06 + mRatio * 0.28})`; // Primary Gold
        ctx.lineWidth = 0.7 + mRatio * 0.6;
        ctx.setLineDash([3, 12]);

        ring.segs.forEach(s => {
          ctx.beginPath();
          ctx.arc(center.x, center.y, currentR, s.start + rot, s.start + s.len + rot);
          ctx.stroke();
        });

        // Subtle Faint Ring Base
        ctx.setLineDash([]);
        ctx.strokeStyle = `rgba(240, 236, 227, ${0.012 + mRatio * 0.035})`; // Soft Ink White
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(center.x, center.y, currentR, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    let rid;
    const loop = (t) => { draw(t); rid = requestAnimationFrame(loop); };
    const mm = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mm);
    resize(); loop(0);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mm);
      cancelAnimationFrame(rid);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none", opacity: 1 }} />;
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  PROJECT IMAGE ═ ═ ═  */
function ProjectImage({ src, alt, live }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={live} target="_blank" rel="noreferrer" data-cur
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "block", position: "relative", border: "1px solid var(--rule)", background: "var(--bg3)", overflow: "hidden", cursor: "none", aspectRatio: "1.4" }}>
      <img src={src} alt={alt} loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          filter: hov ? "blur(10px) brightness(0.4) sepia(10%)" : "sepia(8%) contrast(1.06) brightness(0.87)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          transform: hov ? "scale(1.05)" : "scale(1)"
        }}
      />
      <AnimatePresence>
        {hov && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, pointerEvents: "none" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.25em", color: "var(--ink)", padding: "10px 20px", border: "1px solid rgba(240,236,227,0.24)", background: "rgba(13,12,10,0.45)", backdropFilter: "blur(4px)", borderRadius: 4, textTransform: "uppercase" }}>
              Click to Open ↗
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  STACKING CARD WRAPPER ═ ═ ═  */
function Card({ id, label, children, index, bgOverride }) {
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 10 + index }}>
      <section
        id={id} data-label={label}
        style={{
          position: "relative",
          minHeight: "100vh",
          background: bgOverride || "var(--bg2)",
          borderRadius: "var(--card-r) var(--card-r) 0 0",
          border: "1px solid var(--rule)",
          borderBottom: "none",
          overflow: "hidden",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
        }}>
        {children}
      </section>
    </div>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  SECTION LABEL ═ ═ ═  */
const SLabel = ({ n, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "3.5rem" }}>
    <span style={{ fontFamily: "var(--mono)", fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.22em", fontWeight: 400 }}>{n}</span>
    <div style={{ height: 1.5, width: 48, background: "var(--gold)" }} />
    <span style={{ fontFamily: "var(--mono)", fontSize: "0.95rem", letterSpacing: "0.45em", color: "var(--gold)", textTransform: "uppercase", fontWeight: 500 }}>{text}</span>
  </div>
);

const ghTheme = {
  light: ['rgba(240,236,227,0.05)', 'rgba(201,168,76,0.2)', 'rgba(201,168,76,0.4)', 'rgba(201,168,76,0.7)', '#c9a84c'],
  dark: ['rgba(240,236,227,0.05)', 'rgba(201,168,76,0.2)', 'rgba(201,168,76,0.4)', 'rgba(201,168,76,0.7)', '#c9a84c'],
};

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  DATA ═ ═ ═  */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 120); }, []);

  return (
    <section id="home" data-label="Home"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", background: "transparent", padding: "80px 2rem 4rem" }}>
      <Background />
      {/* Corner coords */}
      <div style={{ position: "absolute", top: 72, left: 28, fontFamily: "var(--mono)", fontSize: "0.58rem", color: "var(--ink3)", letterSpacing: "0.15em" }}>
        23.0225° N, 72.5714° E
      </div>
      <div style={{ position: "absolute", top: 72, right: 28, fontFamily: "var(--mono)", fontSize: "0.58rem", color: "var(--ink3)", letterSpacing: "0.15em" }}>
        TJ. {new Date().getFullYear()}
      </div>

      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <div style={{ overflow: "hidden" }}>
          <motion.p initial={{ opacity: 0 }} animate={vis ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0 }}
            style={{ fontFamily: "var(--mono)", fontSize: "clamp(0.65rem,1.2vw,0.85rem)", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Hii, I am
          </motion.p>
          <motion.h1 initial={{ y: 140 }} animate={vis ? { y: 0 } : { y: 140 }}
            transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--serif)", fontSize: "clamp(4.5rem,15vw,14rem)", fontWeight: 300, lineHeight: 0.82, letterSpacing: "-0.04em", color: "var(--ink)", textTransform: "uppercase" }}>
            TULYA
          </motion.h1>
        </div>

        {/* Thin rule */}
        <motion.div initial={{ scaleX: 0 }} animate={vis ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{ height: 1, background: "var(--rule)", margin: "0.6rem auto", maxWidth: 700, transformOrigin: "left" }} />

        {/* JAIN italic */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: 140 }} animate={vis ? { y: 0 } : { y: 140 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--serif)", fontSize: "clamp(4.5rem,15vw,14rem)", fontWeight: 300, lineHeight: 0.82, letterSpacing: "-0.04em", color: "var(--gold)", fontStyle: "italic", textTransform: "uppercase" }}>
            JAIN
          </motion.h1>
        </div>

        {/* Role + scroll cue */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ height: 1, width: 28, background: "var(--gold)" }} />
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", letterSpacing: "0.28em", color: "var(--gold)", textTransform: "uppercase" }}>
              {D.role}
            </span>
            <div style={{ height: 1, width: 28, background: "var(--gold)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: "1rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.28em", color: "var(--ink3)", textTransform: "uppercase" }}>Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  ABOUT ═ ═ ═  */
function About() {
  return (
    <Card id="about" label="About" index={0}>
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="about-watermark">ABOUT</div>
        <SLabel n="01" text="About" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px, 1fr))", gap: "3rem 5rem", alignItems: "start", maxWidth: 1300, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Photo */}
          <div style={{ position: "relative", justifySelf: "center" }}>
            <div style={{ position: "relative", maxWidth: 420 }}>
              {/* Corner marks */}
              {[["0,0", "tl"], ["0,buto", "bl"], ["auto,0", "tr"], ["auto,auto", "br"]].map(([pos, k], i) => {
                const [t, l, at, r] = pos === "0,0" ? ["0", "0", undefined, undefined] : pos === "0,buto" ? ["auto", "0", "0", undefined] : pos === "auto,0" ? ["0", undefined, undefined, "0"] : ["auto", undefined, "0", "0"];
                return <div key={k} style={{ position: "absolute", width: 20, height: 20, top: t, left: l, bottom: at, right: r, borderTop: (i === 0 || i === 2) ? "1px solid var(--gold2)" : "none", borderBottom: (i === 1 || i === 3) ? "1px solid var(--gold2)" : "none", borderLeft: (i === 0 || i === 1) ? "1px solid var(--gold2)" : "none", borderRight: (i === 2 || i === 3) ? "1px solid var(--gold2)" : "none", zIndex: 2 }} />;
              })}
              <img src={D.avatar} alt="Tulya Jain" fetchPriority="high" style={{ width: "100%", display: "block", filter: "sepia(10%) contrast(1.05) brightness(0.88)", border: "1px solid var(--rule)" }} />
            </div>
            {/* Action Cluster (Chip + Buttons) */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 6, background: "rgba(34,197,94,0.06)", height: 42, boxSizing: "border-box" }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "#22c55e", textTransform: "uppercase" }}>Available for work</span>
              </div>

              <Link to="/work" data-cur
                style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--ink)", background: "none", border: "1px solid var(--rule)", padding: "0 22px", borderRadius: 6, textTransform: "uppercase", height: 42, display: "flex", alignItems: "center", transition: "all 0.3s", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--rule)"; }}>
                View Work
              </Link>

              <a href="https://drive.google.com/file/d/1m71b0KgRAl64M0ePunAcATVhIvV0sF9k/view?usp=sharing" target="_blank" rel="noreferrer" data-cur
                style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", background: "none", border: "1px solid var(--gold2)", padding: "0 22px", borderRadius: 6, textTransform: "uppercase", textDecoration: "none", height: 42, display: "flex", alignItems: "center", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--bg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--gold)"; }}>
                Resume
              </a>
            </div>

            {/* Socials Layer (Secondary Actions) */}
            <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1.2rem", paddingLeft: 4 }}>
              {D.socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cur
                  style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--ink3)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: 2, transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--ink3)"; e.currentTarget.style.borderColor = "var(--rule)"; }}>
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div style={{ paddingTop: "0.5rem" }}>
            <div style={{ maxWidth: 800 }}>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(3.5rem,8.5vw,6.2rem)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--gold)", marginBottom: "2.2rem" }}>
                I design &amp; build<br /><em style={{ color: "var(--ink)" }}>web experiences.</em>
              </h2>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", lineHeight: 1.85, color: "var(--ink2)", fontWeight: 300, fontStyle: "italic", marginBottom: "3rem" }}>
                {D.bio}
              </p>

              {/* Meta grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {[
                  { k: "Location", v: D.location },
                  { k: "Specialty", v: "MERN Stack" },
                  { k: "Degree", v: "Computer Eng." },
                  { k: "Status", v: "Open to roles" },
                ].map(({ k, v }, i) => (
                  <div key={k} style={{ padding: "16px 0", borderTop: "1px solid var(--rule)", borderRight: i % 2 === 0 ? "1px solid var(--rule)" : "none", paddingRight: i % 2 === 0 ? 24 : 0, paddingLeft: i % 2 === 1 ? 24 : 0 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--ink3)", textTransform: "uppercase", marginBottom: 6 }}>{k}</p>
                    <p style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--ink2)" }}>{v}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  SKILL STRIP ═ ═ ═  */
function SkillStrip() {
  const allSkills = D.skills.flatMap(c => c.items.map(s => s.name));
  const double = [...allSkills, ...allSkills, ...allSkills];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {double.map((s, i) => (
          <span key={i} style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase", fontWeight: 400 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  VIDEO MODAL ═ ═ ═  */
function VideoModal({ videoId, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(13,12,10,0.94)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", cursor: "none" }}>
        <motion.div initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          style={{ width: "100%", maxWidth: 860, background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 14px", borderBottom: "1px solid var(--rule)" }}>
            <button data-cur onClick={onClose}
              style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.14em", color: "var(--ink3)", background: "none", border: "1px solid var(--rule)", padding: "4px 12px", borderRadius: 3, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--ink3)"}>
              Close ×
            </button>
          </div>
          <div style={{ position: "relative", paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  WORK ═ ═ ═  */
function Work() {
  const [activeCat, setActiveCat] = useState("All");
  const [video, setVideo] = useState(null);
  const isMobile = useMobile();

  const cats = ["All", "Clones", "Frontend", "Full Stack", "Games"];

  const filtered = useMemo(() => {
    if (activeCat === "All") return D.projects;
    return D.projects.filter(p => p.cat === activeCat);
  }, [activeCat]);

  return (
    <Card id="work" label="Work" index={1} bgOverride="var(--bg)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) 0", minHeight: "100vh" }}>
        <div style={{ padding: "0 clamp(1.5rem,6vw,5rem)" }}>
          <SLabel n="02" text="Selected Work" />

          {/* CATEGORY FILTER - Centered Pill Design */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "6rem",
            width: "100%",
          }}>
            <div style={{
              display: "flex",
              flexWrbp: "wrap",
              background: "rgba(240,236,227,0.02)",
              border: "1px solid rgba(240,236,227,0.08)",
              borderRadius: 50,
              padding: "6px",
              gap: "8px",
              justifyContent: "center",
              boxShbdow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
              {cats.map(c => {
                const isActive = activeCat === c;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    data-cur
                    style={{
                      background: isActive ? "var(--gold)" : "transparent",
                      border: "none",
                      fontFamily: "var(--mono)",
                      fontSize: "0.7rem",
                      letterSpbcing: "0.2em",
                      color: isActive ? "var(--bg)" : "var(--ink2)",
                      padding: "14px 28px",
                      borderRadius: 40,
                      textTrbnsform: "uppercase",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      fontWeight: isActive ? 700 : 400,
                      boxShbdow: isActive ? "0 4px 15px rgba(201,168,76,0.3)" : "none"
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PROJECTS LIST */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((proj, i) => (
                <ProjectItem
                  key={proj.name}
                  project={{ ...proj, n: String(i + 1).padStart(2, "0") }}
                  index={i}
                  isMobile={isMobile}
                  onPlayVideo={setVideo}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: "10rem 2rem",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <motion.h3
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "2.5rem",
                    color: "var(--gold)",
                    fontStyle: "italic"
                  }}
                >
                  Coming Soon .
                </motion.h3>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--ink3)", marginTop: "1rem" }}>
                  Currently crafting something special for this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {video && <VideoModal videoId={video} onClose={() => setVideo(null)} />}

      {/* Embedded UI/UX Lbb Showcase */}
      <UIUXLab />
    </Card>
  );
}

/* ═══════════════════════════════════ UI/UX LAB ═══ */
const FIGMA_DESIGNS = [
  { id: 'hd', name: "Hospital Dashboard", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776498364/zydushospitalprototype_k0uu1l.jpg", link: "https://www.figma.com/proto/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=325%3A3&starting-point-node-id=325%3A3", tags: ["UI/UX Design", "Dashboard"], desc: "Healthcare management interface prototype" },
  { id: 'hb', name: "Hotel Booking", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776498280/hotelbookiungappprototype_xhwqtk.jpg", link: "https://www.figma.com/proto/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=265%3A2&starting-point-node-id=265%3A2", tags: ["UI/UX Design", "Mobile Product"], desc: "Hotel booking mobile interface" },
  { id: 'ew', name: "Education Web", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776498280/eduspereprototype_haemu2.jpg", link: "https://www.figma.com/proto/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=184%3A2&starting-point-node-id=184%3A2", tags: ["UI/UX Design", "Web Interface"], desc: "Education platform interface" },
  { id: 'bm', name: "BookMyShow", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776497961/bookmyshow_gvul5e.jpg", link: "https://www.figma.com/design/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=60-2", tags: ["UI/UX Design", "App"], desc: "Entertainment booking interface" },
  { id: 'lp', name: "Login Page", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776507340/loginpage_ehf7z8.jpg", link: "https://www.figma.com/design/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=27-177", tags: ["UI/UX Design", "Login", "Auth Flow"], desc: "Authentication interface concept" },
  { id: 'hbd', name: "Hotel Booking App Dashboard", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776497770/bnbhomepage_ymgypk.png", link: "https://www.figma.com/design/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=21-39", tags: ["UI/UX Design", "App Dashboard"], desc: "Booking dashboard interface" },
  { id: 'su', name: "Sign Up Page", img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1776497769/loginpge_app_yollv2.png", link: "https://www.figma.com/design/adYtyU8zPOoO1hOih9ppAs/Untitled?node-id=113-2", tags: ["UI/UX Design", "Sign Up", "Auth Flow"], desc: "User onboarding interface" }
];

function UIUXLab() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeDesign, setActiveDesign] = useState(null);
  const isMobile = useMobile();

  return (
    <>
      <style>{`
        .uiux-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .uiux-scroll-container::-webkit-scrollbar-track {
          background: rgba(13,12,10,0.8);
          border-radius: 4px;
        }
        .uiux-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(201,168,76,0.3);
          border-radius: 4px;
        }
        .uiux-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(201,168,76,0.5);
        }
      `}</style>
      <div
        style={{
          position: "relative",
        marginTop: "6rem",
        padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,5rem)",
        background: "radial-gradient(ellipse at center, rgba(30,28,24,0.6) 0%, rgba(13,12,10,1) 80%)",
        borderTop: "1px solid rgba(240,236,227,0.02)",
        overflow: "hidden"
      }}
    >
      {/* Intense design background pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>

        {/* Thin gold divider line before heading */}
        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0) 0%, rgba(201,168,76,0.2) 50%, rgba(201,168,76,0) 100%)", marginBottom: "3rem" }}></div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 300, color: "var(--gold)", marginBottom: "0.8rem", lineHeight: 1, textAlign: "center", fontStyle: "italic" }}>
            Figma <span style={{ color: "var(--ink)", fontStyle: "normal" }}>Exploration</span>
          </h3>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.4em", color: "var(--ink3)", textTransform: "uppercase", marginBottom: "4rem", textAlign: "center" }}>
            Design Prototypes & Concepts
          </p>
        </motion.div>

        {/* 2-column Grid setup (Fixed Size) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "2rem",
          alignItems: "start"
        }}>
          {FIGMA_DESIGNS.map((item, idx) => {
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cur
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  opacity: { duration: 0.6, delay: Math.min(idx * 0.1, 0.6) }
                }}
                style={{
                  height: "400px",
                  background: "rgba(13,12,10,0.6)",
                  border: isHovered ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(240,236,227,0.06)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: isHovered ? "0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.08)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: isHovered ? 10 : 1,
                  transition: "border-color 0.4s, box-shadow 0.4s"
                }}
              >
                {/* Scrollable Image Section */}
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    overflowY: "hidden",
                    overflowX: "hidden",
                    position: "relative"
                  }}
                  className="uiux-scroll-container"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      filter: isHovered ? "none" : "brightness(0.7) sepia(10%)",
                      transform: isHovered ? "scale(1.03)" : "scale(1)",
                      transition: "filter 0.5s, transform 0.8s ease-out"
                    }}
                  />

                  {/* Default Tag Overlay (Visible only when NOT expanded) */}
                  <AnimatePresence>
                    {!isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: "8px", flexWrap: "wrap", paddingRight: 16, zIndex: 2 }}
                      >
                         {item.tags.slice(0, 2).map((t, i) => (
                            <span key={i} style={{ fontFamily: "var(--mono)", fontSize: "0.5rem", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)", padding: "4px 8px", borderRadius: 4, background: "rgba(13,12,10,0.75)", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>
                              {t}
                            </span>
                         ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Default Title Header */}
                  <AnimatePresence>
                    {!isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(13,12,10,0.95) 0%, transparent 100%)", padding: "40px 20px 20px", pointerEvents: "none", zIndex: 2 }}
                      >
                         <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--ink)", margin: 0, fontWeight: 300, lineHeight: 1.1 }}>{item.name}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover Button Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="full-atn"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute", inset: 0,
                        background: "rgba(13,12,10,0.5)", backdropFilter: "blur(4px)",
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10
                      }}
                    >
                       <button onClick={() => setActiveDesign(item)} data-cur
                          style={{
                            fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--bg)", background: "var(--gold)", padding: "14px 28px", border: "none", borderRadius: 40, textTransform: "uppercase", transition: "all 0.3s"
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(201,168,76,0.3)"; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                       >
                          Full Design
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Design Modal */}
      <AnimatePresence>
        {activeDesign && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999, background: "rgba(13,12,10,0.95)", backdropFilter: "blur(18px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
            }}
            onClick={() => setActiveDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: 1000, height: "85vh", background: "var(--bg)", border: "1px solid var(--rule)", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: isMobile ? "column" : "row"
              }}
            >
              {/* Left: Scrollable Image */}
              <div className="uiux-scroll-container" style={{ flex: "1 1 60%", height: "100%", overflowY: "auto", borderRight: isMobile ? "none" : "1px solid var(--rule)", borderBottom: isMobile ? "1px solid var(--rule)" : "none", background: "var(--bg2)" }}>
                <img src={activeDesign.img} alt={activeDesign.name} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>

              {/* Right: Info */}
              <div style={{ flex: "1 1 40%", padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                  <button data-cur onClick={() => setActiveDesign(null)}
                    style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.14em", color: "var(--ink)", background: "rgba(240,236,227,0.06)", border: "1px solid var(--rule)", padding: "8px 16px", borderRadius: 4, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(240,236,227,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(240,236,227,0.06)"}>
                    Close ×
                  </button>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "1.5rem" }}>
                  {activeDesign.tags.map(t => (
                    <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)", padding: "6px 14px", borderRadius: 30, textTransform: "uppercase" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <h2 style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1, marginBottom: "1rem" }}>{activeDesign.name}</h2>
                <p style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", color: "var(--ink2)", lineHeight: 1.6, marginBottom: "2rem" }}>{activeDesign.desc}</p>

                <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
                  <a href={activeDesign.link} target="_blank" rel="noreferrer" data-cur
                     style={{ display: "inline-flex", width: "100%", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--bg)", background: "var(--gold)", padding: "16px 24px", border: "none", borderRadius: 4, textTransform: "uppercase", transition: "all 0.3s", textDecoration: "none" }}
                     onMouseEnter={e => e.currentTarget.style.background = "#e0b84e"}
                     onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
                  >
                    {activeDesign.tags.includes("Prototype") ? "View Prototype →" : "View Figma →"}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  SKILLS ═ ═ ═  */
function SkillCard({ skill, isRowHovered }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-cur
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.9rem",
        padding: "1.6rem 2rem",
        border: `1px solid ${hovered ? "var(--gold)" : "rgba(240,236,227,0.08)"}`,
        borderRadius: 12,
        background: hovered
          ? "rgba(201,168,76,0.06)"
          : "rgba(240,236,227,0.02)",
        boxShadow: hovered
          ? "0 0 20px rgba(201,168,76,0.15), inset 0 0 20px rgba(201,168,76,0.04)"
          : "none",
        transform: hovered ? "scale(1.06)" : (isRowHovered && !hovered ? "scale(0.97)" : "scale(1)"),
        opacity: isRowHovered && !hovered ? 0.5 : 1,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        minWidth: "clamp(100px, 12vw, 140px)",
        flexShrink: 0,
        cursor: "none",
        userSelect: "none",
      }}
    >
      <div style={{
        width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(13,12,10,0.5)",
        borderRadius: 10,
        padding: 8,
        border: `1px solid ${hovered ? "rgba(201,168,76,0.3)" : "rgba(240,236,227,0.06)"}`,
        transition: "border-color 0.4s"
      }}>
        <img
          src={skill.icon}
          alt={skill.name}
          style={{
            width: 26, height: 26, objectFit: "contain",
            filter: hovered ? "none" : "brightness(0.8)",
            transition: "filter 0.4s"
          }}
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--serif)",
          fontSize: "0.95rem",
          fontWeight: 300,
          color: hovered ? "var(--gold)" : "var(--ink)",
          transition: "color 0.4s",
          margin: 0,
          lineHeight: 1.2,
          whiteSpace: "nowrap"
        }}>{skill.name}</p>
        <p style={{
          fontFamily: "var(--mono)",
          fontSize: "0.48rem",
          letterSpacing: "0.22em",
          color: "var(--ink3)",
          textTransform: "uppercase",
          marginTop: 4,
          margin: "4px 0 0 0"
        }}>Technology</p>
      </div>
    </div>
  );
}

function SkillMarquee({ items, direction = "left", speed = 35 }) {
  const [paused, setPaused] = useState(false);
  const [isRowHovered, setIsRowHovered] = useState(false);

  // Ensure enough copies to prevent gaps at any viewport width
  // Each card ~220px wide, we need each "half" to be >= 2400px
  const repsNeeded = Math.ceil(2400 / (items.length * 220)) * 2;
  const reps = Math.max(repsNeeded, 6); // at least 6x
  const repeated = Array.from({ length: reps }, () => items).flat();

  return (
    <div
      onMouseEnter={() => { setPaused(true); setIsRowHovered(true); }}
      onMouseLeave={() => { setPaused(false); setIsRowHovered(false); }}
      style={{
        overflow: "hidden", width: "100%", position: "relative",
        // Vertical padding so scaled cards (1.06x) aren't clipped
        paddingTop: 20, paddingBottom: 20
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to right, var(--bg2), transparent)",
        zIndex: 2, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(to left, var(--bg2), transparent)",
        zIndex: 2, pointerEvents: "none"
      }} />

      <div style={{
        display: "flex",
        gap: "1.2rem",
        width: "max-content",
        animation: `marquee-${direction} ${speed}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}>
        {repeated.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} isRowHovered={isRowHovered} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

function Skills() {
  const directions = ["left", "right", "left"];

  return (
    <Card id="skills" label="Skills" index={2} bgOverride="var(--bg2)">
      <div style={{
        padding: "clamp(4rem,10vw,8rem) 0",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(4rem, 8vw, 7rem)"
      }}>
        <div style={{ padding: "0 clamp(1.5rem,6vw,5rem)" }}>
          <SLabel n="03" text="Skills" />
        </div>

        {D.skills.map((cat, ci) => (
          <div key={cat.cat}>
            {/* Category heading */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "0 clamp(1.5rem,6vw,5rem)",
                marginBottom: "2.5rem",
                display: "flex",
                alignItems: "baseline",
                gap: "1.2rem"
              }}
            >
              <span style={{
                fontFamily: "var(--mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                textTransform: "uppercase"
              }}>{String(ci + 1).padStart(2, "0")} —</span>
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--ink)",
                lineHeight: 1,
                margin: 0
              }}>{cat.cat}</h3>
            </motion.div>

            {/* Marquee row */}
            <SkillMarquee
              items={cat.items}
              direction={directions[ci]}
              speed={ci === 1 ? 30 : 38}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  HACKATHON CHALLENGE BOARD ═ ═ ═  */
function Hackathons() {
  const isMobile = useMobile();
  return (
    <Card id="hackathons" label="Hackathons" index={3} bgOverride="var(--bg)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "4rem" }}>
          <SLabel n="04" text="Hackathon Challenge Board" />
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", letterSpacing: "0.4em", color: "var(--ink3)", textTransform: "uppercase", marginTop: "-2.5rem", marginBottom: "2rem" }}>Innovation • Code • Challenges</span>
        </div>

        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "3rem" : "4rem",
          maxWidth: isMobile ? "100%" : 1100,
          margin: "0 auto",
        }}>
          {D.hackathons.map((hack, i) => (
            <ChallengeCard key={i} hack={hack} index={i} isMobile={isMobile} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: "center",
            marginTop: "4rem",
            fontFamily: "var(--serif)",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "var(--ink2)"
          }}
        >
          More challenges ahead.
        </motion.p>
      </div>
    </Card>
  );
}

function ChallengeCard({ hack, index, isMobile }) {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const offset = [
    { rotate: "-2deg", x: -120 },
    { rotate: "1.5deg", x: 120 },
    { rotate: "-1deg", x: -120 },
    { rotate: "2deg", x: 120 },
  ][index % 4];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2rem" : "3rem",
          alignItems: "center",
          background: "var(--bg3)",
          border: "1px solid var(--rule)",
          borderRadius: 12,
          padding: isMobile ? "0" : "2rem",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : 280,
        }}
      >
        {/* IMAGE CONTAINER - Left side (or top on mobile) */}
        <motion.div
          initial={{ x: offset.x, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: index * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => { setHover(true); setImgHover(true); }}
          onMouseLeave={() => { setHover(false); setImgHover(false); }}
          onClick={() => setShowModal(true)}
          style={{
            position: "relative",
            borderRadius: 8,
            overflow: "hidden",
            cursor: "pointer",
            aspectRatio: isMobile ? "16/10" : "4/3",
            background: "var(--bg2)",
          }}
        >
          <img
            src={hack.img}
            alt={hack.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: imgHover ? "blur(8px) brightness(0.5)" : "blur(0px) brightness(0.9)",
              transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
              transform: imgHover ? "scale(1.05)" : "scale(1)",
            }}
          />
          
          {/* Hover overlay with text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imgHover ? 1 : 0 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(13,12,10,0.4)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "var(--ink)",
              textTransform: "uppercase",
              border: "1px solid var(--gold)",
              padding: "12px 24px",
              borderRadius: 4,
            }}>
              Click to View
            </span>
          </motion.div>
        </motion.div>

        {/* CONTENT CONTAINER - Right side (or bottom on mobile) */}
        <motion.div
          initial={{ x: -offset.x, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.8rem" : "1rem",
            padding: isMobile ? "1rem" : "0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{
              fontFamily: "var(--serif)",
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              fontWeight: 400,
              color: "var(--gold)",
              lineHeight: 1.1
            }}>{hack.name}</h3>
            <span style={{
              fontFamily: "var(--mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "var(--ink3)",
              textTransform: "uppercase",
              border: "1px solid var(--rule)",
              padding: "4px 8px",
              borderRadius: 4,
            }}>{hack.year}</span>
          </div>

          <p style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: "var(--ink2)",
          }}>{hack.issuer}</p>

          <p style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
            lineHeight: 1.6,
            color: "var(--ink2)",
            fontWeight: 300,
          }}>{hack.desc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {hack.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "var(--mono)",
                fontSize: "0.52rem",
                letterSpacing: "0.08em",
                color: "var(--gold)",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "3px 8px",
                borderRadius: 4,
                textTransform: "uppercase"
              }}>{tag}</span>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + 0.3 }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setShowModal(true)}
            style={{
              marginTop: isMobile ? "0.5rem" : "0.8rem",
              alignSelf: "flex-start",
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: hover ? "var(--bg)" : "var(--ink)",
              background: hover ? "var(--gold)" : "transparent",
              border: "1px solid var(--gold)",
              padding: "10px 20px",
              borderRadius: 4,
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            View Credential →
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ChallengeModal hack={hack} isMobile={isMobile} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function ChallengeModal({ hack, isMobile, onClose }) {
  const scrollYRef = React.useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      window.scrollTo(0, scrollYRef.current);
    }, 50);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(13,12,10,0.95)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "1rem" : "2rem",
        cursor: "auto",
        pointerEvents: "auto"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: isMobile ? "100%" : 1000,
          width: "100%",
          background: "var(--bg)",
          border: "1px solid var(--rule)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)"
        }}
      >
        <div style={{ width: "100%", maxHeight: isMobile ? "60vh" : "80vh", overflow: "hidden" }}>
          <img
            src={hack.img}
            alt={hack.name}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>

        <div style={{
          padding: isMobile ? "1.5rem" : "1.8rem 2.2rem",
          background: "var(--bg2)",
          borderTop: "1px solid var(--rule)"
        }}>
          {!isMobile ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "var(--gold)" }}>{hack.name}</h3>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--ink3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{hack.issuer} · {hack.year}</span>
              </div>
              <button
                onClick={handleClose}
                style={{
                  fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.14em",
                  color: "var(--ink3)", background: "none", border: "1px solid var(--rule)",
                  padding: "8px 24px", borderRadius: 4, cursor: "pointer", transition: "all 0.3s"
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ink3)"; e.currentTarget.style.borderColor = "var(--rule)"; }}
              >
                Close ×
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--gold)", lineHeight: 1.2 }}>{hack.name}</h3>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{hack.issuer} · {hack.year}</p>
                </div>
                <button
                  onClick={handleClose}
                  style={{
                    fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.12em",
                    color: "var(--ink3)", background: "none", border: "1px solid var(--rule)",
                    padding: "6px 16px", borderRadius: 4
                  }}
                >
                  Close ×
                </button>
              </div>

              <div style={{ height: 1.5, background: "var(--rule)", width: "100%" }} />

              <p style={{
                fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "0.95rem",
                lineHeight: 1.6, color: "var(--ink2)", fontWeight: 300
              }}>
                {hack.desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  CREDENTIALS ═ ═ ═  */
function Credentials() {
  const isMobile = useMobile();
  return (
    <Card id="credentials" label="Credentials" index={4} bgOverride="var(--bg2)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SLabel n="05" text="Credentials" />
        <CertificatesGrid certs={D.certs} isMobile={isMobile} />
      </div>

      {/* GITHUB ACTIVITY BLOCK */}
      <div style={{ 
        padding: "0 clamp(1.5rem,6vw,5rem) clamp(4rem,10vw,8rem)",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 style={{ 
            fontFamily: "var(--serif)", 
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)", 
            color: "var(--ink)", 
            lineHeight: 1.1,
            fontWeight: 300,
            marginBottom: "1rem"
          }}>
            Powered by <i style={{ color: "var(--gold)", fontFamily: "inherit" }}>coffee & commits</i>
          </h2>
          <p style={{ 
            fontFamily: "var(--mono)", 
            fontSize: "0.75rem", 
            letterSpacing: "0.4em", 
            color: "var(--ink3)", 
            textTransform: "uppercase" 
          }}>
            A chronicle of persistence and problem solving.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ width: "100%", maxWidth: 1000, display: "flex", justifyContent: "center" }}
        >
          <GitHubCalendar 
            username="jaintulya" 
            theme={ghTheme}
            fontSize={12}
            blockSize={isMobile ? 10 : 12}
            blockMargin={4}
            colorScheme="dark"
            renderBlock={(block, activity) => (
              React.cloneElement(block, {
                'data-tooltip-id': 'github-tooltip',
                'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
              })
            )}
            style={{ color: "var(--ink2)", fontFamily: "var(--mono)" }}
          />
          <Tooltip id="github-tooltip" style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', borderRadius: '4px', background: 'var(--bg3)', color: 'var(--gold)', border: '1px solid var(--rule)' }} />
        </motion.div>

        {/* VISIT GITHUB BUTTON */}
        <motion.a 
          href="https://github.com/jaintulya"
          target="_blank"
          rel="noreferrer"
          data-cur
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ 
            marginTop: "4rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "1.2rem",
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textDecoration: "none",
            textTransform: "uppercase"
          }}
        >
          Visit Github Profile
          <div style={{ height: 1, width: 24, background: "currentColor" }} />
        </motion.a>
      </div>
    </Card>
  );
}


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  CONTACT ═ ═ ═  */
function Contact() {
  const isMobile = useMobile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focus, setFocus] = useState(null);

  const send = async e => {
    e.preventDefault(); setStatus("sending");
    try {
      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: D.ejs.svc, template_id: D.ejs.tpl, user_id: D.ejs.key,
          template_params: { from_name: form.name, from_email: form.email, message: form.message, to_name: "Tulya Jain" }
        }),
      });
      setStatus(r.ok ? "sent" : "error");
      if (r.ok) setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <Card id="contact" label="Contact" index={5} bgOverride="var(--bg)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh" }}>
        <SLabel n="06" text="Contact" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "3rem 4rem", alignItems: "start" }}>
          {/* Left — big text + links */}
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(3.2rem,8.5vw,7.4rem)", fontWeight: 300, lineHeight: 0.9, letterSpacing: "-0.04em", color: "var(--gold)", marginBottom: "2.2rem" }}>
              Let's <span style={{ color: "var(--ink)" }}>Build.</span>
            </h2>

            <a href={`mailto:${D.email}`} data-cur
              style={{ fontFamily: "var(--mono)", fontSize: "clamp(0.65rem,1.2vw,0.85rem)", letterSpacing: "0.06em", color: "var(--ink2)", textDecoration: "none", borderBottom: "1px solid var(--rule)", paddingBottom: 2, display: "inline-block", marginBottom: "2.5rem", transition: "all 0.25s" }}>
              {D.email}
            </a>

            <div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.24em", color: "var(--ink3)", textTransform: "uppercase", marginBottom: "1.2rem" }}>Elsewhere</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {[...D.socials, { label: "WhatsApp", href: D.whatsapp, icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/whatsapp.svg" }].map(s => {
                  const icons = {
                    GitHub: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
                    LinkedIn: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg",
                    LeetCode: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg",
                    YouTube: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/youtube.svg",
                    WhatsApp: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/whatsapp.svg"
                  };
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cur title={s.label}
                      style={{
                        width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--rule)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(240,236,227,0.03)", transition: "all 0.3s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--rule)"; e.currentTarget.style.background = "rgba(240,236,227,0.03)"; }}>
                      <img src={icons[s.label] || s.icon} alt={s.label}
                        style={{ width: 20, height: 20, filter: "brightness(0) invert(1) sepia(100%) saturate(200%) hue-rotate(10deg) brightness(0.9)" }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div style={{ paddingLeft: isMobile ? 0 : "3rem", borderLeft: isMobile ? "none" : "1px solid var(--rule)" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 900, letterSpacing: "0.26em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "2rem" }}>
              Send a message
            </p>

            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1, marginBottom: "0.8rem" }}>
                  Message<br /><em>received.</em>
                </h3>
                <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1rem", color: "var(--ink2)", fontWeight: 300, marginBottom: "1.5rem" }}>I'll respond within 24 hours.</p>
                <button data-cur onClick={() => setStatus("idle")}
                  style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--ink3)", background: "none", border: "none", borderBottom: "1px solid var(--rule)", paddingBottom: 1 }}>
                  Send bnother →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={send} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {[{ k: "name", l: "Name", t: "text", p: "Your name" }, { k: "email", l: "Email", t: "email", p: "your@email.com" }].map(f => (
                  <div key={f.k}>
                    <label style={{ fontFamily: "var(--mono)", fontSize: "0.57rem", letterSpacing: "0.24em", color: focus === f.k ? "var(--gold)" : "var(--ink3)", display: "block", marginBottom: 6, textTransform: "uppercase", transition: "color 0.3s" }}>{f.l}</label>
                    <input type={f.t} value={form[f.k]} placeholder={f.p} required
                      onFocus={() => setFocus(f.k)} onBlur={() => setFocus(null)}
                      onChange={e => setForm(prev => ({ ...prev, [f.k]: e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "var(--mono)", fontSize: "0.57rem", letterSpacing: "0.24em", color: focus === "message" ? "var(--gold)" : "var(--ink3)", display: "block", marginBottom: 6, textTransform: "uppercase", transition: "color 0.3s" }}>Message</label>
                  <textarea rows={3} value={form.message} placeholder="What are we building?" required
                    onFocus={() => setFocus("message")} onBlur={() => setFocus(null)}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} />
                </div>
                <button type="submit" data-cur disabled={status === "sending"}
                  style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--sans)", fontSize: "0.72rem", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", color: status === "sending" ? "var(--ink3)" : "var(--ink)", background: "none", border: "none", transition: "color 0.2s" }}>
                  <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                  <div style={{ height: 1, width: 36, background: "currentColor" }} />
                </button>
                {status === "error" && <p style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "#c0392b", letterSpacing: "0.1em" }}>Failed to send. Try again.</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer inside last card */}
      <div style={{ padding: "2.5rem clamp(1.5rem,6vw,5rem)", borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--ink3)", textTransform: "uppercase" }}>TULYA JAIN © {new Date().getFullYear()} — Built with Passion</span>
      </div>
    </Card>
  );
}


function PageHead() {
  const { pathname } = useLocation();
  const titles = {
    "/": "Tulya Jain — Full Stack Developer",
    "/about": "About — Tulya Jain",
    "/work": "Selected Work — Tulya Jain",
    "/skills": "Tech Stack — Tulya Jain",
    "/hackathons": "Hackathons — Tulya Jain",
    "/credentials": "Credentials — Tulya Jain",
    "/contact": "Contact — Tulya Jain"
  };

  useEffect(() => {
    const currentTitle = titles[pathname] || "Tulya Jain";
    document.title = currentTitle;
  }, [pathname]);

  return (
    <Helmet>
      <title>{titles[pathname] || "Tulya Jain"}</title>
    </Helmet>
  );
}

function RouterSync() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef(null);
  const isNavigatingRef = useRef(false);

  // Sync Titles Mapping
  const titles = {
    "/": "Tulya Jain — Full Stack Developer",
    "/about": "About — Tulya Jain",
    "/work": "Selected Work — Tulya Jain",
    "/skills": "Tech Stack — Tulya Jain",
    "/hackathons": "Hackathons — Tulya Jain",
    "/credentials": "Credentials — Tulya Jain",
    "/contact": "Contact — Tulya Jain"
  };

  useEffect(() => {
    let scrollTimeout;
    const scrollThreshold = 160; // Bias to trigger before hitting the top

    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      // Special case: Top of page is always Home
      if (window.scrollY < 100) {
        if (window.location.pathname !== "/") {
          lastPath.current = "/";
          navigate("/", { replace: true });
          document.title = titles["/"];
        }
        return;
      }

      const sections = NAVS.map(n => ({
        id: n.toLowerCase(),
        path: n === "Home" ? "/" : `/${n.toLowerCase()}`
      }));

      // Find the "most active" section (the one currently crossing the upper part of the screen)
      let currentWinner = null;
      for (const sect of sections) {
        const el = document.getElementById(sect.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section has entered the viewport's top region
          if (rect.top <= scrollThreshold) {
            currentWinner = sect.path;
          }
        }
      }

      if (currentWinner && window.location.pathname !== currentWinner) {
        lastPath.current = currentWinner;
        navigate(currentWinner, { replace: true });
        if (titles[currentWinner]) {
          document.title = titles[currentWinner];
        }
      }
    };

    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Sync URL -> Section (Initial load or Click)
    if (pathname !== lastPath.current) {
      const targetId = pathname === "/" ? "home" : pathname.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        isNavigatingRef.current = true;
        targetEl.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1200); // Wait for smooth scroll to finish
      }
      lastPath.current = pathname;
    }

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pathname, navigate]);

  return null;
}

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═  SIGNATURE INTRO ═ ═ ═  */
function SignatureIntro({ onEnter }) {
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Both words revebl simultaneously via clip-path wipe — no flying letters, no jumping
  // Tulya: left→right reveal | Jain: right→left reveal
  // easeInOut visually completes ~1.8s. Phase 1 at 1950ms → feels instant after names
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1950);
    return () => clearTimeout(t1);
  }, []);

  const nameStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(4rem, 11vw, 9.5rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    display: "block",
    willChange: "clip-path",
  };

  const afterV = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      key="signature-intro"
      initial={{ opacity: 1 }}
      exit={{ y: "-100vh", opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 10001,
        background: "var(--bg)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      `}</style>

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)", pointerEvents: "none" }} />

      {/* NAMES */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>

        {/* TULYA — smooth wipe: left → right, negative inset to avoid cutting cursive glyphs */}
        <motion.div
          initial={{ clipPath: "inset(-15% 115% -15% -15%)" }}
          animate={{ clipPath: "inset(-15% -15% -15% -15%)" }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          style={{ ...nameStyle, color: "var(--gold)" }}
        >Tulya</motion.div>

        {/* JAIN — smooth wipe: right → left, starts simultaneously */}
        <motion.div
          initial={{ clipPath: "inset(-15% -15% -15% 115%)" }}
          animate={{ clipPath: "inset(-15% -15% -15% -15%)" }}
          transition={{ duration: 2.0, ease: "easeInOut", delay: 0.05 }}
          style={{ ...nameStyle, color: "var(--ink)", marginTop: "-0.15rem" }}
        >Jain</motion.div>

        {/* UNDERLINE — sweeps in from left */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase >= 1 ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "65%", height: 1, background: "var(--gold)", marginTop: "1rem", transformOrigin: "left" }}
        />
      </div>

      {/* SUBTITLE + BUTTON — bppear after words are fully drawn */}
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2, delayChildren: 0 } } }}
        initial="hidden"
        animate={phase >= 1 ? "visible" : "hidden"}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <motion.p
          variants={afterV}
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.44em",
            color: "var(--ink3)",
            textTransform: "uppercase",
            margin: "2rem 0 2.8rem",
          }}
        >
          Full Stack Developer
        </motion.p>

        <motion.button
          variants={afterV}
          onClick={onEnter}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          data-cur
          style={{
            background: "none",
            border: `1px solid ${hovered ? "var(--gold)" : "rgba(240,236,227,0.2)"}`,
            color: hovered ? "var(--gold)" : "var(--ink)",
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            padding: "1rem 3.2rem",
            borderRadius: 40,
            cursor: "none",
            boxShadow: hovered ? "0 0 24px rgba(201,168,76,0.15)" : "none",
            transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          View Portfolio
        </motion.button>
      </motion.div>
    </motion.div>
  );
}






export default function App() {
  const isMobile = useMobile();
  const isBot = typeof navigator !== "undefined" && /Lighthouse|Googlebot|Chrome-Lighthouse|PTST|PageSpeed/i.test(navigator.userAgent);
  const [intro, setIntro] = useState(!isBot); // show signature intro unless bot

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="pg" style={{ position: "relative", background: "var(--bg)" }}>
      <style>{G}</style>
      {/* Cursor rendered globally so it shows on the intro screen too */}
      {!isMobile && <Cursor />}
      <AnimatePresence mode="wait">
        {intro ? (
          <SignatureIntro key="intro" onEnter={() => setIntro(false)} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <PageHead />
            <RouterSync />
            <Nav />
            <main style={{ position: "relative", zIndex: 1 }}>
              <Hero />
              <About />
              <SkillStrip />
              <Work />
              <Skills />
              <Hackathons />
              <Credentials />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
