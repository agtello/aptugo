import { IpaginatedSuscripcion, ISuscripcionItem } from '../models'

export enum SuscripcionActionTypes {
  SEARCH_SUSCRIPCION = 'suscripcion/search',
  SEARCHING_SUSCRIPCION = 'suscripcion/searching',
  FOUND_SUSCRIPCION = 'suscripcion/found',
  SEARCHING_SUSCRIPCION_FAILED = 'suscripcion/searching_failed',

  LOAD_SUSCRIPCION = 'suscripcion/load',
  LOADING_SUSCRIPCION = 'suscripcion/loading',
  LOADED_SUSCRIPCION = 'suscripcion/loaded',
  LOADING_SUSCRIPCION_FAILED = 'suscripcion/loading_failed',

  ADD_SUSCRIPCION = 'suscripcion/add',
  ADDING_SUSCRIPCION = 'suscripcion/adding',
  ADDED_SUSCRIPCION = 'suscripcion/added',
  ADDING_SUSCRIPCION_FAILED = 'suscripcion/adding_failed',

  REMOVE_SINGLEUNTITLED = 'suscripcion/remove',
  REMOVING_SINGLEUNTITLED = 'suscripcion/removing',
  REMOVED_SINGLEUNTITLED = 'suscripcion/removed',
  REMOVING_SINGLEUNTITLED_FAILED = 'suscripcion/removing_failed',

  EDIT_SUSCRIPCION = 'suscripcion/edit',
  EDITING_SUSCRIPCION = 'suscripcion/editing',
  EDITED_SUSCRIPCION = 'suscripcion/edited',
  EDITING_SUSCRIPCION_FAILED = 'suscripcion/editing_failed',
}

