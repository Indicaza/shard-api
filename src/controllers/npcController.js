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
