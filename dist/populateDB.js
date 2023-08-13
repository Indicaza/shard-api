"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDatabase = void 0;
const npc_1 = require("../db/models/npc");
const gpt_1 = require("./gpt");
async function parseNPCData(rawData) {
    const lines = rawData.split("\n");
    const npc = {};
    lines.forEach((line) => {
        if (line.startsWith("Name:"))
            npc.name = line.split("Name:")[1].trim();
        if (line.startsWith("Race:"))
            npc.race = line.split("Race:")[1].trim();
        if (line.startsWith("Class:"))
            npc.class = line.split("Class:")[1].trim();
        if (line.startsWith("Age:"))
            npc.age = parseInt(line.split("Age:")[1].trim());
        if (line.startsWith("Gender:"))
            npc.gender = line.split("Gender:")[1].trim();
        if (line.startsWith("Personality:"))
            npc.personality = line.split("Personality:")[1].trim();
        if (line.startsWith("Backstory:"))
            npc.backstory = line.split("Backstory:")[1].trim();
    });
    return npc;
}
async function populateDatabase(numNPCs) {
    for (let i = 0; i < numNPCs; i++) {
        const rawData = await (0, gpt_1.generateNPC)();
        const npcData = await parseNPCData(rawData);
        (0, npc_1.insertNPC)(npcData, (err, id) => {
            if (err) {
                console.error(`Error inserting NPC #${i + 1}:`, err.message);
            }
            else {
                console.log(`Inserted NPC #${i + 1} with ID ${id}`);
            }
        });
    }
}
exports.populateDatabase = populateDatabase;
