import produce from 'immer'
import { SuscripcionesAction, SuscripcionesActionTypes } from '../actions/suscripcionesActions'
import { ApiStatus, ISuscripcionesItem } from '../models'

export const initialSuscripcionesState: ISuscripcionesState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  suscripciones: [],
  foundsuscripciones: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function suscripcionesReducer(state: ISuscripcionesState = initialSuscripcionesState, action: SuscripcionesAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SuscripcionesActionTypes.SEARCH_SUSCRIPCIONES:
        draft.searchString = action.searchOptions.searchString
        break
      case SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SuscripcionesActionTypes.FOUND_SUSCRIPCIONES:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep
          ? draft.foundsuscripciones.push(...action.payload.suscripciones.docs)
          : (draft.foundsuscripciones = action.payload.suscripciones.docs)
        draft.totalDocs = action.payload.suscripciones.totalDocs
        break

      case SuscripcionesActionTypes.LOAD_SUSCRIPCIONES:
      case SuscripcionesActionTypes.LOADING_SUSCRIPCIONES:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundsuscripciones = []
        break

      case SuscripcionesActionTypes.LOADING_SUSCRIPCIONES_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SuscripcionesActionTypes.LOADED_SUSCRIPCIONES:
        draft.loadingStatus = ApiStatus.LOADED
        draft.suscripciones = action.payload.suscripciones.docs
        draft.totalDocs = action.payload.suscripciones.totalDocs
        break

      case SuscripcionesActionTypes.ADD_SUSCRIPCIONES:
      case SuscripcionesActionTypes.ADDING_SUSCRIPCIONES:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SuscripcionesActionTypes.ADDING_SUSCRIPCIONES_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SuscripcionesActionTypes.ADDED_SUSCRIPCIONES:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.suscripciones.push(action.payload.suscripciones.docs[0])
        if (draft.searchString) draft.foundsuscripciones.push(action.payload.suscripciones.docs[0])
        break

      case SuscripcionesActionTypes.REMOVE_SUSCRIPCION:
        draft.suscripciones.splice(
          draft.suscripciones.findIndex((suscripcion) => suscripcion._id === action.payload._id),
          1
        )
        break

      case SuscripcionesActionTypes.EDIT_SUSCRIPCIONES:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.suscripciones[draft.suscripciones.findIndex((suscripcion) => suscripcion._id === action.payload._id)] = action.payload
        break

      case SuscripcionesActionTypes.EDITED_SUSCRIPCIONES:
        draft.addingStatus = ApiStatus.LOADED
        draft.suscripciones[draft.suscripciones.findIndex((suscripcion) => suscripcion._id === action.payload._id)] = action.payload
        draft.foundsuscripciones[draft.foundsuscripciones.findIndex((suscripcion) => suscripcion._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISuscripcionesState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  suscripciones: ISuscripcionesItem[]
  foundsuscripciones: ISuscripcionesItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
