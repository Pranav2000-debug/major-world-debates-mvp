const Topic = require("../models/Topic");
const axios = require("axios");

// POST: Generate a new debate topic
const generateTopic = async (req, res) => {
  try {
    // Step 1: Fetch news from GNews
    let headline = "";
    let articleUrl = "";
    let articleText = "";

    try {
      const newsResponse = await axios.get("https://gnews.io/api/v4/top-headlines", {
        params: {
          token: process.env.GNEWS_API_KEY,
          topic: "education",
          lang: "en",
          max: 20,
        },
      });

      const articles = newsResponse.data.articles;
      if (articles && articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        headline = article.title;
        articleUrl = article.url;
        articleText = article.content || article.description || headline;
      }
    } catch (err) {
      console.warn("GNews fetch failed, using fallback prompt.");
      headline = "Should schools replace textbooks with digital tablets?";
      articleText = headline;
    }

    // Step 2: Truncate article to avoid too long prompts
    const truncatedArticle = articleText.substring(0, 1000); // first 1000 chars

    // Step 3: Prepare prompt for Gemini
    const prompt = `
Read this article: "${truncatedArticle}"

Generate a debate topic in the field of EDUCATION.
Return ONLY valid JSON in this structure:
{
  "title": "string",
  "summary": "string (3-4 sentences)",
  "pros": "string (at least 2 points)",
  "cons": "string (at least 2 points)"
}
`;

    // Step 4: Call Gemini API
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json", "X-goog-api-key": process.env.GEMINI_API_KEY } }
    );

    // DEBUG: log full Gemini response
    console.log("Gemini raw response:", JSON.stringify(geminiResponse.data, null, 2));

    // Step 5: Extract content safely (handle both object and array formats)
    const candidates = geminiResponse.data?.candidates;
    if (!candidates || candidates.length === 0) {
      return res.status(500).json({ error: "No candidates returned from Gemini" });
    }

    const candidate = candidates[0];
    let contentObj = candidate.content;
    let contentText = "";

    if (Array.isArray(contentObj)) {
      contentText = contentObj[0]?.text?.trim();
    } else if (contentObj?.parts && contentObj.parts.length > 0) {
      contentText = contentObj.parts[0].text?.trim();
    }

    if (!contentText) {
      return res.status(500).json({ error: "No text returned from Gemini", raw: candidate });
    }

    // Step 6: CLEAN code block (```json ... ```) if present
    contentText = contentText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

    // Step 7: Parse JSON safely
    let jsonOutput;
    try {
      jsonOutput = JSON.parse(contentText);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON from Gemini after cleaning", raw: contentText });
    }

    // Step 8: Save to DB
    const newTopic = new Topic({
      ...jsonOutput,
      url: articleUrl,
      fullArticle: articleText,
    });

    await newTopic.save();
    res.json(newTopic);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Fetch all topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { generateTopic, getTopics };