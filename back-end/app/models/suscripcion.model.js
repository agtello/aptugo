const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const SuscripcionSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },

    Contacto: {
      type: String,
    },

    Email: {
      type: String,
    },
    Telefono: Number,

    Rubro: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

SuscripcionSchema.plugin(mongoosePaginate)
SuscripcionSchema.index({
  Nombre: 'text',
  Contacto: 'text',
  Email: 'text',
  Telefono: 'text',
  Rubro: 'text',
})

const myModel = (module.exports = mongoose.model('Suscripcion', SuscripcionSchema, 'suscripcion'))
myModel.schema = SuscripcionSchema
