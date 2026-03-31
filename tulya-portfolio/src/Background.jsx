import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    const PR = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, animId;
    let mx, my, tmx, tmy, t = 0;

    const N_RINGS = 9;
    const rings = Array.from({ length: N_RINGS }, (_, i) => ({
      phase: i * ((Math.PI * 2) / N_RINGS),
      speed: 0.00022 + i * 0.000035,
      baseR: 55 + i * 42,
      segments: 32 + i * 8,
      isGold: i % 3 === 1,
      drift: Math.random() * Math.PI * 2,
    }));

    const N_ARC = 120;
    let arcs = [];

    function buildArcs() {
      arcs = Array.from({ length: N_ARC }, () => ({
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.0012,
        r: 40 + Math.random() * Math.max(W, H) * 0.55,
        alpha: 0.015 + Math.random() * 0.055,
        gold: Math.random() < 0.14,
        len: 0.04 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      const rect = cv.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cv.width = W * PR;
      cv.height = H * PR;
      cx.setTransform(PR, 0, 0, PR, 0, 0);
      mx = W / 2; my = H / 2;
      tmx = W / 2; tmy = H / 2;
      buildArcs();
    }

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      const rect = cv.getBoundingClientRect();
      tmx = e.clientX - rect.left;
      tmy = e.clientY - rect.top;
    };

    const onTouchMove = (e) => {
      const rect = cv.getBoundingClientRect();
      tmx = e.touches[0].clientX - rect.left;
      tmy = e.touches[0].clientY - rect.top;
    };

    window.addEventListener("mousemove", onMouseMove);
    cv.addEventListener("touchmove", onTouchMove, { passive: true });

    function frame() {
      animId = requestAnimationFrame(frame);
      t += 1;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      cx.fillStyle = "rgba(13,12,10,0.22)";
      cx.fillRect(0, 0, W, H);

      const cx0 = W / 2, cy0 = H / 2;
      const mdx = mx - cx0, mdy = my - cy0;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      const mNorm = Math.min(mdist / Math.max(W, H) * 2, 1);

      arcs.forEach((a) => {
        a.angle += a.speed * (1 + mNorm * 0.4);
        const breath = 1 + Math.sin(t * 0.008 + a.phase) * 0.06;
        const r2 = a.r * breath;
        const ax = cx0 + mdx * 0.08;
        const ay = cy0 + mdy * 0.08;
        const startA = a.angle;
        const endA = a.angle + a.len * Math.PI * 2;
        cx.beginPath();
        cx.arc(ax, ay, r2, startA, endA);
        const alphaVal = a.alpha * (1 + mNorm * (a.gold ? 1.2 : 0.5));
        cx.strokeStyle = a.gold
          ? `rgba(201,168,76,${alphaVal})`
          : `rgba(240,236,227,${alphaVal})`;
        cx.lineWidth = a.gold ? 0.8 : 0.4;
        cx.stroke();
      });

      rings.forEach((ring) => {
        const breath = 1 + Math.sin(t * ring.speed * 60 * 0.8 + ring.phase) * 0.045;
        const R = ring.baseR * breath;
        const ocx = cx0 + Math.cos(ring.drift + t * 0.004) * mdx * 0.12;
        const ocy = cy0 + Math.sin(ring.drift + t * 0.005) * mdy * 0.12;
        const prox = Math.max(0, 1 - Math.abs(mdist - R) / (R * 0.6));
        const segs = ring.segments;

        for (let s = 0; s < segs; s++) {
          const a1 = ((s / segs) + t * ring.speed) * Math.PI * 2 + ring.phase;
          const a2 = a1 + (1 / segs) * Math.PI * 2 * 0.72;
          const warp = Math.sin(a1 * 3 + t * 0.02 + ring.phase) * 14 * mNorm;
          const r2 = R + warp;
          cx.beginPath();
          cx.arc(ocx, ocy, r2, a1, a2);
          const alpha = ring.isGold
            ? (0.08 + prox * 0.55 + mNorm * 0.15)
            : (0.04 + prox * 0.22 + mNorm * 0.08);
          cx.strokeStyle = ring.isGold
            ? `rgba(201,168,76,${alpha})`
            : `rgba(240,236,227,${alpha})`;
          cx.lineWidth = ring.isGold
            ? (0.9 + prox * 1.1)
            : (0.45 + prox * 0.5);
          cx.stroke();
        }
      });
    }

    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cv.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
