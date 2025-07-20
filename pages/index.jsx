// pages/index.jsx
import React from "react";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dimitrov Finance</title>
        <meta name="description" content="Финансово консултиране, инвестиции и управление на капитали." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#222" }}>
          Добре дошли в <span style={{ color: "gold", textShadow: "1px 1px 2px black" }}>DimitrovFinance</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Вашият доверен партньор в инвестициите, финансовото планиране и стабилността.
        </p>
      </main>
    </>
  );
}