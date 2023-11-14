let { people } = require("../data");
////////////////////////////////////////////////////////////////////////
const addPersonPostman = (req, res) => {
  const { name } = req.body;
  if (name) {
    people.push({ id: people.length + 1, name: name });
    res.status(201).json({ success: true, data: people });
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
};
/////////////////////////////////////////////////////////////////////
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};
////////////////////////////////////////////////////////////////////////
const getPersonById = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  } else {
    res.status(200).json({ success: true, data: person });
  }
};
/////////////////////////////////////////////////////////////////////////
 const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
};
/////////////////////////////////////////////////////////
const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  getPersonById,
  addPersonPostman,
  updatePerson,
  deletePerson,
};
