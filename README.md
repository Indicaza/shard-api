<p align="center">
  <img src="./pic/goblinOrthoHead.png" />
</p>

# Shard-NPC

Welcome to Shard-NPC, a dedicated module within the larger ecosystem of The Shard game. This repository focuses on the AI-driven generation of NPCs (Non-Player Characters). For developers and game masters alike, Shard-NPC offers a backend solution to create characters with depth and personality, enriching gameplay and narratives. Whether you're integrating it into your own game or just curious about dynamic character generation, this tool is here to elevate your gaming experience.

Here is the basic "shape" of this object.  
(Ignore the last 4 fields those are not implemented yet)

https://drawsql.app/teams/astral-forge/diagrams/npc

## Endpoints

### 1. Populate Database with NPCs

- **Endpoint:** `/npcs/populate`
- **Method:** `POST`
- **Description:** Populates the database with a specified number of NPCs.
- **CURL Command:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"numNPCs": 10}' http://localhost:3000/npcs/populate
  ```

### 2. Insert a New NPC

- **Endpoint:** `/npcs`
- **Method:** `POST`
- **Description:** Inserts a new NPC into the database.
- **CURL Command:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "race": "Human", "class": "Warrior", "age": 30, "gender": "Male", "personality": "Brave", "backstory": "A warrior from the north."}' http://localhost:3000/npcs
  ```

### 3. Get All NPCs

- **Endpoint:** `/npcs`
- **Method:** `GET`
- **Description:** Retrieves all NPCs from the database.
- **CURL Command:**
  ```bash
  curl -X GET http://localhost:3000/npcs
  ```

### 4. Get NPC by ID

- **Endpoint:** `/npcs/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific NPC by its ID.
- **CURL Command:**
  ```bash
  curl -X GET http://localhost:3000/npcs/1
  ```

### 5. Get a Random NPC

- **Endpoint:** `/npcs/random`
- **Method:** `GET`
- **Description:** Retrieves a random NPC from the database.
- **CURL Command:**
  ```bash
  curl -X GET http://localhost:3000/npcs/random
  ```

### 6. Update an NPC

- **Endpoint:** `/npcs/:id`
- **Method:** `PUT`
- **Description:** Updates the details of a specific NPC by its ID.
- **CURL Command:**
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"name": "Jane", "race": "Elf", "class": "Mage", "age": 100, "gender": "Female", "personality": "Wise", "backstory": "A mage from the enchanted forest."}' http://localhost:3000/npcs/1
  ```

### 7. Delete an NPC

- **Endpoint:** `/npcs/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific NPC by its ID.
- **CURL Command:**
  ```bash
  curl -X DELETE http://localhost:3000/npcs/1
  ```

---

## Setup and Configuration

Setting up Shard-Server is a breeze, even if you're new to the world of development. Here's a step-by-step guide to get you started:

1. **Clone the Repository:** Start by cloning the repository to your local machine.

   ```bash
   git clone [repository-link]
   ```

2. **Install Dependencies:** Navigate to the project directory and install the required packages.

   ```bash
   cd shard-server
   npm install
   ```

3. **API Key Configuration:** Shard-Server uses the OpenAI API to generate character descriptions. You'll need to get your API key from [OpenAI](https://www.openai.com/).

4. **Setting Up Environment Variables:** Create a `.env` file in the root of your project directory. This file will store your API key and other sensitive information. Add the following line to your `.env` file:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Replace `your_openai_api_key_here` with the actual API key you obtained from OpenAI.

5. **Running the Server:** With everything set up, you can now start the server.

   ```bash
   npm start
   ```

6. **Learning More:** If you're new to environment variables or want to dive deeper into the OpenAI API, here are some resources to help you out:
   - [Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
   - [OpenAI Official Documentation](https://beta.openai.com/docs/)

---

(AI is god)
