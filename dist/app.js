"use strict";
const express = require("express");
const npcRoutes = require("./routes/npc");
const db = require("./db/models/npc");
// const db = require("./db");
const app = express();
const PORT = 3000;
// Middleware
app.use(express.json());
// Routes
app.use("/npcs", npcRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Create the NPC table on startup
db.createTable();
