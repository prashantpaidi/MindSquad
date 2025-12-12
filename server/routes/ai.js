const router = require('express').Router();
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const auth = require('../middleware/auth');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate', auth, async (req, res) => {
    try {
        const { input, mode, count = 10, difficulty = 'medium' } = req.body;

        if (!input) {
            return res.status(400).json({ message: 'Input is required' });
        }

        let prompt = '';

        // Dynamic instruction based on count selection
        const countInstruction = count === 'auto'
            ? 'Create a comprehensive set of flashcards (automatically determine the count between 5 and 30 based on the content density)'
            : `Create ${count} study flashcards`;

        if (mode === 'topic') {
            prompt = `
            ${countInstruction} about "${input}".
            The difficulty level should be ${difficulty}.
            The "front" should be a question or term.
            The "back" should be the answer or definition.
            Keep answers concise but informative (under 30 words if possible).
            `;
        } else {
            prompt = `
            Analyze the following text and ${countInstruction} based on the key concepts found within it.
            
            TEXT CONTENT:
            "${input}"
            
            INSTRUCTIONS:
            The difficulty level should be ${difficulty}.
            The "front" should be a question, term, or concept found in the text.
            The "back" should be the answer or definition derived directly from the text.
            Keep answers concise but informative (under 30 words if possible).
            Do not hallucinate information not present in the text if possible.
            `;
        }

        // 1. Get model instance
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        // 2. Define Schema (Direct JSON Object)
        const schema = {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    front: { type: SchemaType.STRING },
                    back: { type: SchemaType.STRING },
                },
                required: ['front', 'back'],
            },
        };

        // 3. Generate Content
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });

        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error("No response from Gemini");
        }

        const data = JSON.parse(text);
        res.json(data);

    } catch (error) {
        console.error("Error generating flashcards:", error);
        res.status(500).json({ message: 'Error generating flashcards', error: error.message });
    }
});

module.exports = router;
