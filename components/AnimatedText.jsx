import { useEffect, useState } from "react";

export default function AnimatedText({ text, keyTrigger }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplay("");
    const interval = setInterval(() => {
      setDisplay((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text, keyTrigger]);

  return <span>{display}</span>;
}
