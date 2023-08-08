import { IpaginatedSuscripciones, ISuscripcionesItem } from '../models'

export enum SuscripcionesActionTypes {
  SEARCH_SUSCRIPCIONES = 'suscripciones/search',
  SEARCHING_SUSCRIPCIONES = 'suscripciones/searching',
  FOUND_SUSCRIPCIONES = 'suscripciones/found',
  SEARCHING_SUSCRIPCIONES_FAILED = 'suscripciones/searching_failed',

  LOAD_SUSCRIPCIONES = 'suscripciones/load',
  LOADING_SUSCRIPCIONES = 'suscripciones/loading',
  LOADED_SUSCRIPCIONES = 'suscripciones/loaded',
  LOADING_SUSCRIPCIONES_FAILED = 'suscripciones/loading_failed',

  ADD_SUSCRIPCIONES = 'suscripciones/add',
  ADDING_SUSCRIPCIONES = 'suscripciones/adding',
  ADDED_SUSCRIPCIONES = 'suscripciones/added',
  ADDING_SUSCRIPCIONES_FAILED = 'suscripciones/adding_failed',

  REMOVE_SUSCRIPCION = 'suscripciones/remove',
  REMOVING_SUSCRIPCION = 'suscripciones/removing',
  REMOVED_SUSCRIPCION = 'suscripciones/removed',
  REMOVING_SUSCRIPCION_FAILED = 'suscripciones/removing_failed',

  EDIT_SUSCRIPCIONES = 'suscripciones/edit',
  EDITING_SUSCRIPCIONES = 'suscripciones/editing',
  EDITED_SUSCRIPCIONES = 'suscripciones/edited',
  EDITING_SUSCRIPCIONES_FAILED = 'suscripciones/editing_failed',
}

export function searchSuscripciones(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.SEARCH_SUSCRIPCIONES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSuscripciones(): ISearchingSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES,
  }
}

export function foundSuscripciones(suscripciones: IpaginatedSuscripciones, keep?: boolean): IFoundSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.FOUND_SUSCRIPCIONES,
    keep: keep,
    payload: {
      suscripciones,
    },
  }
}

export function searchingSuscripcionesFailed(): ISearchingSuscripcionesFailedAction {
  return {
    type: SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES_FAILED,
  }
}

export function loadSuscripciones(loadOptions: TSearchOptions): ILoadSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.LOAD_SUSCRIPCIONES,
    loadOptions: loadOptions,
  }
}

export function loadingSuscripciones(): ILoadingSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.LOADING_SUSCRIPCIONES,
  }
}

export function loadedSuscripciones(suscripciones: IpaginatedSuscripciones): ILoadedSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.LOADED_SUSCRIPCIONES,
    payload: {
      suscripciones,
    },
  }
}

export function loadingSuscripcionesFailed(): ILoadingSuscripcionesFailedAction {
  return {
    type: SuscripcionesActionTypes.LOADING_SUSCRIPCIONES_FAILED,
  }
}

export function addSuscripciones(suscripcion: ISuscripcionesItem): IAddSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.ADD_SUSCRIPCIONES,
    payload: suscripcion,
  }
}

export function addingSuscripciones(): IAddingSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.ADDING_SUSCRIPCIONES,
  }
}

export function addedSuscripciones(suscripciones: IpaginatedSuscripciones): IAddedSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.ADDED_SUSCRIPCIONES,
    payload: {
      suscripciones,
    },
  }
}

export function addingSuscripcionesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSuscripcionesFailedAction {
  return {
    type: SuscripcionesActionTypes.ADDING_SUSCRIPCIONES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSuscripcion(suscripcion: ISuscripcionesItem): IRemoveSuscripcionAction {
  return {
    type: SuscripcionesActionTypes.REMOVE_SUSCRIPCION,
    payload: suscripcion,
  }
}

export function removingSuscripcion(): IRemovingSuscripcionAction {
  return {
    type: SuscripcionesActionTypes.REMOVING_SUSCRIPCION,
  }
}

export function removedSuscripcion(): IRemovedSuscripcionAction {
  return {
    type: SuscripcionesActionTypes.REMOVED_SUSCRIPCION,
  }
}

export function removingSuscripcionFailed(): IRemovingSuscripcionFailedAction {
  return {
    type: SuscripcionesActionTypes.REMOVING_SUSCRIPCION_FAILED,
  }
}

export function editSuscripciones(suscripcion: ISuscripcionesItem): IEditSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.EDIT_SUSCRIPCIONES,
    payload: suscripcion,
  }
}

