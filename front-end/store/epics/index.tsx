import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import suscripcionesEpics from './suscripcionesEpics'

export const rootEpic = combineEpics(suscripcionesEpics)

export default createEpicMiddleware<Action, Action, IState>()
