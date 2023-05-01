const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth') 

module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    const id = +req.params.id
    Pokemon.findByPk(id)
      .then(pokemon => {
        if (pokemon === null){
          const message = `le pokemon demande n'existe pas. Ressayez avec un autre identifiant`
          res.status(404).json(message)
        }
        const message = `le pokemon ${pokemon.name} a bien ete reccupere`;
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `le pokemon n'a pas pu etre recupere. Ressayez dans quelques instants.`
        res.status(500).json({message , data: error});
      })
  })
}