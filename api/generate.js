export default async function handler(req, res) {
  const { client, offer } = req.body;

  const prompt = `Ты — профессиональный менеджер по закупкам. Клиент хочет: "${client}". Оффер от поставщика: "${offer}". Сгенерируй грамотный деловой ответ с уточняющими вопросами.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();
    const message = data.choices?.[0]?.message?.content;

    res.status(200).json({ result: message });
  } catch (err) {
    res.status(500).json({ result: "Ошибка OpenAI API" });
  }
}
