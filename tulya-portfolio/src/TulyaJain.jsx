import Background from "./Background";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════ DATA ═══ */
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
    { label: "GitHub",   href: "https://github.com/jaintulya" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tulya-jain-b84827372/" },
    { label: "LeetCode", href: "https://leetcode.com/u/o08s0tJtFp/" },
    { label: "YouTube",  href: "https://www.youtube.com/@TulyaJain" },
  ],
  skills: [
    {
      cat: "Frontend",
      items: [
        { name: "HTML",          icon: "https://cdn.simpleicons.org/html5" },
        { name: "CSS",           icon: "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg" },
        { name: "JavaScript",     icon: "https://cdn.simpleicons.org/javascript" },
        { name: "React",          icon: "https://cdn.simpleicons.org/react" },
        { name: "Tailwind CSS",   icon: "https://cdn.simpleicons.org/tailwindcss" },
      ],
    },
    {
      cat: "Backend",
      items: [
        { name: "Node.js",   icon: "https://cdn.simpleicons.org/nodedotjs" },
        { name: "Express",   icon: "https://cdn.simpleicons.org/express/f0ece3" },
        { name: "MongoDB",   icon: "https://cdn.simpleicons.org/mongodb" },
      ],
    },
    {
      cat: "Toolchain",
      items: [
        { name: "Git",      icon: "https://cdn.simpleicons.org/git" },
        { name: "GitHub",   icon: "https://cdn.simpleicons.org/github/f0ece3" },
        { name: "Figma",    icon: "https://cdn.simpleicons.org/figma" },
        { name: "Postman",  icon: "https://cdn.simpleicons.org/postman" },
        { name: "Vercel",   icon: "https://cdn.simpleicons.org/vercel/f0ece3" },
        { name: "Netlify",  icon: "https://cdn.simpleicons.org/netlify" },
      ],
    },
  ],
  projects: [
    {
      n: "01", name: "PRIME Clone", year: "2025",
      desc: "A faithful recreation of Amazon Prime Video's interface. Responsive card grids, dynamic content layout, and smooth navigation — built to pixel precision.",
      tech: ["React", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461010/prime-coverpic_uvsmt9.png",
      live: "https://prime-tulya.netlify.app",
      repo: "https://github.com/jaintulya/clone-projects/tree/master/prime",
      videoId: "sRj0Frixa_4",
    },
    {
      n: "02", name: "AARKE Clone", year: "2025",
      desc: "Premium kitchen appliance brand — bold editorial typography, scroll-reveal animations, and exacting fidelity to the original brand language.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461065/aarke-cover_ghgd98.png",
      live: "https://aarke-tulya.netlify.app",
      repo: "https://github.com/jaintulya/clone-projects/tree/master/aarke",
      videoId: "spL9vNEar_E",
    },
    {
      n: "03", name: "BEVEL Clone", year: "2025",
      desc: "Luxury men's grooming brand. Cinematic full-screen hero sections, layered parallax depth, and an immersive product story built in pure HTML/CSS.",
      tech: ["HTML5", "CSS3"],
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/f_auto,q_auto,w_1000/v1770461010/bevel-cover_hqccgt.png",
      live: "https://bevel-tulya.netlify.app",
      repo: "https://github.com/jaintulya/clone-projects/tree/master/bevel",
      videoId: "Kyb9361X-mA",
    },
  ],
  certs: [
    { name: "Solution Architecture", org: "Amazon Web Services", year: "2026",
      desc: "Distributed systems on AWS — compute, storage, networking, security, and cost optimisation for scalable architectures.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/aws_certificate_pages-to-jpg-0001_wsdave.jpg" },
    { name: "Software Engineering", org: "Wells Fargo", year: "2026",
      desc: "Agile workflows, code review, debugging, and building fintech features in a real engineering simulation.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/well_fargo_page-0001_tmy6tq.jpg" },
    { name: "Software Engineering", org: "Walmart Global Tech", year: "2026",
      desc: "Data structures, algorithms, system design, and scalable software at global retail scale.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/walmart_page-0001_oedx1f.jpg" },
    { name: "Generative AI Studio", org: "Google Cloud", year: "2025",
      desc: "Vertex AI, prompt engineering, foundation model tuning, multi-modal AI, and GCP pipeline deployment.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180240/introduction_to_generative_ai_studio_page-0001_xb6gpj.jpg" },
    { name: "Front-End Engineering", org: "Skyscanner", year: "2026",
      desc: "Accessible, internationalised React components using Skyscanner's Backpack design system.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/skyscanner_page-0001_xtalcr.jpg" },
    { name: "Excel Automation with AI", org: "Microsoft", year: "2025",
      desc: "Automating Excel workflows with ChatGPT — intelligent formulas and spreadsheet solutions without code.",
      img: "https://res.cloudinary.com/dob8kltpc/image/upload/v1770180238/Excel_automation_using_chagpt_pages-to-jpg-0001_jc6nmq.jpg" },
  ],
};

