import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs'
import { ClientActions } from './client.actions'
import { ClientService } from '../services/client.service'
import { NotificationService } from 'src/app/shared/services/notification.service'
import { Client, ClientStatus } from '../utils/client.model'
import { ClientConstants } from '../utils/client.constants'
import { responseTransform } from 'src/app/shared/repository/repository.utils'

@Injectable()
export class ClientEffects {
  constructor(private actions$: Actions, private clientService: ClientService, private notificationService: NotificationService) {}

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.createClient),
      switchMap(({ item }) =>
        this.clientService.create<Client>(item).pipe(
          switchMap((response) =>
            this.clientService.getTotalByStatus<ClientStatus>(item.status).pipe(
              map((total) => {
                this.notificationService.notifyCreateSuccess(ClientConstants.notificationTitle)
                return ClientActions.createClientSuccess({ response: response.id, total })
              }),
              catchError((error) => of(ClientActions.notifyError({ error, errorType: 'create' })))
            )
          )
        )
      )
    )
  )

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClient),
      switchMap(({ item, log }) =>
        forkJoin([this.clientService.update<Client>(item, item.id), this.clientService.log<Client>(log)]).pipe(
          map(() => {
            this.notificationService.notifyEditSuccess(ClientConstants.notificationTitle)
            return ClientActions.updateClientSuccess()
          }),
          catchError((error) => of(ClientActions.notifyError({ error, errorType: 'edit' })))
        )
      )
    )
  )

  updateClientStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.updateClientStatus),
      switchMap(({ id, status }) =>
        forkJoin([this.clientService.updateStatus<ClientStatus>(id, status), this.clientService.log<Client>({ status })]).pipe(
          map(() => {
            this.notificationService.notifyEditSuccess(ClientConstants.notificationTitle)
            return ClientActions.updateClientSuccess()
          }),
          catchError((error) => of(ClientActions.notifyError({ error, errorType: 'status' })))
        )
      )
    )
  )

  clientsController$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getClients),
      switchMap(({ request }) => {
        const size = request.pagination.size
        const item = request.pagination.item
        const order = request.order
        const status = request.filter.status
        const field = request.filter.field
        switch (request.query) {
          case 'first':
            return this.clientService.getFirstPage<Client, ClientStatus>(order, size, status).pipe(
              responseTransform(this.notificationService),
              switchMap((response) =>
                this.clientService
                  .getTotalByStatus<ClientStatus>(status)
                  .pipe(map((total) => ClientActions.getClientsSuccess({ response, query: 'first', total })))
              ),
              catchError((error) => of(ClientActions.notifyError({ error, errorType: 'list' })))
            )
          case 'next':
            return this.clientService.getNextPage<Client, ClientStatus, typeof order.key>(order, size, status, item[order.key]).pipe(
              responseTransform(this.notificationService),
              map((response) => ClientActions.getClientsSuccess({ response, query: 'next' })),
              catchError((error) => of(ClientActions.notifyError({ error, errorType: 'list' })))
            )
          case 'previous':
            return this.clientService.getPreviousPage<Client, ClientStatus, typeof order.key>(order, size, status, item[order.key]).pipe(
              responseTransform(this.notificationService),
              map((response) => ClientActions.getClientsSuccess({ response, query: 'previous' })),
              catchError((error) => of(ClientActions.notifyError({ error, errorType: 'list' })))
            )
          case 'custom':
            return this.clientService.getAllByQuery<Client>(field.key, field.value).pipe(
              responseTransform(this.notificationService),
              map((response) => ClientActions.getClientsSuccess({ response, query: 'custom', total: response.length })),
              catchError((error) => of(ClientActions.notifyError({ error, errorType: 'list' })))
            )
        }
      })
    )
  )

  getClientLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.getClientLog),
      switchMap(({ id }) =>
        this.clientService.getLog<Client>({ key: 'timestamp', value: 'desc' }, id).pipe(
          map((log) => ClientActions.getClientLogSuccess({ log })),
          catchError((error) => of(ClientActions.notifyError({ error, errorType: 'log' })))
        )
      )
    )
  )

  notifyError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ClientActions.notifyError),
        tap(({ error }) => console.error(error)),
        switchMap(() => of(this.notificationService.notifyError()))
      ),
    { dispatch: false }
  )
}
