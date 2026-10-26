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

    function contourY(x, i, time, baseY, amp) {
      const nx = x / Math.max(width, 1);
      const slow = time * 0.0005;

      const broadFlow = Math.sin(nx * 4.0 + slow * 1.1 + i * 0.19) * amp;
      const fineFlow = Math.sin(nx * 8.5 - slow * 0.75 + i * 0.13) * (amp * 0.32);
      const longCurve = Math.cos(nx * 1.9 + slow * 0.52 + i * 0.10) * (amp * 0.75);
      const travellingBend = Math.sin(slow * 0.9 + i * 0.11 + nx * 2.7) * (amp * 0.45);

      return baseY + broadFlow + fineFlow + longCurve + travellingBend;
    }

    const settings = {
      baseOpacity: 0.058,
      highlightOpacity: 0.095,
      speed: 0.00075,
      highlightEvery: 7,
      gold: "214, 181, 109",
      goldLight: "242, 221, 166",
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
