import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/**
 * PROJECT ITEM COMPONENT
 * Implements alternating layout and scroll-synced bidirectional animations.
 */
export function ProjectItem({ project, index, isMobile, onPlayVideo }) {
  const containerRef = useRef(null);
  const [imgHover, setImgHover] = useState(false);
  
  // Scroll tracking for entry/exit animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Entrance & Exit animations mapping
  // 0 (Bottom) -> 0.3 (Center Focus) -> 0.7 (End Focus) -> 1 (Top)
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]);
  
  // Lateral slide based on side
  const isRight = index % 2 !== 0;
  const xOffset = isRight ? 120 : -120; // Increased offset for better visibility
  
  // Bidirectional sliding: Comes from side, stays center, exits opposite side
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [xOffset, 0, 0, -xOffset]);
  const reverseX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-xOffset, 0, 0, xOffset]);

  // Parallax for image
  const yParallax = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const handleImageClick = () => {
    if (project.live) window.open(project.live, "_blank");
  };

  return (
    <motion.section
      ref={containerRef}
      style={{
        opacity,
        scale,
        minHeight: isMobile ? "auto" : "90vh",
        display: "flex",
        flexDirection: isMobile ? "column" : (isRight ? "row-reverse" : "row"),
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "4rem 1.5rem" : "6rem 5rem",
        gap: isMobile ? "2.5rem" : "5.5rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* BACKGROUND GRADIENT SHIFT */}
      <motion.div 
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${isRight ? '85%' : '15%'} 50%, rgba(201,169,110,0.04) 0%, transparent 75%)`,
          zIndex: -1
        }}
      />

      {/* IMAGE SIDE */}
      <motion.div 
        style={{ 
          flex: 1, 
          width: "100%", 
          x: isMobile ? 0 : x,
          position: "relative"
        }}
      >
        <div 
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
          onClick={handleImageClick}
          style={{ 
            position: "relative", 
            overflow: "hidden", 
            borderRadius: 14, 
            border: "1px solid rgba(240,236,227,0.1)",
            boxShadow: imgHover ? "0 30px 60px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.4)",
            cursor: "pointer",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <motion.img 
            src={project.img} 
            alt={project.name}
            style={{ 
              width: "100%", 
              height: "auto", 
              display: "block",
              y: yParallax,
              scale: 1.1,
              filter: imgHover ? "brightness(0.3) contrast(1.1) blur(4px)" : "brightness(0.9) contrast(1.1) blur(0)",
              transition: "filter 0.6s ease"
            }}
          />
          
          {/* IMAGE HOVER OVERLAY */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: imgHover ? 1 : 0,
            transform: imgHover ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none"
          }}>
            <div style={{
              background: "rgba(201, 168, 76, 0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--gold)",
              padding: "14px 28px",
              borderRadius: 4,
              fontFamily: "var(--mono)",
              fontSize: "0.75rem",
              color: "var(--gold)",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase"
            }}>
              View Project ↗
            </div>
          </div>

          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, rgba(13,12,10,0.3))",
            pointerEvents: "none",
            opacity: imgHover ? 0 : 1,
            transition: "opacity 0.6s"
          }} />
        </div>
      </motion.div>

      {/* CONTENT SIDE */}
      <motion.div 
        style={{ 
          flex: 1, 
          width: "100%", 
          x: isMobile ? 0 : reverseX,
          textAlign: isMobile ? "left" : (isRight ? "right" : "left"),
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "flex-start" : (isRight ? "flex-end" : "flex-start")
        }}
      >
        <span style={{ 
          fontFamily: "var(--mono)", 
          fontSize: "0.75rem", 
          color: "var(--gold)", 
          letterSpacing: "0.3em", 
          textTransform: "uppercase",
          marginBottom: "1rem" 
        }}>
          {project.year} // project {project.n}
        </span>
        
        <h2 style={{ 
          fontFamily: "var(--serif)", 
          fontSize: "clamp(2.5rem, 6vw, 5rem)", 
          color: "var(--ink)", 
          lineHeight: 1,
          marginBottom: "1.5rem" 
        }}>
          {project.name}
        </h2>
        
        <p style={{ 
          fontFamily: "var(--serif)", 
          fontSize: "1.1rem", 
          lineHeight: 1.7, 
          color: "var(--ink2)", 
          maxWidth: 500,
          marginBottom: "2rem",
          fontStyle: "italic"
        }}>
          {project.desc}
        </p>

        {/* TECH STACK */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "0.8rem", 
          marginBottom: "2.5rem",
          justifyContent: isMobile ? "flex-start" : (isRight ? "flex-end" : "flex-start")
        }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              padding: "6px 12px",
              border: "1px solid var(--rule)",
              borderRadius: 4,
              color: "var(--ink3)"
            }}>{t}</span>
          ))}
        </div>

        {/* BUTTONS */}
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          flexWrap: "wrap",
          justifyContent: isMobile ? "flex-start" : (isRight ? "flex-end" : "flex-start")
        }}>
          <ProjectButton href={project.live} label="Live" highlight />
          <ProjectButton href={project.repo} label="Source" />
          <ProjectButton onClick={() => onPlayVideo(project.videoId)} label="Demo" />
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProjectButton({ href, onClick, label, highlight }) {
  const [hover, setHover] = useState(false);
  
  const content = (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        padding: "10px 24px",
        borderRadius: 4,
        border: `1px solid ${highlight ? "rgba(201,168,76,0.6)" : "var(--rule)"}`,
        background: "transparent",
        color: highlight ? "var(--gold)" : "var(--ink2)",
        fontFamily: "var(--mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <motion.span animate={{ x: hover ? 4 : 0 }}>{label}</motion.span>
      <motion.span animate={{ x: hover ? 4 : 0, opacity: hover ? 1 : 0.7 }}>
        {label === "Demo" ? "▶" : "↗"}
      </motion.span>
      
      {/* Premium Border Trace instead of flashy fill */}
      <motion.div 
        animate={{ scaleX: hover ? 1 : 0 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--gold)",
          transformOrigin: "left"
        }}
      />
    </motion.div>
  );

  if (href) return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>{content}</a>;
  return content;
}

/**
 * CERTIFICATES GRID COMPONENT
 */
export function CertificatesGrid({ certs, isMobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "1.5rem",
      marginTop: "4rem"
    }}>
      {certs.map((cert, i) => (
        <CertCard key={i} cert={cert} index={i} isMobile={isMobile} />
      ))}
    </div>
  );
}

function CertModal({ cert, onClose, isMobile }) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    onClose();
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollYRef.current);
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 999999,
      background: "rgba(0,0,0,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ position: "relative", paddingTop: 40 }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            fontFamily: "var(--mono)",
            fontSize: "0.8rem",
            color: "#f0ece3",
            background: "transparent",
            border: "1px solid #f0ece3",
            padding: "10px 22px",
            borderRadius: 4,
            cursor: "pointer",
            letterSpacing: "0.15em"
          }}
        >
          CLOSE
        </button>

        <img
          src={cert.img}
          alt={cert.name}
          style={{
            maxWidth: "60vw",
            maxHeight: "70vh",
            objectFit: "contain",
            border: "1px solid rgba(240,236,227,0.15)"
          }}
        />
      </div>
    </div>
  );
}

function CertCard({ cert, index, isMobile }) {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = () => {
    setShowModal(true);
  };
  
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        style={{
          border: "1px solid var(--rule)",
          borderRadius: 8,
          overflow: "hidden",
          background: "var(--bg3)",
          transition: "0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
          aspectRatio: "4 / 3",
          cursor: "pointer"
        }}
      >
        {/* BASE IMAGE */}
        <img 
          src={cert.img} 
          alt={cert.name}
          loading="lazy"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            opacity: hover ? 0.25 : 1, // Reduced opacity for focus
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: `sepia(10%) contrast(1.05) brightness(0.88) ${hover ? "blur(8px)" : "blur(0)"}`, // Added blur
            transform: hover ? "scale(1.1)" : "scale(1)" // Increased scale slightly
          }}
        />

        {/* OVERLAY CONTENT (Reveals on hover) */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            /* Enhanced Visibility Gradient */
            background: "linear-gradient(to top, rgba(13, 12, 10, 0.98), rgba(13, 12, 10, 0.4) 40%, transparent 80%)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(20px)",
            pointerEvents: hover ? "auto" : "none"
          }}
        >
          <p style={{ 
            fontFamily: "var(--serif)", 
            fontSize: "1.45rem", 
            fontWeight: 400, 
            color: "var(--ink)", 
            lineHeight: 1.2, 
            marginBottom: "0.6rem",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>
            {cert.name}
          </p>
          
          <p style={{ 
            fontFamily: "var(--mono)", 
            fontSize: "0.68rem", 
            letterSpacing: "0.1em", 
            color: "var(--ink2)", 
            marginBottom: "1.2rem",
            fontWeight: 500
          }}>
            {cert.org} · {cert.year}
          </p>
          
          <p style={{ 
            fontFamily: "var(--serif)", 
            fontStyle: "italic", 
            fontSize: "0.95rem", 
            lineHeight: 1.5, 
            color: "var(--ink)", 
            fontWeight: 300, 
            marginBottom: "1.8rem",
            opacity: 0.9
          }}>
            {cert.desc}
          </p>
          
          <button 
            style={{ 
              fontFamily: "var(--mono)", 
              fontSize: "0.7rem", 
              letterSpacing: "0.15em", 
              background: "var(--gold)", 
              color: "var(--bg)", 
              border: "none", 
              padding: "12px 24px", 
              borderRadius: 4, 
              width: "fit-content", 
              fontWeight: 700, 
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(201,168,76,0.2)"
            }}
          >
            View Certificate
          </button>
        </div>

        {/* BORDER GLOW ON HOVER */}
        <div style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(201,168,76,0.3)",
          opacity: hover ? 1 : 0,
          borderRadius: 8,
          pointerEvents: "none",
          transition: "opacity 0.4s"
        }} />
      </div>

      {/* MODAL IN PORTFOLIO */}
      {showModal && (
        <CertModal 
          cert={cert} 
          isMobile={isMobile} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}
