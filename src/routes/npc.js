const express = require("express");
const router = express.Router();
const npcModel = require("../db/models/npc");
const { populateDatabase } = require("../utils/populateDB");

// curl -X POST -H "Content-Type: application/json" -d '{"numNPCs": 10}' http://localhost:3000/npcs/populate
router.post("/populate", async (req, res) => {
	const numNPCs = req.body.numNPCs || 1; // Default to 1 if not provided
	try {
		await populateDatabase(numNPCs);
		res
			.status(200)
			.json({ message: `Successfully added ${numNPCs} NPCs to the database.` });
	} catch (error) {
		res.status(500).json({
			error: "Failed to populate the database.",
			details: error.message,
		});
	}
});

// curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "race": "Human", "class": "Warrior", "age": 30, "gender": "Male", "personality": "Brave", "backstory": "A warrior from the north."}' http://localhost:3000/npcs
router.post("/", (req, res) => {
	const npcData = req.body;
	npcModel.insertNPC(npcData, (err, id) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC created!", id });
	});
});

// curl -X GET http://localhost:3000/npcs
router.get("/", (req, res) => {
	npcModel.getAllNPCs((err, npcs) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json(npcs);
	});
});

// curl -X GET http://localhost:3000/npcs/random
router.get("/random", (req, res) => {
	npcModel.getRandomNPC((err, npc) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		if (!npc) {
			return res.status(404).json({ message: "NPC not found." });
		}
		res.json(npc);
	});
});

// curl -X GET http://localhost:3000/npcs/1
router.get("/:id", (req, res) => {
	const id = req.params.id;
	npcModel.getNPCById(id, (err, npc) => {
		if (err) return res.status(500).json({ error: err.message });
		if (!npc) return res.status(404).json({ message: "NPC not found." });
		res.json(npc);
	});
});

// curl -X PUT -H "Content-Type: application/json" -d '{"name": "Jane", "race": "Elf", "class": "Mage", "age": 100, "gender": "Female", "personality": "Wise", "backstory": "A mage from the enchanted forest."}' http://localhost:3000/npcs/1
router.put("/:id", (req, res) => {
	const id = req.params.id;
	const updatedData = req.body;
	npcModel.updateNPC(id, updatedData, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC updated!" });
	});
});

// curl -X DELETE http://localhost:3000/npcs/1
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	npcModel.deleteNPC(id, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ message: "NPC deleted!" });
	});
});

module.exports = router;
