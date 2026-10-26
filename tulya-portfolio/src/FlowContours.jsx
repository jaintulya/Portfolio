import { useEffect, useRef } from "react";

export default function FlowContours() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let frame = 0;
    let lastTime = 0;
    let animationId = 0;
    let scrollY = window.scrollY || 0;
    let targetMouseX = -2000;
    let targetMouseY = -2000;
    let mouseX = -2000;
    let mouseY = -2000;

    function animate(now) {
      const delta = lastTime ? Math.min(now - lastTime, 40) : 16;
      frame += delta;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      draw(frame);
      lastTime = now;
      animationId = requestAnimationFrame(animate);
    }
    lastTime = performance.now();
    animationId = requestAnimationFrame(animate);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize, { passive: true });
    const updateScroll = () => { scrollY = window.scrollY || 0; };
    window.addEventListener("scroll", updateScroll, { passive: true });
    const onMouseMove = (e) => { targetMouseX = e.clientX; targetMouseY = e.clientY; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    resize();

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const isMobile = width < 768;
      const lineStep = isMobile ? 5 : 4;
      const lineSpacing = isMobile ? 16 : 18;
      const amp = isMobile ? 26 : 36;
      const numLines = Math.ceil(height / lineSpacing) + 6;

      for (let i = -3; i < numLines; i++) {
        const scrollShift = scrollY * 0.20;
      const offsetMod = ((scrollShift % lineSpacing) + lineSpacing) % lineSpacing;
      const lineBaseIndex = Math.floor(scrollShift / lineSpacing);
      const baseY = i * lineSpacing - offsetMod;
        const globalIndex = i + lineBaseIndex;
        const isHighlight = Math.abs(globalIndex) % settings.highlightEvery === 3;
        const alpha = isHighlight ? settings.highlightOpacity : settings.baseOpacity;

        ctx.beginPath();
        let first = true;
        for (let x = -24; x <= width + 24; x += lineStep) {
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

    function contourY(x, i, time, baseY, amp) {
      const nx = x / Math.max(width, 1);
      const slow = time * settings.speed;

      const broadFlow = Math.sin(nx * 4.0 + slow * 1.1 + i * 0.19) * amp;
      const fineFlow = Math.sin(nx * 8.5 - slow * 0.75 + i * 0.13) * (amp * 0.32);
      const longCurve = Math.cos(nx * 1.9 + slow * 0.52 + i * 0.10) * (amp * 0.75);
      const travellingBend = Math.sin(slow * 0.9 + i * 0.11 + nx * 2.7) * (amp * 0.45);

      return baseY + broadFlow + fineFlow + longCurve + travellingBend;
    }

    const settings = {
      baseOpacity: 0.058,
      highlightOpacity: 0.095,
      speed: 0.00028,
      highlightEvery: 7,
      gold: "214, 181, 109",
      goldLight: "242, 221, 166",
    };
      return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationId) cancelAnimationFrame(animationId);
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
