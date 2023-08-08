import produce from 'immer'
import { SuscripcionAction, SuscripcionActionTypes } from '../actions/suscripcionActions'
import { ApiStatus, ISuscripcionItem } from '../models'

export const initialSuscripcionState: ISuscripcionState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  suscripcion: [],
  foundsuscripcion: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function suscripcionReducer(state: ISuscripcionState = initialSuscripcionState, action: SuscripcionAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SuscripcionActionTypes.SEARCH_SUSCRIPCION:
        draft.searchString = action.searchOptions.searchString
        break
      case SuscripcionActionTypes.SEARCHING_SUSCRIPCION:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case SuscripcionActionTypes.SEARCHING_SUSCRIPCION_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case SuscripcionActionTypes.FOUND_SUSCRIPCION:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundsuscripcion.push(...action.payload.suscripcion.docs) : (draft.foundsuscripcion = action.payload.suscripcion.docs)
        draft.totalDocs = action.payload.suscripcion.totalDocs
        break

      case SuscripcionActionTypes.LOAD_SUSCRIPCION:
      case SuscripcionActionTypes.LOADING_SUSCRIPCION:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundsuscripcion = []
        break

      case SuscripcionActionTypes.LOADING_SUSCRIPCION_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case SuscripcionActionTypes.LOADED_SUSCRIPCION:
        draft.loadingStatus = ApiStatus.LOADED
        draft.suscripcion = action.payload.suscripcion.docs
        draft.totalDocs = action.payload.suscripcion.totalDocs
        break

      case SuscripcionActionTypes.ADD_SUSCRIPCION:
      case SuscripcionActionTypes.ADDING_SUSCRIPCION:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case SuscripcionActionTypes.ADDING_SUSCRIPCION_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case SuscripcionActionTypes.ADDED_SUSCRIPCION:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.suscripcion.push(action.payload.suscripcion.docs[0])
        if (draft.searchString) draft.foundsuscripcion.push(action.payload.suscripcion.docs[0])
        break

      case SuscripcionActionTypes.REMOVE_SINGLEUNTITLED:
        draft.suscripcion.splice(
          draft.suscripcion.findIndex((singleuntitled) => singleuntitled._id === action.payload._id),
          1
        )
        break

      case SuscripcionActionTypes.EDIT_SUSCRIPCION:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.suscripcion[draft.suscripcion.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break

      case SuscripcionActionTypes.EDITED_SUSCRIPCION:
        draft.addingStatus = ApiStatus.LOADED
        draft.suscripcion[draft.suscripcion.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        draft.foundsuscripcion[draft.foundsuscripcion.findIndex((singleuntitled) => singleuntitled._id === action.payload._id)] = action.payload
        break
    }
  })
}

export interface ISuscripcionState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  suscripcion: ISuscripcionItem[]
  foundsuscripcion: ISuscripcionItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
