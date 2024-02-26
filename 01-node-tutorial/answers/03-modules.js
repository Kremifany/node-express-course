////////////destructuring//////////////
const { name1, name2 } = require("./04-names.js");
const sayHi = require("./05-utils.js");
sayHi(name1);
sayHi(name2);

const { items, singlePerson } = require("./06-alternative-flavor.js");
console.log(items[1]);
console.log(singlePerson.name);

require("./07-mind-grenade.js");
