"use strict";
const express = require("express");
const router = express.Router();
const npcModel = require("../db/models/npc");
const { populateDatabase } = require("../utils/populateDB");
router.post("/populate", async (req, res) => {
    const numNPCs = req.body.numNPCs || 1; // Default to 1 if not provided
    try {
        await populateDatabase(numNPCs);
        res
            .status(200)
            .json({ message: `Successfully added ${numNPCs} NPCs to the database.` });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to populate the database.",
            details: error.message,
        });
    }
});
router.post("/", (req, res) => {
    const npcData = req.body;
    npcModel.insertNPC(npcData, (err, id) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ message: "NPC created!", id });
    });
});
router.get("/", (req, res) => {
    npcModel.getAllNPCs((err, npcs) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(npcs);
    });
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    npcModel.getNPCById(id, (err, npc) => {
        if (err)
            return res.status(500).json({ error: err.message });
        if (!npc)
            return res.status(404).json({ message: "NPC not found." });
        res.json(npc);
    });
});
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    npcModel.updateNPC(id, updatedData, (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ message: "NPC updated!" });
    });
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    npcModel.deleteNPC(id, (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json({ message: "NPC deleted!" });
    });
});
module.exports = router;
