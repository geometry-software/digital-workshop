import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Client, ClientStatus } from '../utils/client.model'
import { Log, RepositoryRequest, RepositoryRequestQuery, RepositoryEntityAction } from 'src/app/shared/repository/repository.model'

export const ClientActions = createActionGroup({
  source: 'CLIENTS',
  events: {
    'Create Client': props<{ item: Client }>(),
    'Create Client Success': props<{ response: string; total: number }>(),
    'Update Client': props<{ item: Client; log: Log<Client> }>(),
    'Update Client Status': props<{ id: string; status: ClientStatus }>(),
    'Update Client Success': emptyProps(),
    'Get Client Log': props<{ id: string }>(),
    'Get Client Log Success': props<{ log: any }>(),
    'Get Clients': props<{ request: RepositoryRequest<Client, ClientStatus> }>(),
    'Get Clients Success': props<{ response: Client[]; query: RepositoryRequestQuery; total?: number }>(),
    'Notify Error': props<{ error: Error; errorType: RepositoryEntityAction }>(),
    'Reset Form State': emptyProps(),
    'Reset List State': emptyProps(),
  },
})
