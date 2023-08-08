import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedSuscripciones,
  addingSuscripciones,
  addingSuscripcionesFailed,
  editedSuscripciones,
  editingSuscripciones,
  editingSuscripcionesFailed,
  foundSuscripciones,
  loadedSuscripciones,
  loadingSuscripciones,
  loadingSuscripcionesFailed,
  removedSuscripcion,
  removingSuscripcion,
  removingSuscripcionFailed,
  searchingSuscripciones,
  searchingSuscripcionesFailed,
  SuscripcionesAction,
  SuscripcionesActionTypes,
} from '../actions/suscripcionesActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchSuscripcionesEpic: Epic<SuscripcionesAction, SuscripcionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionesActionTypes.SEARCH_SUSCRIPCIONES)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/suscripciones/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSuscripciones(response.data, action.keep)),
        startWith(searchingSuscripciones()),
        catchError(() => of(searchingSuscripcionesFailed()))
      )
    })
  )

const loadSuscripcionesEpic: Epic<SuscripcionesAction, SuscripcionesAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SuscripcionesActionTypes.LOAD_SUSCRIPCIONES)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/suscripciones/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSuscripciones(response.data)),
        startWith(loadingSuscripciones()),
        catchError(() => of(loadingSuscripcionesFailed()))
      )
    })
  )
}

const addSuscripcionesEpic: Epic<SuscripcionesAction, SuscripcionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionesActionTypes.ADD_SUSCRIPCIONES)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/suscripciones/`, data, config)).pipe(
        map((response) => addedSuscripciones(response.data)),
        startWith(addingSuscripciones()),
        catchError((err) => of(addingSuscripcionesFailed(err.response)))
      )
    })
  )

const removeSuscripcionesEpic: Epic<SuscripcionesAction, SuscripcionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionesActionTypes.REMOVE_SUSCRIPCION)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/suscripciones/${action.payload._id}`)).pipe(
        map((response) => removedSuscripcion()),
        startWith(removingSuscripcion()),
        catchError(() => of(removingSuscripcionFailed()))
      )
    )
  )

const editSuscripcionesEpic: Epic<SuscripcionesAction, SuscripcionesAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionesActionTypes.EDIT_SUSCRIPCIONES)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/suscripciones/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSuscripciones(response.data)),
        startWith(editingSuscripciones()),
        catchError(() => of(editingSuscripcionesFailed()))
      )
    })
  )

export default combineEpics(searchSuscripcionesEpic, loadSuscripcionesEpic, addSuscripcionesEpic, removeSuscripcionesEpic, editSuscripcionesEpic)