/* ═══════════════════════════════════ GLOBAL CSS ═══ */
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
h1, h2, h3, h4, h5, h6 { font-weight: 900!important; }
.card-wrap{will-change:transform, opacity;}
.skill-icon-bg{width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.skill-icon-img{filter:brightness(1) contrast(1.1);}
.status-pill{background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.3);border-radius:6px;}
.hl{color:var(--gold);font-weight:500;font-style:normal;}
.marquee-strip{overflow:hidden;white-space:nowrap;padding:1.4rem 0;background:var(--bg);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);display:flex;align-items:center;}
.marquee-inner{display:flex;gap:4rem;animation:scroll 40s linear infinite;}
.about-watermark{position:absolute;right:-5%;top:20%;font-family:var(--serif);font-size:25vw;font-weight:900;color:rgba(240,236,227,0.03);pointer-events:none;z-index:0;user-select:none;line-height:1;}
@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
`;


/* ═══════════════════════════════════ CURSOR ═══ */
function Cursor() {
  const [p, setP] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const mv = e => setP({ x: e.clientX, y: e.clientY });
    const over = e => setHov(!!e.target.closest("a,button,input,textarea,[data-cur]"));
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseover", over); };
  }, []);
  
  const size = hov ? 32 : 18;
  const col = "#c9a84c"; 
  
  return (
    <div style={{
      position: "fixed", left: p.x, top: p.y,
      transform: "translate(-50%,-50%)",
      zIndex: 99999, pointerEvents: "none",
      transition: "width 0.3s, height 0.3s, opacity 0.2s",
      width: size, height: size,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {/* Precision Reticle */}
      <div style={{ position: "absolute", borderRadius: "50%", border: `1px solid ${col}`, opacity: 0.35, width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", width: "120%", height: 1, background: col, opacity: 0.25 }} />
      <div style={{ position: "absolute", height: "120%", width: 1, background: col, opacity: 0.25 }} />
      <div style={{ width: 2, height: 2, background: col, borderRadius: "50%" }} />
    </div>
  );
}

/* ═══════════════════════════════════ NAV ═══ */
const NAVS = ["Home","About","Work","Skills","Credentials","Contact"];
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
  const location = useLocation();

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
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
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
                  <NavLink key={n} to={path} data-cur
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
                  <NavLink key={n} to={path} onClick={() => setMenuOpen(false)}
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

/* ═══════════════════════════════════ BREATHING RINGS BG ═══ */
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

/* ═══════════════════════════════════ PROJECT IMAGE ═══ */
function ProjectImage({ src, alt, live }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={live} target="_blank" rel="noreferrer" data-cur
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: "block", position: "relative", border: "1px solid var(--rule)", background: "var(--bg3)", overflow: "hidden", cursor: "none" }}>
      <img src={src} alt={alt} 
        style={{ 
          width: "100%", display: "block", 
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

/* ═══════════════════════════════════ STACKING CARD WRAPPER ═══ */
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

/* ═══════════════════════════════════ SECTION LABEL ═══ */
const SLabel = ({ n, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "3.5rem" }}>
    <span style={{ fontFamily: "var(--mono)", fontSize: "0.95rem", color: "var(--gold)", letterSpacing: "0.22em", fontWeight: 600 }}>{n}</span>
    <div style={{ height: 1.5, width: 48, background: "var(--gold)" }} />
    <span style={{ fontFamily: "var(--mono)", fontSize: "0.95rem", letterSpacing: "0.45em", color: "var(--gold)", textTransform: "uppercase", fontWeight: 700 }}>{text}</span>
  </div>
);

/* ═══════════════════════════════════ HERO ═══ */
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
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16,1,0.3,1] }}
            style={{ fontFamily: "var(--serif)", fontSize: "clamp(4.5rem,15vw,14rem)", fontWeight: 300, lineHeight: 0.82, letterSpacing: "-0.04em", color: "var(--ink)", textTransform: "uppercase" }}>
            TULYA
          </motion.h1>
        </div>

        {/* Thin rule */}
        <motion.div initial={{ scaleX: 0 }} animate={vis ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.76,0,0.24,1] }}
          style={{ height: 1, background: "var(--rule)", margin: "0.6rem auto", maxWidth: 700, transformOrigin: "left" }} />

        {/* JAIN italic */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1 initial={{ y: 140 }} animate={vis ? { y: 0 } : { y: 140 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16,1,0.3,1] }}
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

/* ═══════════════════════════════════ ABOUT ═══ */
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
              {[["0,0","tl"],["0,auto","bl"],["auto,0","tr"],["auto,auto","br"]].map(([pos,k],i) => {
                const [t,l,bt,r] = pos === "0,0" ? ["0","0",undefined,undefined] : pos === "0,auto" ? ["auto","0","0",undefined] : pos === "auto,0" ? ["0",undefined,undefined,"0"] : ["auto",undefined,"0","0"];
                return <div key={k} style={{ position:"absolute", width:20, height:20, top:t, left:l, bottom:bt, right:r, borderTop: (i===0||i===2) ? "1px solid var(--gold2)" : "none", borderBottom: (i===1||i===3) ? "1px solid var(--gold2)" : "none", borderLeft: (i===0||i===1) ? "1px solid var(--gold2)" : "none", borderRight: (i===2||i===3) ? "1px solid var(--gold2)" : "none", zIndex: 2 }} />;
              })}
              <img src={D.avatar} alt="Tulya Jain" style={{ width: "100%", display: "block", filter: "sepia(10%) contrast(1.05) brightness(0.88)", border: "1px solid var(--rule)" }} />
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

/* ═══════════════════════════════════ SKILL STRIP ═══ */
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

/* ═══════════════════════════════════ VIDEO MODAL ═══ */
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
          transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
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

/* ═══════════════════════════════════ WORK ═══ */
function Work() {
  const [active, setActive] = useState(0);
  const [video, setVideo] = useState(null);
  const isMobile = useMobile();
  const p = D.projects[active];

  return (
    <Card id="work" label="Work" index={1} bgOverride="var(--bg)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SLabel n="02" text="Selected Work" />

        {!isMobile ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem 3rem", alignItems: "start" }}>
            {/* Project list */}
            <div>
              {D.projects.map((proj, i) => (
                <div key={proj.n} style={{ borderTop: "1px solid var(--rule)" }}>
                  <button data-cur onClick={() => setActive(i)}
                    style={{ width: "100%", textAlign: "left", padding: "1.4rem 0", background: "none", border: "none", display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: active === i ? "var(--gold)" : "var(--ink3)", letterSpacing: "0.12em", paddingTop: 6, minWidth: 28, transition: "color 0.3s" }}>
                      {proj.n}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: active === i ? 400 : 300, color: active === i ? "var(--ink)" : "var(--ink2)", letterSpacing: "-0.01em", lineHeight: 1.1, transition: "all 0.3s" }}>
                        {proj.name}
                      </div>
                      <motion.div animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                        transition={{ duration: 0.38, ease: [0.16,1,0.3,1] }}
                        style={{ overflow: "hidden" }}>
                        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.65, color: "var(--ink2)", fontWeight: 300, marginTop: "0.5rem", paddingBottom: "0.25rem" }}>
                          {proj.desc}
                        </p>
                      </motion.div>
                    </div>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--ink3)", paddingTop: 6 }}>{proj.year}</span>
                  </button>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--rule)" }} />

              {/* Tech + links */}
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
                style={{ marginTop: "1.5rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--ink3)", border: "1px solid var(--rule)", padding: "3px 8px", borderRadius: 3, textTransform: "uppercase" }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  {[
                    { l: "Live Site ↗", h: p.live },
                    { l: "Source ↗", h: p.repo },
                  ].map(({ l, h }) => (
                    <a key={l} href={h} target="_blank" rel="noreferrer" data-cur
                      style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid var(--gold2)", paddingBottom: 1, transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink3)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold2)"; }}>
                      {l}
                    </a>
                  ))}
                  <button data-cur onClick={() => setVideo(p.videoId)}
                    style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--ink2)", background: "none", border: "none", borderBottom: "1px solid var(--rule)", paddingBottom: 1, transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--ink2)"; e.currentTarget.style.borderColor = "var(--rule)"; }}>
                    Watch Demo ▶
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Project image */}
            <motion.div key={`img-${active}`} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.76,0,0.24,1] }}>
              <ProjectImage src={p.img} alt={p.name} live={p.live} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", color: "var(--ink3)", letterSpacing: "0.1em" }}>{p.name}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", color: "var(--ink3)" }}>{p.year}</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {D.projects.map(proj => (
              <div key={proj.n} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <ProjectImage src={proj.img} alt={proj.name} live={proj.live} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 300, color: "var(--ink)" }}>{proj.name}</h3>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--ink3)" }}>{proj.year}</span>
                  </div>
                  <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "var(--ink2)", fontWeight: 300, marginBottom: "1.5rem" }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", borderTop: "1px solid var(--rule)", paddingTop: "1rem" }}>
                    {[
                      { l: "Live ↗", h: proj.live },
                      { l: "Source ↗", h: proj.repo },
                    ].map(({ l, h }) => (
                      <a key={l} href={h} target="_blank" rel="noreferrer"
                        style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gold)", textDecoration: "none" }}>
                        {l}
                      </a>
                    ))}
                    <button onClick={() => setVideo(proj.videoId)}
                      style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--ink2)", background: "none", border: "none" }}>
                      Watch Demo ▶
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {video && <VideoModal videoId={video} onClose={() => setVideo(null)} />}
    </Card>
  );
}

/* ═══════════════════════════════════ SKILLS ═══ */
function Skills() {
  return (
    <Card id="skills" label="Skills" index={2} bgOverride="var(--bg2)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SLabel n="03" text="Skills" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2.5rem 3rem" }}>
          {D.skills.map((cat, ci) => (
            <div key={cat.cat}>
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>{cat.cat}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--ink3)" }}>— {String(cat.items.length).padStart(2,"0")}</span>
              </div>

              {/* Skill rows with icons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {cat.items.map((skill, si) => (
                  <motion.div key={skill.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: si * 0.07, ease: [0.16,1,0.3,1] }}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "12px 0", borderBottom: "1px solid var(--rule)" }}
                    data-cur
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = "8px"; e.currentTarget.style.transition = "padding 0.25s"; }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; }}>
                    {/* Icon Container with Background */}
                    <div className="skill-icon-bg">
                      <img src={skill.icon} alt={skill.name}
                        className="skill-icon-img"
                        style={{ width: 22, height: 22, objectFit: "contain" }}
                        onError={e => { e.currentTarget.style.display = "none"; }} />
                    </div>
                    <span style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 300, color: "var(--ink)", flex: 1 }}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Count stat removed as requested */}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════ CREDENTIALS ═══ */
function CertCard({ cert, i }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16,1,0.3,1] }}
        data-cur
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
        style={{
          border: "1px solid var(--rule)",
          borderRadius: 8, overflow: "hidden",
          background: "var(--bg3)",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          cursor: "none",
          position: "relative",
          aspectRatio: "4/3",
        }}>
        {/* Certification Image - Main Background */}
        <img src={cert.img} alt={cert.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: hovered ? 0.15 : 1, transition: "opacity 0.6s ease", filter: "sepia(10%) contrast(1.05) brightness(0.88)" }} />

        {/* Hover Overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", inset: 0,
            padding: "1.5rem",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            background: "linear-gradient(to top, rgba(13,12,10,0.9), transparent)",
            pointerEvents: hovered ? "auto" : "none"
          }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.2, marginBottom: "0.5rem" }}>{cert.name}</p>
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--ink3)", marginBottom: "1rem" }}>{cert.org} · {cert.year}</p>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--ink2)", fontWeight: 300, marginBottom: "1.5rem" }}>
            {cert.desc}
          </p>
          <button data-cur onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            style={{
              fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.15em",
              background: "var(--gold)", color: "var(--bg)", border: "none",
              padding: "10px 20px", borderRadius: 4, width: "fit-content",
              fontWeight: 600, textTransform: "uppercase"
            }}>
            View Certificate
          </button>
        </motion.div>
      </motion.div>

      {/* Full cert modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(13,12,10,0.93)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <motion.div initial={{ scale: 0.9, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 24, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16,1,0.3,1] }}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: 680, width: "100%", border: "1px solid var(--rule)", borderRadius: 8, overflow: "hidden", background: "var(--bg)" }}>
              <img src={cert.img} alt={cert.name} style={{ width: "100%", display: "block", filter: "sepia(10%) contrast(1.05) brightness(0.88)" }} />
              <div style={{ padding: "1.2rem 1.6rem", borderTop: "1px solid var(--rule)", display: "flex", flexDirection: "column", gap: "1rem", background: "var(--bg2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--ink)" }}>{cert.name}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--ink3)", marginLeft: 14, letterSpacing: "0.1em" }}>{cert.org}</span>
                  </div>
                  <button data-cur onClick={() => setOpen(false)}
                    style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", letterSpacing: "0.14em", color: "var(--ink3)", background: "none", border: "1px solid var(--rule)", padding: "5px 14px", borderRadius: 3 }}>
                    Close ×
                  </button>
                </div>
                {isMobile && (
                  <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "var(--ink2)", fontWeight: 300, borderTop: "1px solid var(--rule)", paddingTop: "0.8rem" }}>
                    {cert.desc}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Credentials() {
  return (
    <Card id="credentials" label="Credentials" index={3} bgOverride="var(--bg)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SLabel n="04" text="Credentials" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem" }}>
          {D.certs.map((c, i) => <CertCard key={i} cert={c} i={i} />)}
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════ CONTACT ═══ */
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
        body: JSON.stringify({ service_id: D.ejs.svc, template_id: D.ejs.tpl, user_id: D.ejs.key,
          template_params: { from_name: form.name, from_email: form.email, message: form.message, to_name: "Tulya Jain" } }),
      });
      setStatus(r.ok ? "sent" : "error");
      if (r.ok) setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <Card id="contact" label="Contact" index={4} bgOverride="var(--bg2)">
      <div style={{ padding: "clamp(2rem,5vw,4rem) clamp(1.5rem,6vw,5rem)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <SLabel n="05" text="Contact" />

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
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={send} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {[{ k:"name",l:"Name",t:"text",p:"Your name" },{ k:"email",l:"Email",t:"email",p:"your@email.com" }].map(f => (
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

function RouterSync() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef(null);

  useEffect(() => {
    // 1. Sync Section -> URL
    const sects = NAVS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const label = e.target.getAttribute("data-label")?.toLowerCase();
          const targetPath = label === "home" ? "/" : `/${label}`;
          if (window.location.pathname !== targetPath) {
            lastPath.current = targetPath;
            window.history.replaceState(null, "", targetPath);
          }
        }
      });
    }, { threshold: 0.4 });
    sects.forEach(s => s && obs.observe(s));

    // 2. Sync URL -> Section (on initial load or manual navigation)
    if (pathname !== lastPath.current) {
      const targetId = pathname === "/" ? "home" : pathname.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }, 300); 
      }
      lastPath.current = pathname;
    }

    return () => obs.disconnect();
  }, [pathname]);

  return null;
}

export default function App() {
  const isMobile = useMobile();

  return (
    <div className="pg" style={{ position: "relative", background: "var(--bg)" }}>
      <style>{G}</style>
      <RouterSync />
      {!isMobile && <Cursor />}
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <SkillStrip />
        <Work />
        <Skills />
        <Credentials />
        <Contact />
      </main>
    </div>
  );
}
