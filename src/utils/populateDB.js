const { insertNPC } = require("../db/models/npc");
const { generateNPC } = require("./gpt");

function parseNPCData(rawData) {
	let data;

	// Check if rawData is already a JSON object
	if (typeof rawData === "object") {
		data = rawData;
	} else {
		// Attempt to extract JSON from the string
		const jsonMatch = rawData.match(/{[\s\S]*}/);
		if (jsonMatch) {
			data = JSON.parse(jsonMatch[0]);
		} else {
			// If no JSON found, return a default or empty object
			return {};
		}
	}

	const npc = {
		name: data.name || "Unknown",
		race: data.race || "Unknown",
		class: data.class || "Unknown",
		age: parseInt(data.age, 10) || null,
		gender: data.gender || "Unknown",
		personality: data.personality || "Unknown",
		backstory: data.backstory || "Unknown",
	};

	return npc;
}

function sanitizeAndValidateNPC(npc) {
	// Type checking and default values
	npc.name = typeof npc.name === "string" ? npc.name : "Unknown";
	npc.race = typeof npc.race === "string" ? npc.race : "Unknown";
	npc.class = typeof npc.class === "string" ? npc.class : "Unknown";
	npc.gender = typeof npc.gender === "string" ? npc.gender : "Unknown";
	npc.personality =
		typeof npc.personality === "string" ? npc.personality : "Unknown";
	npc.backstory = typeof npc.backstory === "string" ? npc.backstory : "Unknown";

	// Length validation
	npc.name = npc.name.substring(0, 255);
	npc.race = npc.race.substring(0, 255);
	npc.class = npc.class.substring(0, 255);
	npc.gender = npc.gender.substring(0, 255);

	// Range validation for age
	if (typeof npc.age !== "number" || npc.age < 0 || npc.age > 200) {
		npc.age = null;
	}

	// Whitelist validation example for race
	const validRaces = ["Elf", "Dwarf", "Human", "Orc", "Gnome"]; // Add all valid races
	if (!validRaces.includes(npc.race)) {
		npc.race = "Unknown";
	}

	return npc;
}

async function populateDatabase(numNPCs) {
	for (let i = 0; i < numNPCs; i++) {
		const rawData = await generateNPC();
		const npcData = parseNPCData(rawData);
		const sanatizedData = sanitizeAndValidateNPC(npcData);

		insertNPC(sanatizedData, (err, id) => {
			if (err) {
				console.error(`Error inserting NPC #${i + 1}:`, err.message);
			} else {
				console.log(`Inserted NPC #${i + 1} with ID ${id}`);
			}
		});
	}
}

module.exports = { populateDatabase };
