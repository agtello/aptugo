import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedSuscripcion,
  addingSuscripcion,
  addingSuscripcionFailed,
  editedSuscripcion,
  editingSuscripcion,
  editingSuscripcionFailed,
  foundSuscripcion,
  loadedSuscripcion,
  loadingSuscripcion,
  loadingSuscripcionFailed,
  removedSingleuntitled,
  removingSingleuntitled,
  removingSingleuntitledFailed,
  searchingSuscripcion,
  searchingSuscripcionFailed,
  SuscripcionAction,
  SuscripcionActionTypes,
} from '../actions/suscripcionActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchSuscripcionEpic: Epic<SuscripcionAction, SuscripcionAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionActionTypes.SEARCH_SUSCRIPCION)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `http://127.0.0.1:4567/api/suscripcion/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundSuscripcion(response.data, action.keep)),
        startWith(searchingSuscripcion()),
        catchError(() => of(searchingSuscripcionFailed()))
      )
    })
  )

const loadSuscripcionEpic: Epic<SuscripcionAction, SuscripcionAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(SuscripcionActionTypes.LOAD_SUSCRIPCION)),
    switchMap((action) => {
      let url = `http://127.0.0.1:4567/api/suscripcion/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedSuscripcion(response.data)),
        startWith(loadingSuscripcion()),
        catchError(() => of(loadingSuscripcionFailed()))
      )
    })
  )
}

const addSuscripcionEpic: Epic<SuscripcionAction, SuscripcionAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionActionTypes.ADD_SUSCRIPCION)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`http://127.0.0.1:4567/api/suscripcion/`, data, config)).pipe(
        map((response) => addedSuscripcion(response.data)),
        startWith(addingSuscripcion()),
        catchError((err) => of(addingSuscripcionFailed(err.response)))
      )
    })
  )

const removeSuscripcionEpic: Epic<SuscripcionAction, SuscripcionAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionActionTypes.REMOVE_SINGLEUNTITLED)),
    mergeMap((action) =>
      from(axios.delete(`http://127.0.0.1:4567/api/suscripcion/${action.payload._id}`)).pipe(
        map((response) => removedSingleuntitled()),
        startWith(removingSingleuntitled()),
        catchError(() => of(removingSingleuntitledFailed()))
      )
    )
  )

const editSuscripcionEpic: Epic<SuscripcionAction, SuscripcionAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(SuscripcionActionTypes.EDIT_SUSCRIPCION)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`http://127.0.0.1:4567/api/suscripcion/${action.payload._id}`, data, config)).pipe(
        map((response) => editedSuscripcion(response.data)),
        startWith(editingSuscripcion()),
        catchError(() => of(editingSuscripcionFailed()))
      )
    })
  )

export default combineEpics(searchSuscripcionEpic, loadSuscripcionEpic, addSuscripcionEpic, removeSuscripcionEpic, editSuscripcionEpic)
