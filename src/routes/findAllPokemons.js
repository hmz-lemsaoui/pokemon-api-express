const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name){
      const name = req.query.name
      if (name.length <= 1){
        const message = 'le terme de recherche doit contenir au minimum 2 caracters.'
        return res.status(400).json({ message})
      }
      const limit = parseInt(req.query.limit || 5)
      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        limit: limit,
        order: ['name']
      })
        .then((rows, count) => {
          const message = `il ya ${rows.count} pokemons qui correspondant au terme de recherche ${name}`;
          res.json({ message, data: rows })
        })
    }else {
      Pokemon.findAll({
        order: ['name']
      })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `la liste des pokemons n'a pas pu etre recupere. Ressayez dans quelques instants.`
        res.status(500).json({message , data: error});
      })
    }
  })
}