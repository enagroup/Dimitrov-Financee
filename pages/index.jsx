import { useEffect, useRef, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyA9KvcK73x2L2LLVQ-9jHf4SuFJR5cRFic",
  authDomain: "dimitrov-finance-site-counter.firebaseapp.com",
  databaseURL:
    "https://dimitrov-finance-site-counter-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dimitrov-finance-site-counter",
  storageBucket: "dimitrov-finance-site-counter.firebasestorage.app",
  messagingSenderId: "378338381483",
  appId: "1:378338381483:web:4a755396620b1dbb3af1ee",
  measurementId: "G-F9XXKYZMRD",
};

// Инициализация на Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

function AnimatedText({ text, keyTrigger }) {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [keyTrigger]);

  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {text.split("").map((char, i) => {
        const randomDelay = (i * 0.07 + Math.random() * 0.05).toFixed(2);
        return (
          <span
            key={`${animateKey}-${i}`}
            style={{
              display: "inline-block",
              margin: char === " " ? "0 6px" : "0",
              animationName: "rotateLetter",
              animationDuration: "0.85s",
              animationTimingFunction: "ease-in-out",
              animationFillMode: "forwards",
              animationDelay: `${randomDelay}s`,
              color: "inherit",
              fontFamily: '"Times New Roman", serif',
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

export default function Home() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [lang, setLang] = useState("bg");
  const [keyTrigger, setKeyTrigger] = useState(0);
  const [visits, setVisits] = useState(null);

  const texts = {
    bg: {
      welcome: "Добре дошли в Dimitrov Finance",
      subtitle: "Вашият доверен партньор в света на финансите.",
      trust: "Доверително управление на капитали",
      contractButton: "Станете клиент – разгледайте договора",
    },
    tr: {
      welcome: "Dimitrov Finance'a Hoşgeldiniz",
      subtitle: "Finans dünyasında güvenilir ortağınız.",
      trust: "Sermaye Güvenli Yönetimi",
      contractButton: "Müşteri olun – sözleşmeyi inceleyin",
    },
    en: {
      welcome: "Welcome to Dimitrov Finance",
      subtitle: "Your trusted partner in the world of finance.",
      trust: "Confidential Capital Management",
      contractButton: "Become a client – view the contract",
    },
  };

  const contractLinks = {
    bg: "/docs/dogovor-bg.pdf",
    tr: "/docs/dogovor-tr.pdf",
    en: "/docs/dogovor-en.pdf",
  };

  // Линкове към Wikipedia
  const trustLinks = {
    bg: "https://en.wikipedia.org/wiki/Asset_management",
    tr: "https://tr.wikipedia.org/wiki/Varl%C4%B1k_y%C3%B6netimi",
    en: "https://en.wikipedia.org/wiki/Asset_management",
  };

  useEffect(() => {
    const counterRef = ref(db, "visits");
    runTransaction(counterRef, (current) => (current || 0) + 1);
    onValue(counterRef, (snapshot) => setVisits(snapshot.val()));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = true;
      audio.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
    if (!audio.muted) audio.play();
  };

  useEffect(() => {
    const langs = ["bg", "tr", "en"];
    let index = langs.indexOf(lang);
    const interval = setInterval(() => {
      index = (index + 1) % langs.length;
      setLang(langs[index]);
      setKeyTrigger((k) => k + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
        color: "white",
        background: "linear-gradient(270deg, #081116, #415158, #0c161f)",
        backgroundSize: "600% 600%",
        animation: "gradientAnimation 15s ease infinite",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <audio ref={audioRef} loop>
        <source src="/sounds/background.mp3" type="audio/mpeg" />
      </audio>

      <img
        src="/zaglavna.jpg"
        alt="Заглавна снимка"
        className="hover-image"
        style={{
          maxWidth: "100%",
          maxHeight: "50vh",
          objectFit: "contain",
          marginBottom: "20px",
        }}
      />

      <h2
        style={{
          marginBottom: "10px",
          fontSize: "clamp(18px, 3vw, 32px)",
          whiteSpace: "nowrap",
        }}
      >
        <AnimatedText text={texts[lang].welcome} keyTrigger={keyTrigger} />
      </h2>
      <p
        style={{
          fontSize: "clamp(14px, 2vw, 24px)",
          whiteSpace: "nowrap",
        }}
      >
        <AnimatedText text={texts[lang].subtitle} keyTrigger={keyTrigger} />
      </p>

      {/* Линк към Wikipedia за доверително управление */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(14px, 2vw, 22px)",
          whiteSpace: "nowrap",
          color: "white",
          fontFamily: '"Times New Roman", serif',
          pointerEvents: "auto",
          userSelect: "none",
          zIndex: 5,
        }}
      >
        <a
          href={trustLinks[lang]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <AnimatedText text={texts[lang].trust} keyTrigger={keyTrigger} />
        </a>
      </div>

      {/* Имейл и бутон за договор */}
      <div className="email-icon">
        <a
          href="mailto:dimitrov@dimitrovfinance.com"
          style={{
            display: "inline-block",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          aria-label="Email Dimitrov Finance"
        >
          <img
            src="/images/email-gold.png"
            alt="dimitrov@dimitrovfinance.com"
            style={{
              height: "100%",
              width: "auto",
              display: "block",
              borderRadius: "8px",
              position: "relative",
              zIndex: 1,
            }}
          />
        </a>
      </div>

      <button
        onClick={() => window.open(contractLinks[lang], "_blank")}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "transparent",
          border: "none",
          padding: "10px 15px",
          cursor: "pointer",
          fontFamily: "'Times New Roman', serif",
          fontSize: "clamp(16px, 2vw, 20px)",
          zIndex: 100,
          whiteSpace: "nowrap",
          color: "#d69d08",
          fontStyle: "italic",
          textShadow: "0 0 2px #000",
        }}
        aria-label="Open contract"
      >
        <AnimatedText
          text={texts[lang].contractButton}
          keyTrigger={keyTrigger}
        />
      </button>

      <button
        onClick={toggleMute}
        className="mute-button"
        aria-label={muted ? "Mute audio" : "Unmute audio"}
      >
        {muted ? "mute" : "unmute"}
      </button>

      {visits !== null && (
        <div className="visits-counter" aria-live="polite">
          {visits}
        </div>
      )}

      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .hover-image:hover {
          transform: scale(1.1);
          filter: brightness(1.1);
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .mute-button {
          position: fixed;
          right: 10px;
          bottom: 30px;
          background: transparent;
          color: white;
          border: none;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.8;
          animation: pulseBlink 2s infinite ease-in-out;
          z-index: 11;
          user-select: none;
        }
        .visits-counter {
          position: fixed;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
          opacity: 0.6;
          user-select: none;
          z-index: 10;
        }
        @keyframes pulseBlink {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        .email-icon {
          position: fixed;
          bottom: 10px;
          left: 10px;
          cursor: pointer;
          z-index: 10;
          width: clamp(30px, 2.5vw, 40px);
          height: clamp(30px, 2.5vw, 40px);
          overflow: visible;
          border-radius: 8px;
          animation: bounce 2s infinite ease-in-out;
        }
        @media (max-width: 600px) {
          .email-icon {
            bottom: 50px;
            left: 15%;
            width: clamp(40px, 6vw, 60px);
            height: clamp(40px, 6vw, 60px);
          }
        }
      `}</style>
    </div>
  );
}