export function editingSuscripciones(): IEditingSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.EDITING_SUSCRIPCIONES,
  }
}

export function editedSuscripciones(suscripciones: ISuscripcionesItem): IEditedSuscripcionesAction {
  return {
    type: SuscripcionesActionTypes.EDITED_SUSCRIPCIONES,
    payload: suscripciones,
  }
}

export function editingSuscripcionesFailed(): IEditingSuscripcionesFailedAction {
  return {
    type: SuscripcionesActionTypes.EDITING_SUSCRIPCIONES_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchSuscripcionesAction {
  type: SuscripcionesActionTypes.SEARCH_SUSCRIPCIONES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSuscripcionesAction {
  type: SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES
}

export interface IFoundSuscripcionesAction {
  type: SuscripcionesActionTypes.FOUND_SUSCRIPCIONES
  keep?: boolean
  payload: {
    suscripciones: IpaginatedSuscripciones
  }
}

export interface ISearchingSuscripcionesFailedAction {
  type: SuscripcionesActionTypes.SEARCHING_SUSCRIPCIONES_FAILED
}

export interface ILoadSuscripcionesAction {
  type: SuscripcionesActionTypes.LOAD_SUSCRIPCIONES
  loadOptions: TSearchOptions
}

export interface ILoadingSuscripcionesAction {
  type: SuscripcionesActionTypes.LOADING_SUSCRIPCIONES
}

export interface ILoadedSuscripcionesAction {
  type: SuscripcionesActionTypes.LOADED_SUSCRIPCIONES
  payload: {
    suscripciones: IpaginatedSuscripciones
  }
}

export interface ILoadingSuscripcionesFailedAction {
  type: SuscripcionesActionTypes.LOADING_SUSCRIPCIONES_FAILED
}

export interface IAddSuscripcionesAction {
  type: SuscripcionesActionTypes.ADD_SUSCRIPCIONES
  payload: ISuscripcionesItem
}

export interface IAddingSuscripcionesAction {
  type: SuscripcionesActionTypes.ADDING_SUSCRIPCIONES
}

export interface IAddedSuscripcionesAction {
  type: SuscripcionesActionTypes.ADDED_SUSCRIPCIONES
  payload: {
    suscripciones: IpaginatedSuscripciones
  }
}

export interface IAddingSuscripcionesFailedAction {
  type: SuscripcionesActionTypes.ADDING_SUSCRIPCIONES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSuscripcionAction {
  type: SuscripcionesActionTypes.REMOVE_SUSCRIPCION
  payload: ISuscripcionesItem
}

export interface IRemovingSuscripcionAction {
  type: SuscripcionesActionTypes.REMOVING_SUSCRIPCION
}

export interface IRemovedSuscripcionAction {
  type: SuscripcionesActionTypes.REMOVED_SUSCRIPCION
}

export interface IRemovingSuscripcionFailedAction {
  type: SuscripcionesActionTypes.REMOVING_SUSCRIPCION_FAILED
}

export interface IEditSuscripcionesAction {
  type: SuscripcionesActionTypes.EDIT_SUSCRIPCIONES
  payload: ISuscripcionesItem
}

export interface IEditingSuscripcionesAction {
  type: SuscripcionesActionTypes.EDITING_SUSCRIPCIONES
}

export interface IEditedSuscripcionesAction {
  type: SuscripcionesActionTypes.EDITED_SUSCRIPCIONES
  payload: ISuscripcionesItem
}

export interface IEditingSuscripcionesFailedAction {
  type: SuscripcionesActionTypes.EDITING_SUSCRIPCIONES_FAILED
}

export type SuscripcionesAction =
  | ISearchSuscripcionesAction
  | ISearchingSuscripcionesAction
  | IFoundSuscripcionesAction
  | ISearchingSuscripcionesFailedAction
  | ILoadSuscripcionesAction
  | ILoadingSuscripcionesAction
  | ILoadedSuscripcionesAction
  | ILoadingSuscripcionesFailedAction
  | IAddSuscripcionesAction
  | IAddingSuscripcionesAction
  | IAddedSuscripcionesAction
  | IAddingSuscripcionesFailedAction
  | IRemoveSuscripcionAction
  | IRemovingSuscripcionAction
  | IRemovedSuscripcionAction
  | IRemovingSuscripcionFailedAction
  | IEditSuscripcionesAction
  | IEditingSuscripcionesAction
  | IEditedSuscripcionesAction
  | IEditingSuscripcionesFailedAction
