import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from './client.reducer'
import { ClientConstants } from '../utils/client.constants'
import { requestDuration } from 'src/app/shared/repository/repository.utils'

const paginationTitle: string = ClientConstants.paginationTitle
const paginationSize: Array<number> = ClientConstants.paginationSize
const storeFeatureKey: string = ClientConstants.storeFeatureKey

export const getState = createFeatureSelector<State>(storeFeatureKey)
export const getClient = createSelector(getState, (state) => state.client)
export const getClientLog = createSelector(getState, (state) => state.log)
export const getClients = createSelector(getState, (state) => state.clients.data)
export const getResponseTime = createSelector(getState, (state) => {
  return state.listDownloadState.loaded ? state.responseTime : null
})
export const getPaginationItem = createSelector(getClients, (state) => ({
  first: state?.length ? [...state][0] : null,
  last: state?.length ? [...state].pop() : null,
}))
export const getFormUploadState = createSelector(getState, (state) => state.formUploadState)
export const getListDownloadState = createSelector(getState, (state) => state.listDownloadState)
export const getTotal = createSelector(getState, (state) => state.clients.total)
export const getCurrent = createSelector(getState, (state) => state.clients.current)
export const getListResponseType = createSelector(getState, (state) => state.listResponseType)
export const getPaginationResponse = createSelector(getPaginationItem, getCurrent, getTotal, getResponseTime, (item, current, total, time) => ({
  item: {
    first: item.first,
    last: item.last,
  },
  options: {
    current: current,
    total: total,
    title: paginationTitle,
    sizeList: paginationSize,
  },
  responseTime: requestDuration(time),
}))
