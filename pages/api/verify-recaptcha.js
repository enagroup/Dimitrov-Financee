// API за reCAPTCHA
export default async function handler(req, res) {
  res.status(200).json({ success: true, score: 0.9 }); // Пример
}
