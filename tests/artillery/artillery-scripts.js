// Generate a random number for a random product page
const databaseEntries = 10000000;

let generateRandomIndex = (userContext, events, done) => {
  const id = Math.floor(Math.random() * databaseEntries);
  userContext.vars.id = id;
  return done();
};

module.exports = {generateRandomIndex};
