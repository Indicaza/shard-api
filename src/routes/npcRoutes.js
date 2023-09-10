const express = require("express");
const router = express.Router();
const npcController = require("../controllers/npcController");

router.post("/populate", npcController.populateDatabase);
router.post("/", npcController.createNPC);
router.get("/", npcController.getAllNPCs);
router.get("/random", npcController.getRandomNPC);
router.get("/:id", npcController.getNPCById);
router.put("/:id", npcController.updateNPC);
router.delete("/:id", npcController.deleteNPC);
router.delete("/delete-all", npcController.deleteAllNPCs);
router.delete("/dropNPCsTable", npcController.dropNPCsTable);
//===============================================================================================================
// NPC Appearance routes
//===============================================================================================================
router.post("/:npcId/appearance", npcController.createAppearanceForNPC);
router.post("/with-image", npcController.createNPCWithImage);

module.exports = router;
