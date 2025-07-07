// const OpenAI = require("openai");
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// 1. Generate Questions
exports.generateQuestions = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    role,
    level,
    interviewType,
    language,
    numberOfQuestions = 5,
  } = req.body;

  try {
    const prompt = `
You are an expert interview question generator.

Generate ${numberOfQuestions} ${interviewType} interview questions for a ${level} level ${role} in ${language}.

Return each question in the following JSON format:
[
  {
    "question": "Question text",
    "difficulty": "Easy | Medium | Hard",
    "topics": ["Topic1", "Topic2"],
    "expectedAnswerSummary": "Short answer summary",
    "type": "${interviewType}"
  }
]

Only return valid JSON. No explanation or extra text.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
    });
    console.log(response.text);

    const text = response.text.trim();
    const cleanText = text.startsWith("```")
      ? text.replace(/```json|```/g, "").trim()
      : text;

    const questions = JSON.parse(cleanText); // be ready to wrap in try-catch
    return res.status(200).json({ questions });
  } catch (error) {
    console.error("Question generation error:", error);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
};

// 2. Evaluate Answer
exports.evaluateAnswer = async (req, res) => {
  const { question, userAnswer, role, level, interviewType, language } =
    req.body;

  if (
    !question ||
    !userAnswer ||
    !role ||
    !level ||
    !interviewType ||
    !language
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `
You are a professional interviewer.

Evaluate the following interview answer:
- Question: ${question}
- Candidate's Answer: ${userAnswer}
- Role: ${role}
- Level: ${level}
- Interview Type: ${interviewType}
- Language: ${language}

Give the result in the following valid JSON format:
{
  "score": X,                      // Number from 1 to 10
  "feedback": "Short feedback",   // 1–3 sentences
  "suggestion": "Improvement tip" // 1–2 sentences
}

Only return valid JSON. No explanation or markdown.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${prompt}`,
    });
    let text = response.text.trim();

    // If Gemini returns the JSON inside code blocks (```json ... ```), strip it
    const cleanText = text.startsWith("```")
      ? text.replace(/```json|```/g, "").trim()
      : text;

    const evaluation = JSON.parse(cleanText);
    return res.status(200).json(evaluation);
  } catch (error) {
    console.error("Gemini Evaluation Error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to evaluate answer with Gemini" });
  }
};
