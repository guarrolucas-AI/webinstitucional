"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    const speed = 0.2; // velocidad del seguimiento

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const followMouse = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(followMouse);
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(followMouse);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        width: "15px",
        height: "15px",
        position: "fixed",
        top: 0,
        left: 0,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        background: `radial-gradient(
  circle at 80% 150%,
  #fdfd57,
  #ffa500,
  #ff4500,
  #c84040,
  #4466aa)`,
        mixBlendMode: "exclusion",
        transition: "transform 0.2s ease",
      }}
    />
  );
}
