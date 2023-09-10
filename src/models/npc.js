const connectToDatabase = require("../db/dbConnection");

function createTable() {
	const connection = connectToDatabase();
	const query = `
		CREATE TABLE IF NOT EXISTS NPC (
			id INT NOT NULL AUTO_INCREMENT,
			name VARCHAR(255) NOT NULL,
			race VARCHAR(255) NOT NULL,
			class VARCHAR(255) NOT NULL,
			age INT,
			gender VARCHAR(255) NOT NULL,
			personality TEXT NOT NULL,
			personality_type VARCHAR(4),  -- Myers-Briggs type
			backstory TEXT NOT NULL,
			image_url VARCHAR(512),       -- URL for the appearance image
			PRIMARY KEY (id)
		);
    `;
	connection.query(query, (err) => {
		if (err) {
			console.error("Error creating NPC table:", err);
			return;
		}
		console.log("NPC table created or already exists.");
	});
}

function generateMyersBriggsType() {
	const types = ["E", "I"];
	const sensingIntuition = ["S", "N"];
	const thinkingFeeling = ["T", "F"];
	const judgingPerceiving = ["J", "P"];

	const type = types[Math.floor(Math.random() * types.length)];
	const sN =
		sensingIntuition[Math.floor(Math.random() * sensingIntuition.length)];
	const tF =
		thinkingFeeling[Math.floor(Math.random() * thinkingFeeling.length)];
	const jP =
		judgingPerceiving[Math.floor(Math.random() * judgingPerceiving.length)];

	return type + sN + tF + jP;
}

function insertNPC(npc, callback) {
	const connection = connectToDatabase();
	const query = "INSERT INTO NPC SET ?";
	connection.query(query, npc, (err, results) => {
		if (err) return callback(err);
		callback(null, results.insertId);
	});
}

function getNPCById(id, callback) {
	const connection = connectToDatabase();
	const query = "SELECT * FROM NPC WHERE id = ?";
	connection.query(query, id, (err, results) => {
		if (err) return callback(err);
		callback(null, results[0]);
	});
}

function getRandomNPC(callback) {
	const connection = connectToDatabase();
	const query = "SELECT * FROM NPC ORDER BY RAND() LIMIT 1";
	connection.query(query, (err, results) => {
		if (err) return callback(err);
		if (results.length === 0) {
			return callback(new Error("No NPCs found in the database."));
		}
		callback(null, results[0]);
	});
}

function getAllNPCs(callback) {
	const connection = connectToDatabase();
	const query = "SELECT * FROM NPC";
	connection.query(query, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function updateNPC(id, updatedFields, callback) {
	const connection = connectToDatabase();
	const query = "UPDATE NPC SET ? WHERE id = ?";
	connection.query(query, [updatedFields, id], (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function deleteNPC(id, callback) {
	const connection = connectToDatabase();
	const query = "DELETE FROM NPC WHERE id = ?";
	connection.query(query, id, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function deleteAllNPCs(callback) {
	const connection = connectToDatabase();
	const query = "DELETE FROM NPC";
	connection.query(query, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function dropNPCsTable(callback) {
	const connection = connectToDatabase();
	const query = "DROP TABLE IF EXISTS NPC";
	connection.query(query, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

//=============================================================================
// NPC Appearance
//=============================================================================

const HAIR_STYLES = ["Short", "Medium", "Long", "Bald", "Braided"]; // Add more styles
const SKIN_COLORS = ["Fair", "Tan", "Olive", "Brown", "Dark"]; // Add more colors
const HEAD_SHAPES = ["Round", "Oval", "Square"]; // Add more shapes
const EYEBROWS = ["Thick", "Thin", "Arched"]; // Add more types
const BODY_TYPES = ["Slim", "Muscular", "Average", "Chubby"]; // Add more types

function createAppearanceTable() {
	const connection = connectToDatabase();
	const query = `
        CREATE TABLE IF NOT EXISTS NPC_Appearance (
            id INT NOT NULL AUTO_INCREMENT,
            npc_id INT NOT NULL,
            skin_color VARCHAR(255),
            hair_style VARCHAR(255),
            head_shape VARCHAR(255),
            eyebrows VARCHAR(255),
            body_type VARCHAR(255),
            PRIMARY KEY (id),
            FOREIGN KEY (npc_id) REFERENCES NPC(id)
        );
    `;
	connection.query(query, (err) => {
		if (err) {
			console.error("Error creating NPC_Appearance table:", err);
			return;
		}
		console.log("NPC_Appearance table created or already exists.");
	});
}

function generateAppearance() {
	return {
		hair_style: HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)],
		skin_color: SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)],
		head_shape: HEAD_SHAPES[Math.floor(Math.random() * HEAD_SHAPES.length)],
		eyebrows: EYEBROWS[Math.floor(Math.random() * EYEBROWS.length)],
		body_type: BODY_TYPES[Math.floor(Math.random() * BODY_TYPES.length)],
	};
}

function insertAppearance(npcId, appearance, callback) {
	const connection = connectToDatabase();
	const query = "INSERT INTO NPC_Appearance SET ?";
	appearance.npc_id = npcId;
	connection.query(query, appearance, (err, results) => {
		if (err) return callback(err);
		callback(null, results.insertId);
	});
}

module.exports = {
	createTable,
	createAppearanceTable,
	generateMyersBriggsType,
	insertNPC,
	getNPCById,
	getRandomNPC,
	getAllNPCs,
	updateNPC,
	deleteNPC,
	deleteAllNPCs,
	dropNPCsTable,
	createAppearanceTable,
	generateAppearance,
	insertAppearance,
};
