function AnimatedText({ text, keyTrigger }) {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [keyTrigger]);

  // Разделяме текста на думи (спейс по подразбиране)
  const words = text.split(" ");

  return (
    <span style={{ display: "inline-block", fontFamily: '"Times New Roman", serif' }}>
      {words.map((word, wIndex) => {
        return (
          <span
            key={`word-${animateKey}-${wIndex}`}
            style={{ display: "inline-block", marginRight: wIndex === words.length - 1 ? 0 : "0.25em" }} // малко разстояние между думите
          >
            {word.split("").map((char, i) => {
              const randomDelay = (i * 0.07 + Math.random() * 0.05).toFixed(2);

              return (
                <span
                  key={`${animateKey}-${wIndex}-${i}`}
                  style={{
                    display: "inline-block",
                    margin: "0", // няма разстояние между буквите
                    backfaceVisibility: "hidden",
                    transformOrigin: "50% 50%",
                    animationName: "rotateLetter",
                    animationDuration: "0.85s",
                    animationTimingFunction: "ease-in-out",
                    animationFillMode: "forwards",
                    animationDelay: `${randomDelay}s`,
                    color: "white",
                    fontFamily: '"Times New Roman", serif',
                    letterSpacing: "normal",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}

      <style jsx>{`
        @keyframes rotateLetter {
          0% {
            transform: rotateX(0deg) scale(1);
            opacity: 1;
            color: white;
            text-shadow: none;
          }
          50% {
            transform: rotateX(90deg) scale(0.8);
            opacity: 0.6;
            color: white;
            text-shadow: none;
          }
          100% {
            transform: rotateX(0deg) scale(1);
            opacity: 1;
            color: white;
            text-shadow: none;
          }
        }
      `}</style>
    </span>
  );
}
