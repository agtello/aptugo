const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SuscripcionesSchema = mongoose.Schema(
  {
    Contacto: {
      type: String,
    },

    Email: {
      type: String,
    },
    Telefono: Number,
    Rubro: String,
    PoseesoftwaredeGestionDocumental: Boolean,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SuscripcionesSchema.plugin(mongoosePaginate)
SuscripcionesSchema.index({
  Contacto: 'text',
  Email: 'text',
  Telefono: 'text',
  Rubro: 'text',
  PoseesoftwaredeGestionDocumental: 'text',
})

const myModel = (module.exports = mongoose.model('Suscripciones', SuscripcionesSchema, 'suscripciones'))
myModel.schema = SuscripcionesSchema
