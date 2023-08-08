import { combineReducers } from 'redux'

import suscripcionesReducer, { initialSuscripcionesState, ISuscripcionesState } from './suscripcionesReducer'

export interface IState {
  suscripciones: ISuscripcionesState
}

export const initialState: IState = {
  suscripciones: initialSuscripcionesState,
}

export default combineReducers({
  suscripciones: suscripcionesReducer,
})