export function searchSuscripcion(searchOptions: TSearchOptions | string, keep?: boolean): ISearchSuscripcionAction {
  return {
    type: SuscripcionActionTypes.SEARCH_SUSCRIPCION,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingSuscripcion(): ISearchingSuscripcionAction {
  return {
    type: SuscripcionActionTypes.SEARCHING_SUSCRIPCION,
  }
}

export function foundSuscripcion(suscripcion: IpaginatedSuscripcion, keep?: boolean): IFoundSuscripcionAction {
  return {
    type: SuscripcionActionTypes.FOUND_SUSCRIPCION,
    keep: keep,
    payload: {
      suscripcion,
    },
  }
}

export function searchingSuscripcionFailed(): ISearchingSuscripcionFailedAction {
  return {
    type: SuscripcionActionTypes.SEARCHING_SUSCRIPCION_FAILED,
  }
}

export function loadSuscripcion(loadOptions: TSearchOptions): ILoadSuscripcionAction {
  return {
    type: SuscripcionActionTypes.LOAD_SUSCRIPCION,
    loadOptions: loadOptions,
  }
}

export function loadingSuscripcion(): ILoadingSuscripcionAction {
  return {
    type: SuscripcionActionTypes.LOADING_SUSCRIPCION,
  }
}

export function loadedSuscripcion(suscripcion: IpaginatedSuscripcion): ILoadedSuscripcionAction {
  return {
    type: SuscripcionActionTypes.LOADED_SUSCRIPCION,
    payload: {
      suscripcion,
    },
  }
}

export function loadingSuscripcionFailed(): ILoadingSuscripcionFailedAction {
  return {
    type: SuscripcionActionTypes.LOADING_SUSCRIPCION_FAILED,
  }
}

export function addSuscripcion(singleuntitled: ISuscripcionItem): IAddSuscripcionAction {
  return {
    type: SuscripcionActionTypes.ADD_SUSCRIPCION,
    payload: singleuntitled,
  }
}

export function addingSuscripcion(): IAddingSuscripcionAction {
  return {
    type: SuscripcionActionTypes.ADDING_SUSCRIPCION,
  }
}

export function addedSuscripcion(suscripcion: IpaginatedSuscripcion): IAddedSuscripcionAction {
  return {
    type: SuscripcionActionTypes.ADDED_SUSCRIPCION,
    payload: {
      suscripcion,
    },
  }
}

export function addingSuscripcionFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingSuscripcionFailedAction {
  return {
    type: SuscripcionActionTypes.ADDING_SUSCRIPCION_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeSingleuntitled(singleuntitled: ISuscripcionItem): IRemoveSingleuntitledAction {
  return {
    type: SuscripcionActionTypes.REMOVE_SINGLEUNTITLED,
    payload: singleuntitled,
  }
}

export function removingSingleuntitled(): IRemovingSingleuntitledAction {
  return {
    type: SuscripcionActionTypes.REMOVING_SINGLEUNTITLED,
  }
}

export function removedSingleuntitled(): IRemovedSingleuntitledAction {
  return {
    type: SuscripcionActionTypes.REMOVED_SINGLEUNTITLED,
  }
}

export function removingSingleuntitledFailed(): IRemovingSingleuntitledFailedAction {
  return {
    type: SuscripcionActionTypes.REMOVING_SINGLEUNTITLED_FAILED,
  }
}

export function editSuscripcion(singleuntitled: ISuscripcionItem): IEditSuscripcionAction {
  return {
    type: SuscripcionActionTypes.EDIT_SUSCRIPCION,
    payload: singleuntitled,
  }
}

export function editingSuscripcion(): IEditingSuscripcionAction {
  return {
    type: SuscripcionActionTypes.EDITING_SUSCRIPCION,
  }
}

export function editedSuscripcion(suscripcion: ISuscripcionItem): IEditedSuscripcionAction {
  return {
    type: SuscripcionActionTypes.EDITED_SUSCRIPCION,
    payload: suscripcion,
  }
}

export function editingSuscripcionFailed(): IEditingSuscripcionFailedAction {
  return {
    type: SuscripcionActionTypes.EDITING_SUSCRIPCION_FAILED,
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

export interface ISearchSuscripcionAction {
  type: SuscripcionActionTypes.SEARCH_SUSCRIPCION
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingSuscripcionAction {
  type: SuscripcionActionTypes.SEARCHING_SUSCRIPCION
}

export interface IFoundSuscripcionAction {
  type: SuscripcionActionTypes.FOUND_SUSCRIPCION
  keep?: boolean
  payload: {
    suscripcion: IpaginatedSuscripcion
  }
}

export interface ISearchingSuscripcionFailedAction {
  type: SuscripcionActionTypes.SEARCHING_SUSCRIPCION_FAILED
}

export interface ILoadSuscripcionAction {
  type: SuscripcionActionTypes.LOAD_SUSCRIPCION
  loadOptions: TSearchOptions
}

export interface ILoadingSuscripcionAction {
  type: SuscripcionActionTypes.LOADING_SUSCRIPCION
}

export interface ILoadedSuscripcionAction {
  type: SuscripcionActionTypes.LOADED_SUSCRIPCION
  payload: {
    suscripcion: IpaginatedSuscripcion
  }
}

export interface ILoadingSuscripcionFailedAction {
  type: SuscripcionActionTypes.LOADING_SUSCRIPCION_FAILED
}

export interface IAddSuscripcionAction {
  type: SuscripcionActionTypes.ADD_SUSCRIPCION
  payload: ISuscripcionItem
}

export interface IAddingSuscripcionAction {
  type: SuscripcionActionTypes.ADDING_SUSCRIPCION
}

export interface IAddedSuscripcionAction {
  type: SuscripcionActionTypes.ADDED_SUSCRIPCION
  payload: {
    suscripcion: IpaginatedSuscripcion
  }
}

export interface IAddingSuscripcionFailedAction {
  type: SuscripcionActionTypes.ADDING_SUSCRIPCION_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveSingleuntitledAction {
  type: SuscripcionActionTypes.REMOVE_SINGLEUNTITLED
  payload: ISuscripcionItem
}

export interface IRemovingSingleuntitledAction {
  type: SuscripcionActionTypes.REMOVING_SINGLEUNTITLED
}

export interface IRemovedSingleuntitledAction {
  type: SuscripcionActionTypes.REMOVED_SINGLEUNTITLED
}

export interface IRemovingSingleuntitledFailedAction {
  type: SuscripcionActionTypes.REMOVING_SINGLEUNTITLED_FAILED
}

export interface IEditSuscripcionAction {
  type: SuscripcionActionTypes.EDIT_SUSCRIPCION
  payload: ISuscripcionItem
}

export interface IEditingSuscripcionAction {
  type: SuscripcionActionTypes.EDITING_SUSCRIPCION
}

export interface IEditedSuscripcionAction {
  type: SuscripcionActionTypes.EDITED_SUSCRIPCION
  payload: ISuscripcionItem
}

export interface IEditingSuscripcionFailedAction {
  type: SuscripcionActionTypes.EDITING_SUSCRIPCION_FAILED
}

export type SuscripcionAction =
  | ISearchSuscripcionAction
  | ISearchingSuscripcionAction
  | IFoundSuscripcionAction
  | ISearchingSuscripcionFailedAction
  | ILoadSuscripcionAction
  | ILoadingSuscripcionAction
  | ILoadedSuscripcionAction
  | ILoadingSuscripcionFailedAction
  | IAddSuscripcionAction
  | IAddingSuscripcionAction
  | IAddedSuscripcionAction
  | IAddingSuscripcionFailedAction
  | IRemoveSingleuntitledAction
  | IRemovingSingleuntitledAction
  | IRemovedSingleuntitledAction
  | IRemovingSingleuntitledFailedAction
  | IEditSuscripcionAction
  | IEditingSuscripcionAction
  | IEditedSuscripcionAction
  | IEditingSuscripcionFailedAction
