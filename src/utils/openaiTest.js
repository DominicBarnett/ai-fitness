const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test!" }],
      model: "gpt-3.5-turbo",
    });

    console.log('OpenAI API Test Response:', completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error testing OpenAI API:', error);
    throw error;
  }
}

// Run the test
testOpenAI()
  .then(() => console.log('Test completed successfully'))
  .catch(error => console.error('Test failed:', error)); 