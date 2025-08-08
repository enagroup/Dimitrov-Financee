import { useEffect, useRef, useState } from "react";

export default function AudioToggle() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0;
      audio.muted = true;
      audio.play().catch((e) => {
        console.warn("Автоматичното пускане е блокирано:", e);
      });
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      fadeVolume(audio, 0.3); // плавно усилване
    } else {
      fadeVolume(audio, 0); // плавно заглушаване
      setTimeout(() => (audio.muted = true), 1000);
    }

    setMuted(!muted);
  };

  const fadeVolume = (audio, targetVolume) => {
    const step = 0.05;
    const interval = setInterval(() => {
      const diff = targetVolume - audio.volume;
      if (Math.abs(diff) < step) {
        audio.volume = targetVolume;
        clearInterval(interval);
      } else {
        audio.volume += diff > 0 ? step : -step;
      }
    }, 100);
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/background.mp3" />

      <button className="audio-toggle" onClick={toggleMute}>
        <img
          src={muted ? "/icons/volume-off.svg" : "/icons/volume-on.svg"}
          alt={muted ? "Включи звук" : "Заглуши"}
        />
      </button>

      <style jsx>{`
        .audio-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          animation: pulse 2s infinite;
        }

        .audio-toggle img {
          width: 32px;
          height: 32px;
          filter: brightness(0.8);
          transition: transform 0.3s ease;
        }

        .audio-toggle:hover img {
          transform: scale(1.2);
          filter: brightness(1);
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
