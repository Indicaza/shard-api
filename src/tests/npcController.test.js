const {
	populateDatabase,
	createNPC,
	getAllNPCs,
} = require("../controllers/npcController");
const { generateNPC } = require("../utils/gpt");
const { insertNPC } = require("../models/npc");

jest.mock("../utils/gpt");
jest.mock("../models/npc");

describe("NPC Controller", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should populate the database with NPCs", async () => {
		generateNPC.mockResolvedValue({
			name: "John",
			race: "Human",
			class: "Warrior",
			age: 30,
			gender: "Male",
			personality: "Brave",
			backstory: "A warrior from the north.",
		});
		insertNPC.mockImplementation((data, cb) => cb(null, 1));

		const req = { body: { numNPCs: 1 } };
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await populateDatabase(req, res);
		expect(res.json).toHaveBeenCalledWith({
			message: "Successfully added 1 NPCs to the database.",
		});
	});

	// ... Add more tests for other functions in npcController.js
});
