const { Pokemon } = require('../db/sequelize')
const { ValidationError,UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth') // middlware

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, { 
      where: {id: id}
    })
      .then(_ => {
        return Pokemon.findByPk(id).then(pokemon => {
          if (pokemon === null){
            const message = `le pokemon demande n'existe pas. Ressayez avec un autre identifiant`
            res.status(404).json(message)
          }
          const message = `Le pokémon ${req.body.name} a bien été modifie.`
          res.json({ message, data: pokemon })
        })
      })
      .catch(error => {
        if (error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error})
        }
        if (error instanceof UniqueConstraintError ){
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = `le pokemon n'a pas pu etre modifie. Ressayez dans quelques instants.`;
        res.status(500).json({message , data: error});
      })
  })
}