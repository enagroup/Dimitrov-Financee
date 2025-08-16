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
  storageBucket: "dimitrov-finance-site-counter.appspot.com",
  messagingSenderId: "378338381483",
  appId: "1:378338381483:web:4a755396620b1dbb3af1ee",
  measurementId: "G-F9XXKYZMRD",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

function AnimatedText({ text, keyTrigger }) {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [keyTrigger]);

  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {text.split("").map((char, i) => (
        <span
          key={`${animateKey}-${i}`}
          style={{
            display: "inline-block",
            margin: char === " " ? "0 6px" : "0",
            animationName: "rotateLetter",
            animationDuration: "0.85s",
            animationTimingFunction: "ease-in-out",
            animationFillMode: "forwards",
            animationDelay: `${(i * 0.07 + Math.random() * 0.05).toFixed(2)}s`,
            color: "inherit",
            fontFamily: '"Times New Roman", serif',
          }}
        >
          {char}
        </span>
      ))}
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

  const wikiLinks = {
    bg: "https://en.wikipedia.org/wiki/Asset_management",
    tr: "https://tr.wikipedia.org/wiki/Varl%C4%B1k_y%C3%B6netimi",
    en: "https://en.wikipedia.org/wiki/Asset_management",
  };

  // Firebase брояч
  useEffect(() => {
    const counterRef = ref(db, "visits");
    runTransaction(counterRef, (current) => (current || 0) + 1).catch((err) =>
      console.error("Counter update failed:", err)
    );
    onValue(counterRef, (snapshot) => setVisits(snapshot.val()));
  }, []);

  // Инициализация на аудио
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

  // Смяна на език автоматично
  useEffect(() => {
    const langs = ["bg", "tr", "en"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % langs.length;
      setLang(langs[index]);
      setKeyTrigger((k) => k + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleWikiClick = () => {
    window.open(wikiLinks[lang], "_blank");
  };

  return (
    <div className="main-container">
      <audio ref={audioRef} loop>
        <source src="/sounds/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Бутон „Станете клиент“ */}
      <button
        onClick={() => window.open(contractLinks[lang], "_blank")}
        className="contract-button"
      >
        <AnimatedText text={texts[lang].contractButton} keyTrigger={keyTrigger} />
      </button>

      {/* Изображение */}
      <img src="/zaglavna.jpg" alt="Заглавна снимка" className="main-image" />

      {/* Текстове с линк към Wikipedia */}
      <h2 onClick={handleWikiClick} style={{ cursor: "pointer" }}>
        <AnimatedText text={texts[lang].welcome} keyTrigger={keyTrigger} />
      </h2>
      <p onClick={handleWikiClick} style={{ cursor: "pointer" }}>
        <AnimatedText text={texts[lang].subtitle} keyTrigger={keyTrigger} />
      </p>

      {/* Доверие с линк към Wikipedia */}
      <div className="trust-text">
        <a
          href={wikiLinks[lang]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatedText text={texts[lang].trust} keyTrigger={keyTrigger} />
        </a>
      </div>

      {/* Мейл бутон */}
      <div className="email-button">
        <a href="mailto:dimitrov@dimitrovfinance.com" aria-label="Email Dimitrov Finance">
          <img src="/images/email-gold.png" alt="Email" />
        </a>
      </div>

      {/* Бутон mute/unmute */}
      <button className="mute-button" onClick={toggleMute}>
        {muted ? "unmute" : "mute"}
      </button>

      {/* Брояч */}
      <div className="counter">{visits ?? "..."}</div>

      <style jsx>{`
        .main-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          color: white;
          background: linear-gradient(270deg, #081116, #415158, #0c161f);
          background-size: 600% 600%;
          animation: gradientAnimation 15s ease infinite;
          font-family: "Times New Roman", serif;
          overflow: hidden;
          position: relative;
        }

        .main-image {
          width: auto;
          height: 50vh;
          max-width: 90%;
          object-fit: contain;
          margin-bottom: 20px;
          pointer-events: none;
          user-select: none;
          z-index: 1;
        }

        h2 {
          margin-bottom: 10px;
          font-size: 32px;
          white-space: nowrap;
          z-index: 2;
        }

        p {
          font-size: 24px;
          white-space: nowrap;
          z-index: 2;
        }

        .contract-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-family: "Times New Roman", serif;
          font-size: 20px;
          z-index: 100;
          color: #d69d08; /* оригинален златен цвят */
          font-style: italic;
          text-shadow: 0 0 2px #000;
        }

        .trust-text {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  white-space: nowrap;
  pointer-events: auto;
  z-index: 5;
  color: #ffffff; /* белият цвят за доверително управление */
}

.trust-text a {
  text-decoration: underline;
  color: inherit;
}

        .email-button {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
        }

        .email-button img {
          height: 40px;
          width: auto;
          border-radius: 8px;
          animation: bounceEmail 2s infinite;
        }

        @media (min-width: 769px) {
          .email-button {
            left: 20px;
            transform: none;
          }
        }

        @keyframes bounceEmail {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .mute-button {
          position: fixed;
          bottom: 40px;
          right: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 100;
          animation: pulseMute 2s infinite;
          text-transform: lowercase;
        }

        @keyframes pulseMute {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }

        .counter {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          z-index: 100;
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
          .trust-text { bottom: 70px; font-size: 18px; }
          .email-button img { height: 35px; }
          .mute-button, .counter { font-size: 12px; }
          h2 { font-size: 26px; }
          p { font-size: 18px; }
        }
      `}</style>
    </div>
  );
}
