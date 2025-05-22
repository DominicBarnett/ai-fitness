const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate-workout', async (req, res) => {
  const { profile } = req.body;

  const prompt = `Generate a workout routine for this profile:
    Name: ${profile.name}
    Age: ${profile.age}
    Height: ${profile.height} cm
    Weight: ${profile.weight} kg
    Fitness Goal: ${profile.fitnessGoal}
    Experience Level: ${profile.experienceLevel}
    Available Equipment: ${profile.equipment.join(', ')}
    Preferred Workout Days: ${profile.preferredWorkoutDays.join(', ')}`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.json({ workout: completion.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Failed to generate workout' });
  }
});

module.exports = router; 