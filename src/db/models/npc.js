const connection = require("../index");

function createTable() {
	const query = `
        CREATE TABLE IF NOT EXISTS NPC (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            race VARCHAR(255) NOT NULL,
            class VARCHAR(255) NOT NULL,
            age INT,
            gender VARCHAR(255) NOT NULL,
            personality TEXT NOT NULL,
            backstory TEXT NOT NULL,
            PRIMARY KEY (id)
        );
    `;
	connection.query(query, (err) => {
		if (err) throw err;
		console.log("NPC table created or already exists.");
	});
}

function insertNPC(npc, callback) {
	console.log(npc); // Add this line
	const query = "INSERT INTO NPC SET ?";
	connection.query(query, npc, (err, results) => {
		if (err) return callback(err);
		callback(null, results.insertId);
	});
}

function getAllNPCs(callback) {
	const query = "SELECT * FROM NPC";
	connection.query(query, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function getNPCById(id, callback) {
	const query = "SELECT * FROM NPC WHERE id = ?";
	connection.query(query, id, (err, results) => {
		if (err) return callback(err);
		callback(null, results[0]);
	});
}

function updateNPC(id, updatedFields, callback) {
	const query = "UPDATE NPC SET ? WHERE id = ?";
	connection.query(query, [updatedFields, id], (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function deleteNPC(id, callback) {
	const query = "DELETE FROM NPC WHERE id = ?";
	connection.query(query, id, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

function getRandomNPC(callback) {
	const query = "SELECT * FROM NPC ORDER BY RAND() LIMIT 1";
	connection.query(query, (err, results) => {
		if (err) {
			return callback(err);
		}
		if (results.length === 0) {
			return callback(new Error("No NPCs found in the database."));
		}
		const npcData = { ...results[0] }; // Convert RowDataPacket to plain object
		callback(null, npcData);
	});
}

module.exports = {
	createTable,
	insertNPC,
	getAllNPCs,
	getNPCById,
	updateNPC,
	deleteNPC,
	getRandomNPC,
};
