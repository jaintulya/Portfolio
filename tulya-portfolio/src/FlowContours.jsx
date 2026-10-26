import { useEffect, useRef } from "react";

/**
 * FlowContours — Calibrated Topographic Flow with Movement-Only & Scroll Interaction
 * 
 * Implements user requirements:
 * 1. ABOUT ONWARDS ONLY: Background lines start cleanly from the About section and are completely
 *    hidden in the Home (Hero) section via viewport boundary tracking and clipPath.
 * 2. STEADY CURSOR FIX: When the cursor is stationary/steady, interaction intensity decays to 0,
 *    preventing any ripples or warping around an idle pointer.
 * 3. MOVEMENT & SCROLL INTERACTION: Liquid magnetic ripples activate ONLY when the mouse is moving
 *    or when scrolling the page.
 * 4. SLOW & MAJESTIC FLOW: Calibrated speed (0.00028) so lines flow with soothing luxury motion.
 */
export default function FlowContours() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = mediaQuery.matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let animationId = 0;
    let scrollY = window.scrollY || 0;

    // Mouse tracking with fluid lerp
    let targetMouseX = -2000;
    let targetMouseY = -2000;
    let mouseX = -2000;
    let mouseY = -2000;
    let lastEventMouseX = -2000;
    let lastEventMouseY = -2000;

    // Interaction intensity: 0 when steady/idle, > 0 only on active movement & scroll
    let interactionStrength = 0;
    let interactionTarget = 0;

    const settings = {
      baseOpacity: 0.058,
      highlightOpacity: 0.095,
      speed: 0.00028, // Slower, calm, majestic flow speed
      highlightEvery: 7,
      gold: "214, 181, 109",
      goldLight: "242, 221, 166",
      cursorRadius: 280, // Interaction radius around cursor
      cursorForce: 18,   // Organic wave displacement under moving cursor
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(frame);
    }

    // Rich multi-harmonic organic wave with motion-only cursor warp
    function contourY(x, i, time, baseY, amp) {
      const nx = x / Math.max(width, 1);
      const slow = time * settings.speed;

      // Base undulating landscape harmonics
      const broadFlow =
        Math.sin(nx * 4.0 + slow * 1.1 + i * 0.19) * amp;
      const fineFlow =
        Math.sin(nx * 8.5 - slow * 0.75 + i * 0.13) * (amp * 0.32);
      const longCurve =
        Math.cos(nx * 1.9 + slow * 0.52 + i * 0.10) * (amp * 0.75);
      const travellingBend =
        Math.sin(slow * 0.9 + i * 0.11 + nx * 2.7) * (amp * 0.45);

      let y = baseY + broadFlow + fineFlow + longCurve + travellingBend;

      // Active ONLY during movement and scroll (interactionStrength > 0)
      // When cursor is steady, interactionStrength decays to 0 so lines remain calm
      if (interactionStrength > 0.004) {
        const dx = x - mouseX;
        const dy = baseY - mouseY;
        const distSq = dx * dx + dy * dy;
        const r = settings.cursorRadius;
        if (distSq < r * r) {
          const dist = Math.sqrt(distSq);
          const force = Math.pow(1 - dist / r, 2) * interactionStrength;
          const cursorWarp = Math.sin(dist * 0.032 - time * 0.0016) * force * settings.cursorForce;
          y += cursorWarp;
        }
      }

      return y;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const lineStep = isMobile ? 5 : 4;
      const lineSpacing = isMobile ? 16 : 18;
      const amp = isMobile ? 26 : 36;

      // Scroll interaction: smooth continuous parallax
      const scrollShift = scrollY * 0.20;
      const offsetMod = ((scrollShift % lineSpacing) + lineSpacing) % lineSpacing;
      const lineBaseIndex = Math.floor(scrollShift / lineSpacing);

      const numLines = Math.ceil(height / lineSpacing) + 6;
      const left = -24;
      const right = width + 24;

      for (let i = -3; i < numLines; i++) {
        const baseY = i * lineSpacing - offsetMod;
        const globalIndex = i + lineBaseIndex;
        const isHighlight = Math.abs(globalIndex) % settings.highlightEvery === 3;
        const alpha = isHighlight ? settings.highlightOpacity : settings.baseOpacity;

        ctx.beginPath();
        let first = true;
        for (let x = left; x <= right; x += lineStep) {
          const y = contourY(x, globalIndex, time, baseY, amp);
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = isHighlight
          ? `rgba(${settings.goldLight}, ${alpha})`
          : `rgba(${settings.gold}, ${alpha})`;
        ctx.lineWidth = isHighlight ? 0.9 : 0.65;
        ctx.stroke();
      }
    }

    function syncSectionVisibility() {
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        // If About is completely below the viewport, hide canvas completely (Home section)
        if (rect.top >= window.innerHeight - 5) {
          if (wrapper.style.opacity !== "0") {
            wrapper.style.opacity = "0";
            wrapper.style.clipPath = "inset(100% 0 0 0)";
          }
        } else {
          if (wrapper.style.opacity !== "1") {
            wrapper.style.opacity = "1";
          }
          // Clip any portion above About so the lines NEVER enter the Home section
          const clipTop = Math.max(0, Math.round(rect.top));
          wrapper.style.clipPath = `inset(${clipTop}px 0 0 0)`;
        }
      } else {
        const heroThreshold = window.innerHeight * 0.85;
        if (scrollY < heroThreshold) {
          wrapper.style.opacity = "0";
          wrapper.style.clipPath = "inset(100% 0 0 0)";
        } else {
          wrapper.style.opacity = "1";
          wrapper.style.clipPath = "none";
        }
      }
    }

    function animate(now) {
      if (reducedMotion) {
        animationId = 0;
        return;
      }
      const delta = lastTime ? Math.min(now - lastTime, 40) : 16;
      frame += delta;

      // Smooth cursor lerp
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Interaction intensity physics: smooth approach and steady decay
      // When cursor stops moving and user stops scrolling, interaction target & strength decay to 0
      interactionStrength += (interactionTarget - interactionStrength) * 0.12;
      interactionTarget *= 0.92;
      if (interactionTarget < 0.004) interactionTarget = 0;
      if (interactionStrength < 0.004) interactionStrength = 0;

      // Periodically sync section boundary to ensure Home never has lines
      if (Math.round(frame / delta) % 8 === 0) {
        syncSectionVisibility();
      }

      draw(frame);
      lastTime = now;
      animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!animationId && !reducedMotion && !document.hidden) {
        lastTime = performance.now();
        animationId = requestAnimationFrame(animate);
      }
    }

    function stopAnimation() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    }

    const onMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;

      if (lastEventMouseX !== -2000) {
        const dx = e.clientX - lastEventMouseX;
        const dy = e.clientY - lastEventMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        // Only trigger on active movement (ignore sub-pixel idle jitter)
        if (speed > 1.2) {
          const boost = Math.min(speed / 12, 0.45);
          interactionTarget = Math.min(1.0, interactionTarget + boost + 0.15);
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
      lastEventMouseX = e.clientX;
      lastEventMouseY = e.clientY;
    };

    const onMouseLeave = () => {
      targetMouseX = -2000;
      targetMouseY = -2000;
      lastEventMouseX = -2000;
      lastEventMouseY = -2000;
      interactionTarget = 0;
    };

    const updateScroll = () => {
      scrollY = window.scrollY || 0;

      // Boost interaction on scroll as requested by user ("sirf movement p and scroll p")
      interactionTarget = Math.min(1.0, interactionTarget + 0.35);

      syncSectionVisibility();

      if (!animationId && !reducedMotion) {
        draw(frame);
      }
    };

    function handleVisibility() {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }

    const onReducedMotionChange = (e) => {
      reducedMotion = e.matches;
      if (reducedMotion) {
        stopAnimation();
        draw(0);
      } else {
        startAnimation();
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("popstate", updateScroll);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onReducedMotionChange);
    }

    resize();
    updateScroll();
    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("popstate", updateScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", onReducedMotionChange);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        transition: "opacity 0.25s ease",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
