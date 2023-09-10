const npcModel = require("../models/npc");
const { populateDatabase: populateDB } = require("../utils/populateDB");

exports.populateDatabase = async (req, res) => {
	const numNPCs = req.body.numNPCs || 1; // Default to 1 if not provided
	try {
		await populateDB(numNPCs);
		res
			.status(200)
			.json({ message: `Successfully added ${numNPCs} NPCs to the database.` });
	} catch (error) {
		res.status(500).json({
			error: "Failed to populate the database.",
			details: error.message,
		});
	}
};

exports.createNPC = (req, res) => {
	const npcData = req.body;
	npcModel.insertNPC(npcData, (err, id) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC created!", id });
	});
};

exports.getAllNPCs = (req, res) => {
	npcModel.getAllNPCs((err, npcs) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(npcs);
	});
};

exports.getRandomNPC = (req, res) => {
	npcModel.getRandomNPC((err, npc) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!npc) return res.status(404).json({ message: "NPC not found." });
		res.json(npc);
	});
};

exports.getNPCById = (req, res) => {
	const id = req.params.id;
	npcModel.getNPCById(id, (err, npc) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!npc) return res.status(404).json({ message: "NPC not found." });
		res.json(npc);
	});
};

exports.updateNPC = (req, res) => {
	const id = req.params.id;
	const updatedData = req.body;
	npcModel.updateNPC(id, updatedData, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC updated!" });
	});
};

exports.deleteNPC = (req, res) => {
	const id = req.params.id;
	npcModel.deleteNPC(id, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC deleted!" });
	});
};

exports.deleteAllNPCs = (req, res) => {
	npcModel.deleteAllNPCs((err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "All NPCs deleted!" });
	});
};

exports.dropNPCsTable = (req, res) => {
	npcModel.dropNPCsTable((err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC table dropped!" });
	});
};

//===============================================================================================================
// NPC Apearence controllers
//===============================================================================================================

exports.createAppearanceForNPC = (req, res) => {
	const npcId = req.params.npcId;
	const appearanceData = npcModel.generateAppearance();
	npcModel.insertAppearance(npcId, appearanceData, (err, id) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "Appearance created for NPC!", id });
	});
};

const { generateImageFromPrompt } = require("../utils/gpt");

exports.createNPCWithImage = async (req, res) => {
	const npcData = req.body;
	npcModel.insertNPC(npcData, async (err, npcId) => {
		if (err) return res.status(500).json({ error: err.message });

		// Generate appearance for the NPC
		const appearanceData = npcModel.generateAppearance();
		npcModel.insertAppearance(
			npcId,
			appearanceData,
			async (err, appearanceId) => {
				if (err) return res.status(500).json({ error: err.message });

				// Generate the prompt for DALL-E
				const prompt = "Placeholder prompt for DALL-E based on appearanceData"; // Replace with actual prompt

				// Get the image from DALL-E
				const imageUrl = await generateImageFromPrompt(prompt);

				// Here, you can save the imageUrl to the NPC's record or another table if needed

				res.json({ message: "NPC with image created!", npcId, imageUrl });
			}
		);
	});
};
