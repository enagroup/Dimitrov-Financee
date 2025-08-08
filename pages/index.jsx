import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, increment, runTransaction } from "firebase/database";

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyA9KvcK73x2L2LLVQ-9jHf4SuFJR5cRFic",
  authDomain: "dimitrov-finance-site-counter.firebaseapp.com",
  databaseURL: "https://dimitrov-finance-site-counter-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dimitrov-finance-site-counter",
  storageBucket: "dimitrov-finance-site-counter.firebasestorage.app",
  messagingSenderId: "378338381483",
  appId: "1:378338381483:web:4a755396620b1dbb3af1ee",
  measurementId: "G-F9XXKYZMRD"
};

// Инициализация на Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function AnimatedText({ text, keyTrigger }) {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [keyTrigger]);

  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => {
        const randomDelay = (i * 0.07 + Math.random() * 0.05).toFixed(2);

        return (
          <span
            key={`${animateKey}-${i}`}
            style={{
              display: "inline-block",
              margin: char === " " ? "0 6px" : "0 0",
              backfaceVisibility: "hidden",
              transformOrigin: "50% 50%",
              animationName: "rotateLetter",
              animationDuration: "0.85s",
              animationTimingFunction: "ease-in-out",
              animationFillMode: "forwards",
              animationDelay: `${randomDelay}s`,
              color: "white",
              fontFamily: '"Times New Roman", serif',
              letterSpacing: "0",
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
            color: white;
          }
          50% {
            transform: rotateX(90deg) scale(0.8);
            opacity: 0.6;
            color: white;
          }
          100% {
            transform: rotateX(0deg) scale(1);
            opacity: 1;
            color: white;
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
    bg: { welcome: "Добре дошли в Dimitrov Finance", subtitle: "Вашият доверен партньор в света на финансите." },
    tr: { welcome: "Dimitrov Finance'a Hoşgeldiniz", subtitle: "Finans dünyasında güvenilir ortağınız." },
    en: { welcome: "Welcome to Dimitrov Finance", subtitle: "Your trusted partner in the world of finance." },
  };

  // Брояч на посетители
  useEffect(() => {
    const counterRef = ref(db, "visits");
    runTransaction(counterRef, (current) => (current || 0) + 1);
    onValue(counterRef, (snapshot) => {
      setVisits(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = true;
      audio.play().catch((e) => console.warn("Автоматичното пускане е блокирано:", e));
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.play();
    } else {
      audio.muted = true;
    }
    setMuted(!muted);
  };

  // Автоматична смяна на езика
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
        minHeight: "100vh",
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
        position: "relative",
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
          transition: "transform 0.3s ease",
        }}
      />

      <h2 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
        <AnimatedText text={texts[lang].welcome} keyTrigger={keyTrigger} />
      </h2>
      <p style={{ fontSize: "1.2rem" }}>
        <AnimatedText text={texts[lang].subtitle} keyTrigger={keyTrigger} />
      </p>

      <button onClick={toggleMute} className="mute-button">
        {muted ? "mute" : "unmute"}
      </button>

      {/* Малка цифра за брояч */}
      {visits !== null && (
        <div style={{ position: "fixed", bottom: "10px", right: "10px", fontSize: "12px", opacity: 0.6 }}>
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
        .hover-image:hover {
          transform: scale(1.1);
          filter: brightness(1.1);
          cursor: pointer;
        }
        .mute-button {
          position: fixed;
          bottom: 20px;
          right: 40px;
          background: transparent;
          color: white;
          border: none;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.8;
          animation: pulseBlink 2s infinite ease-in-out;
        }
        @keyframes pulseBlink {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
