const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello ,Heroku 👍");
});

app
  .use(morgan("dev"))
  .use(favicon(__dirname + "/favicon.ico"))
  .use(bodyParser.json());

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);
// on ajaute la gestion des erreurs 404
app.use((res) => {
  const message = `Impossible de trouver la resource demandee ! vous pouvez ressayer une autre URL.`;
  res.status(404).json(message);
});

app.listen(port, () =>
  console.log(`notre application est demarre sur : http://localhost:${port}`)
);
