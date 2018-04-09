// Generate a random number for a random product page
const databaseSize = 10000000;

// Realistic web traffic- 80% going to 50, 15% going to 1000, 5% for the rest

let generateRandomIndex = (userContext, events, done) => {
  let randomPercentage = Math.random();
  let databaseSearchRange;
  if (randomPercentage <= 0.85) {
    databaseSearchRange = 50;
  } else if (randomPercentage > 0.85 && randomPercentage <= 0.95) {
    databaseSearchRange = 1000;
  } else {
    databaseSearchRange = databaseSize;
  }
  const id = Math.floor(Math.random() * databaseSearchRange);
  userContext.vars.id = id;
  return done();
};

module.exports = {generateRandomIndex};
