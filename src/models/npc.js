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
            backstory TEXT NOT NULL,
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

function insertNPC(npc, callback) {
	const connection = connectToDatabase();
	const query = "INSERT INTO NPC SET ?";
	connection.query(query, npc, (err, results) => {
		if (err) return callback(err);
		callback(null, results.insertId);
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

function getNPCById(id, callback) {
	const connection = connectToDatabase();
	const query = "SELECT * FROM NPC WHERE id = ?";
	connection.query(query, id, (err, results) => {
		if (err) return callback(err);
		callback(null, results[0]);
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

module.exports = {
	createTable,
	insertNPC,
	getAllNPCs,
	getNPCById,
	updateNPC,
	deleteNPC,
	getRandomNPC,
};
