-- @block NPC
CREATE TABLE NPC (
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