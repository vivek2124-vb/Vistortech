"use client";

import { useEffect, useRef } from "react";

export default function FloatingBalls() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating balls
    const ballCount = 100;
    const balls = [];

    for (let i = 0; i < ballCount; i++) {
      const ball = document.createElement("div");
      ball.className = "floating-ball";

      // Random properties
      const size = Math.random() * 8 + 4; // 4-12px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 200 - 100; // -100 to 100
      const duration = Math.random() * 20 + 15; // 15-35s
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.4 + 0.1; // 0.1-0.5

      // Random color from theme
      const colors = [
        "rgba(14, 165, 233, ", // sky-500
        "rgba(56, 189, 248, ", // sky-400
        "rgba(125, 211, 252, ", // sky-300
        "rgba(255, 255, 255, ", // white
        "rgba(20, 184, 166, ", // teal-500
        "rgba(2, 132, 199, ", // sky-600
        "rgba(3, 105, 161, ", // sky-700
        "rgba(7, 89, 133, ", // sky-800
        "rgba(12, 74, 110, ", // sky-900
        "rgba(13, 148, 136, ", // teal-600
        "rgba(15, 118, 110, ", // teal-700
        "rgba(17, 94, 89, ", // teal-800
        "rgba(19, 78, 74, ", // teal-900
        "rgba(14, 116, 144, ", // cyan-700
        "rgba(22, 78, 99, ", // cyan-900
        "rgba(30, 41, 59, ", // slate-800
        "rgba(15, 23, 42, ", // slate-900 / your brand "ink" color
        // Additional dark blue shades
        "rgba(8, 47, 73, ", // sky-950
        "rgba(12, 53, 71, ", // custom dark blue
        "rgba(10, 35, 55, ", // darker blue
        "rgba(5, 28, 48, ", // very dark blue
        "rgba(3, 20, 35, ", // near black blue
        "rgba(2, 15, 28, ", // deep navy
        "rgba(1, 10, 20, ", // midnight blue
        "rgba(0, 5, 12, ", // almost black blue
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      ball.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: ${color}${opacity});
        border-radius: 50%;
        position: absolute;
        pointer-events: none;
        filter: blur(0.5px);
        animation: float-${i} ${duration}s ease-in-out ${delay}s infinite;
        transform: translateZ(${z}px);
        will-change: transform, opacity;
      `;

      // Create unique keyframe animation for each ball
      const keyframes = `
        @keyframes float-${i} {
          0% {
            transform: translate3d(0, 0, ${z}px) scale(1);
            opacity: ${opacity};
          }
          25% {
            transform: translate3d(${Math.random() * 30 - 15}vw, ${Math.random() * 30 - 15}vh, ${z + Math.random() * 50 - 25}px) scale(${0.8 + Math.random() * 0.4});
            opacity: ${opacity * 0.7};
          }
          50% {
            transform: translate3d(${Math.random() * 40 - 20}vw, ${Math.random() * 40 - 20}vh, ${z + Math.random() * 80 - 40}px) scale(${0.6 + Math.random() * 0.6});
            opacity: ${opacity};
          }
          75% {
            transform: translate3d(${Math.random() * 30 - 15}vw, ${Math.random() * 30 - 15}vh, ${z + Math.random() * 50 - 25}px) scale(${0.8 + Math.random() * 0.4});
            opacity: ${opacity * 0.7};
          }
          100% {
            transform: translate3d(0, 0, ${z}px) scale(1);
            opacity: ${opacity};
          }
        }
      `;

      // Inject keyframes
      const styleSheet = document.createElement("style");
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);
      balls.push({ element: ball, styleSheet });

      container.appendChild(ball);
    }

    // Cleanup
    return () => {
      balls.forEach(({ element, styleSheet }) => {
        element.remove();
        styleSheet.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
