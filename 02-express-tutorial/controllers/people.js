let { people } = require("../data");

const getPeople = (req, res) => {
  console.log("Inside getAllPeople");
  res.status(200).json({ success: true, data: people });
};

const getPerson = (req, res) => {
  console.log(`inside getPerson with ${req.params.id}`);
  const id = parseInt(req.params.id);
  const person = people.find((person) => person.id === id);
  if (!person) {
    return res.status(404).json({ message: "There is no person with that id" });
  }
  return res.status(200).json(person);
};

const getMaxId = () => {
  return people.reduce((ret, cur) => (ret < cur.id ? cur.id : ret), 0);
};

const addPerson = (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  // newId = getMaxId() + 1;
  // people.push({ id: newId, name: req.body.name });
  // res.status(201).json({ success: true, name: name, id: newId });
  const newId = people.length + 1;
  people.push({ id: newId, name });
  res.status(201).json({ success: true, name, id: newId });
};

updatePerson = (req, res) => {
  console.log("inside updatePerson controller")
  // const person = people.find((person) => person.id === Number(req.params.id));
  // if (!person) {
  //   return res.status(404).json({
  //     success: false,
  //     message: `There are no person with the id:${req.params.id}`,
  //   });
  // }
  // const newPerson = people.map((person) => {
  //   if (person.id === Number(req.params.id)) {
  //     person.name = req.body.name;
  //   }
  //   return person;
  // });
  // res.status(200).json({ success: true, data: newPerson });
  const personId = parseInt(req.params.id, 10);

  const person = people.find((person) => person.id === personId);

  if (!person) {
    return res
      .status(404)
      .json({
        success: false,
        msg: `There is no person with the id: ${personId}`,
      });
  }

  person.name = req.body.name;

  res.status(200).json({ success: true, data: person });
};

deletePerson = (req, res) => {
  // const person = people.find((person) => person.id === Number(req.params.id));
  // if (!person) {
  //   return res.status(404).json({
  //     success: false,
  //     message: `no person with id ${req.params.id}`,
  //   });
  // }
  // const newPerson = people.filter(
  //   (person) => person.id !== Number(req.params.id)
  // );
  // return res.status(200).json({ success: true, data: newPerson });
  const personId = parseInt(req.params.id, 10);

  const personIndex = people.findIndex((p) => p.id === personId);

  if (personIndex < 0) {
    return res.status(404).json({ message: "Person not found" });
  }

  people.splice(personIndex, 1);

  return res.status(200).json({ success: true, data: people });
};

module.exports = {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
};
