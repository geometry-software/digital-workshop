import { createReducer, on } from '@ngrx/store'
import * as Actions from './client.actions'
import { Client } from '../utils/client.model'
import { FormUploadState } from 'src/app/shared/model/form.model'
import { RepositoryResponseList, RepositoryResponseEntity } from 'src/app/shared/repository/repository.model'
import { formatPaginationData } from 'src/app/shared/repository/repository.utils'

export interface State {
  client: Client
  formUploadState: FormUploadState<string>
  listDownloadState: FormUploadState<RepositoryResponseEntity>
  clients: RepositoryResponseList<Client>
  listResponseType: any
  responseTime: Date
  log: any
}

const initialState: State = {
  client: null,
  formUploadState: {
    loading: false,
    loaded: false,
    error: null,
  },
  listDownloadState: {
    loading: true,
    loaded: false,
    error: null,
  },
  clients: {
    data: null,
    total: null,
    current: null,
  },
  listResponseType: null,
  responseTime: null,
  log: null,
}

export const reducer = createReducer<State>(
  initialState,
  on(Actions.ClientActions.resetFormState, (state) => ({
    ...state,
    formUploadState: {
      loading: false,
      loaded: false,
      error: null,
    },
  })),
  on(Actions.ClientActions.createClient, (state) => ({
    ...state,
    formUploadState: {
      loading: true,
      loaded: false,
      error: null,
    },
  })),
  on(Actions.ClientActions.createClientSuccess, (state, { response, total }) => ({
    ...state,
    clients: {
      total: total,
    },
    formUploadState: {
      loading: false,
      loaded: response,
      error: null,
    },
  })),
  on(Actions.ClientActions.updateClient, (state) => ({
    ...state,
    formUploadState: {
      loading: true,
      loaded: false,
      error: null,
    },
  })),
  on(Actions.ClientActions.updateClientStatus, (state) => ({
    ...state,
    formUploadState: {
      loading: true,
      loaded: false,
      error: null,
    },
  })),
  on(Actions.ClientActions.updateClientSuccess, (state) => ({
    ...state,
    formUploadState: {
      loading: false,
      loaded: true,
      error: null,
    },
  })),
  on(Actions.ClientActions.getClientLogSuccess, (state, { log }) => ({
    ...state,
    log,
  })),
  on(Actions.ClientActions.getClients, (state) => ({
    ...state,
    responseTime: new Date(),
    listDownloadState: {
      loading: true,
      loaded: false,
      error: null,
    },
  })),
  on(Actions.ClientActions.getClientsSuccess, (state, { response, total, query }) => {
    const { responseTotal, current } = formatPaginationData(state, response, total, query)
    return {
      ...state,
      listResponseType: query,
      clients: {
        data: response,
        total: responseTotal,
        current: current,
      },
      listDownloadState: {
        loading: false,
        loaded: true,
        error: null,
      },
    }
  }),
  on(Actions.ClientActions.notifyError, (state, { errorType, error }) => {
    switch (errorType) {
      case 'create' || 'edit' || 'status':
        return {
          ...state,
          formUploadState: {
            loading: false,
            error: error,
          },
        }
      case 'list':
        return {
          ...state,
          listDownloadState: {
            loading: false,
            error: error,
          },
        }
      default:
        return {
          ...state,
        }
    }
  })
)
