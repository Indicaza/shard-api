// src/db/dbConnection.js

const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};

let connection;

function connectToDatabase() {
	if (!connection) {
		connection = mysql.createConnection(dbConfig);

		connection.connect((err) => {
			if (err) {
				console.error("Error connecting to the database:", err);
				setTimeout(connectToDatabase, 2000); // Retry after 2 seconds
			} else {
				console.log("Connected to the database.");
			}
		});
	}

	return connection;
}

module.exports = connectToDatabase;
