export interface ISuscripcionesItem {
  _id?: String
  createdAt: Date

  Contacto: string

  Email: string
  Telefono: Number
  Rubro: String
  PoseesoftwaredeGestionDocumental: Boolean
}

export interface IpaginatedSuscripciones {
  docs: ISuscripcionesItem[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
