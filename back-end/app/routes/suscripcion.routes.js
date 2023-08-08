module.exports = (app) => {
  const suscripcion = require('../controllers/suscripcion.controller.js')

  // Get all records
  app.get('/api/suscripcion', (req, res) => {
    suscripcion.findAll({ req, res })
  })

  // Search records
  app.get('/api/suscripcion/search', (req, res) => {
    suscripcion.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/suscripcion/:ID', (req, res) => {
    suscripcion.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/suscripcion', (req, res) => {
    suscripcion
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/suscripcion/:ID', (req, res) => {
    suscripcion
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/suscripcion/:ID', (req, res) => {
    suscripcion
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
