import  { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHidden, setIsHidden] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const enterHandler = () => setIsHidden(false);
    const leaveHandler = () => setIsHidden(true);
    const downHandler = () => setIsClicked(true);
    const upHandler = () => setIsClicked(false);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseenter", enterHandler);
    window.addEventListener("mouseleave", leaveHandler);
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mouseup", upHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseenter", enterHandler);
      window.removeEventListener("mouseleave", leaveHandler);
      window.removeEventListener("mousedown", downHandler);
      window.removeEventListener("mouseup", upHandler);
    };
  }, []);

  const size = isClicked ? 26 : 32;

  return (
    <>
      {/* Outer glow */}
      <div
        style={{
          position: "fixed",
          left: position.x - size,
          top: position.y - size,
          width: size * 2,
          height: size * 2,
          borderRadius: "9999px",
          pointerEvents: "none",
          opacity: isHidden ? 0 : 0.45,
          transform: "translateZ(0)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(175,120,255,0.95), rgba(10,5,30,0.1))",
          boxShadow:
            "0 0 40px rgba(175,120,255,0.85), 0 0 80px rgba(135,85,255,0.55)",
          mixBlendMode: "screen",
          transition:
            "opacity 0.15s ease-out, width 0.12s ease-out, height 0.12s ease-out",
          zIndex: 60,
        }}
      />

      {/* Inner ring */}
      <div
        style={{
          position: "fixed",
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          borderRadius: "9999px",
          pointerEvents: "none",
          opacity: isHidden ? 0 : 1,
          border: "1px solid rgba(255,255,255,0.8)",
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), rgba(90,60,180,0.2))",
          boxShadow: "0 0 18px rgba(175,120,255,0.85)",
          mixBlendMode: "screen",
          transform: isClicked ? "scale(0.85)" : "scale(1)",
          transition: "transform 0.08s ease-out, opacity 0.15s ease-out",
          zIndex: 61,
        }}
      />
    </>
  );
};

export default CustomCursor;
