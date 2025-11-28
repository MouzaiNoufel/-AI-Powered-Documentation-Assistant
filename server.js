import express from "express";
import cors from "cors";
import { Anthropic } from "@anthropic-ai/sdk";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

app.post("/api/generate", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 200,
      temperature: 0.2,
      messages: [
        { role: "user", content: question }
      ]
    });

    const answer = response.content[0].text;
    res.json({ answer });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "AI request failed." });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
