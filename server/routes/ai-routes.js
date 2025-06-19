const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace with your free OpenRouter API key
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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";

router.post('/suggest', async (req, res) => {
  const { thought } = req.body;

  if (!thought) {
    return res.status(400).json({ error: 'Thought is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "mistralai/mistral-7b-instruct", 
        messages: [
          { role: "system", content: "You are a helpful, motivating AI assistant." },
          { role: "user", content: `Give a short motivational suggestion based on this thought: "${thought}"` }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.choices?.[0]?.message?.content || 'No suggestion received';
    res.json({ suggestion: aiMessage });

  } catch (error) {
    console.error('AI API Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI suggestion.' });
  }
});

module.exports = router;
