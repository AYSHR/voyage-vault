require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');


const app = express();
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.use(express.json());
app.use(cors());

app.post('/api/plan', async (req, res) => {
    try{
        const { destinations, days } = req.body;
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `Create a travel itinerary for ${days} days in the following destinations:
         ${destinations.join(', ')}. Include key attractions, activities, and dining options. Return as a JSON
          array of strings.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // we will parse JSON from the response text
        const itinerary = JSON.parse(text);
        console.log(itinerary);
        res.json({ itinerary });
    } catch(err) {
        res.status(500).json({ error: 'Failed to generate travel plan:' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
