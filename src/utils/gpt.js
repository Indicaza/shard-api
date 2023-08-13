const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Sanitization function to remove control characters
function sanitizeJSONString(str) {
	return str.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
}

async function generateNPC() {
	try {
		// Define the prompt for the model
		const messages = [
			{
				role: "user",
				content:
					"Please generate a detailed Dungeons & Dragons (D&D) Non-Player Character (NPC) for me. The output should be in JSON format (respond with only a JSON object nothing else) and include the following attributes: name, race, class, age, gender, personality, and a brief backstory. Ensure that the age is appropriate for the race, and the personality and backstory are consistent with the class and race of the character.",
			},
		];

		// Axios POST request
		const response = await axios.post(
			OPENAI_API_URL,
			{
				messages: messages,
				model: "gpt-3.5-turbo",
			},
			{
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);

		// Extracting the assistant's reply from the response
		const assistantReply = response.data.choices[0].message.content;
		const sanitizedResponse = sanitizeJSONString(assistantReply);
		const npcData = JSON.parse(sanitizedResponse);

		console.log("GPT-3 Response:", npcData);

		return npcData;
	} catch (error) {
		console.error("Error making API call:", error.response.data);
	}
}

module.exports = {
	generateNPC,
};
