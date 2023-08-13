"use strict";
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
async function generateNPC() {
    const prompt = "Generate a D&D NPC with name, race, class, age, gender, personality, and backstory. I'm putting this information in a database.  Make sure to only list off your response with the prompt and response.  For example (Race: Elf). Also if asked for a number be sure to respond with an integer not a word (1 not one).";
    const response = await axios.post(OPENAI_API_URL, {
        prompt: prompt,
        max_tokens: 150,
    }, {
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return response.data.choices[0].text.trim();
}
module.exports = {
    generateNPC,
};
