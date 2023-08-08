module.exports = (app) => {
  const suscripciones = require('../controllers/suscripciones.controller.js')

  // Get all records
  app.get('/api/suscripciones', (req, res) => {
    suscripciones.findAll({ req, res })
  })

  // Search records
  app.get('/api/suscripciones/search', (req, res) => {
    suscripciones.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/suscripciones/:ID', (req, res) => {
    suscripciones.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/suscripciones', (req, res) => {
    suscripciones
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/suscripciones/:ID', (req, res) => {
    suscripciones
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/suscripciones/:ID', (req, res) => {
    suscripciones
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
