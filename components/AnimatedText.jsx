import React, { useEffect, useState } from "react";

function AnimatedText({ text, keyTrigger, fontFamily, fontSize }) {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey(k => k + 1);
  }, [keyTrigger]);

  return (
    <span
      style={{ 
        display: "inline-block", 
        whiteSpace: "nowrap", 
        fontFamily, 
        fontSize,
        color: "inherit"
      }}
      aria-label={text}
    >
      {text.split("").map((char, i) => {
        const delay = (i * 0.07 + Math.random() * 0.05).toFixed(2);
        return (
          <span
            key={`${animateKey}-${i}`}
            style={{
              display: "inline-block",
              margin: char === " " ? "0 6px" : undefined,
              animationName: "rotateLetter",
              animationDuration: "0.85s",
              animationTimingFunction: "ease-in-out",
              animationFillMode: "forwards",
              animationDelay: `${delay}s`,
            }}
          >
            {char}
          </span>
        );
      })}
      <style jsx>{`
        @keyframes rotateLetter {
          0% {
            transform: rotateX(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotateX(90deg) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: rotateX(0deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}

export default AnimatedText;
