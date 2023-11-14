const express = require("express");
const router = express.Router();

let { people } = require("../data");
const {
  getPeople,
  getPersonById,
  addPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.get("/", getPeople);
router.post("/postman", addPersonPostman);
router.get("/:id", getPersonById);
router.put("/postman/:id", updatePerson); //localhost:3000/api/v1/people/postman/4
router.delete("/postman/:id", deletePerson); //localhost:3000/api/v1/people/postman/5

module.exports = router;
