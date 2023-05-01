const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message = `le pokemon demande n'existe pas. Ressayez avec un autre identifiant`;
          res.status(404).json(message);
        }
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemonDeleted.id },
        }).then((_) => {
          const message = `Le pokémon ${pokemonDeleted.name} a bien été supprime.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message = `le pokemon n'a pas pu etre recupere. Ressayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
