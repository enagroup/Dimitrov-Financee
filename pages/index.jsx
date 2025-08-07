export default function Home() {
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
        background: "linear-gradient(-45deg, #081116, #415158, #0c161f, #1f2a33)",
        backgroundSize: "400% 400%",
        animation: "gradientFlow 20s ease infinite",
      }}
    >
      <img
        src="/zaglavna.jpg"
        alt="Заглавна снимка"
        className="hover-image"
        style={{
          maxWidth: "100%",
          maxHeight: "50vh",
          objectFit: "contain",
          marginBottom: "20px",
          transition: "transform 0.5s ease, filter 0.5s ease",
        }}
      />
      <h2 className="hover-text" style={{ marginBottom: "10px", transition: "color 0.3s ease" }}>
        Добре дошли в Dimitrov Finance
      </h2>
      <p className="hover-text" style={{ transition: "color 0.3s ease" }}>
        Вашият доверен партньор в света на финансите.
      </p>

      <style jsx>{`
        @keyframes gradientFlow {
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
          filter: brightness(1.2);
          cursor: pointer;
        }

        .hover-text:hover {
          color: #a0c4ff;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
