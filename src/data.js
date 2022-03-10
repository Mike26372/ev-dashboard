const fs = require("fs");

module.exports = () => {
  // json-server does not support async / await
  const inputsCsv = fs.readFileSync(
    __dirname.replace("/src", "/public/inputs.csv"),
    "utf8"
  );
  const tripsCsv = fs.readFileSync(
    __dirname.replace("/src", "/public/trips.csv"),
    "utf8"
  );

  // Creating /inputs and /trips endpoints using json-server
  return { inputs: { text: inputsCsv }, trips: { text: tripsCsv } };
};
