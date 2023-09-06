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
-- CREATE TABLE Relationships (
--     relationship_id INT NOT NULL AUTO_INCREMENT,
--     npc_id INT NOT NULL,
--     related_npc_id INT NOT NULL,
--     relationship_type VARCHAR(255) NOT NULL,
--     relationship_strength VARCHAR(255),
--     relationship_origin TEXT,
--     PRIMARY KEY (relationship_id),
--     FOREIGN KEY (npc_id) REFERENCES NPC(id),
--     FOREIGN KEY (related_npc_id) REFERENCES NPC(id)
-- );
-- CREATE TABLE Events (
--     event_id INT NOT NULL AUTO_INCREMENT,
--     event_name VARCHAR(255) NOT NULL,
--     event_description TEXT NOT NULL,
--     involved_npc_ids TEXT,
--     PRIMARY KEY (event_id)
-- );