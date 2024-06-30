import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core'
import { ClientFormComponent } from '../client-form/client-form.component'
import { NzModalService } from 'ng-zorro-antd/modal'
import { FormControl } from '@angular/forms'
import { Observable, combineLatest, debounceTime, filter, startWith, tap } from 'rxjs'
import { Client, ClientStatus } from '../../utils/client.model'
import { Store } from '@ngrx/store'
import { FormType, FormUploadState } from 'src/app/shared/model/form.model'
import { ClientActions } from '../../store/client.actions'
import * as ClientSelectors from '../../store/client.selectors'
import { ClientConstants } from '../../utils/client.constants'
import {
  FilterField,
  OrderRequest,
  RepositoryEntityAction,
  RepositoryRequest,
  RepositoryResponseEntity,
} from 'src/app/shared/repository/repository.model'
import { ActivatedRoute } from '@angular/router'
import { PaginationRequest, PaginationResponse } from 'src/app/shared/model/pagination.model'
import { NzTableQueryParams } from 'ng-zorro-antd/table'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  readonly modalService: NzModalService = inject(NzModalService)
  readonly route: ActivatedRoute = inject(ActivatedRoute)
  readonly store$: Store = inject(Store)
  readonly expandSet: Set<string> = new Set()

  readonly paginationTitle = ClientConstants.collectionName
  readonly noResultText = ClientConstants.tableNoResult
  readonly searchControlInitialValue = ClientConstants.searchControlInitialValue
  readonly paginationControlInitialValue = ClientConstants.paginationControlInitialValue
  readonly orderControlInitialValue = ClientConstants.orderControlInitialValue
  readonly FormType = FormType

  @Input()
  searchControl: FormControl<FilterField>
  @Input()
  hasSearchValueControl: FormControl<boolean>
  @Input()
  actionsControl: FormControl<RepositoryEntityAction>
  @Input()
  entityStatusControl: FormControl<ClientStatus>
  paginationControl: FormControl<PaginationRequest<Client>> = new FormControl(this.paginationControlInitialValue)
  orderControl: FormControl<OrderRequest> = new FormControl(this.orderControlInitialValue)

  readonly listDownloadState$: Observable<FormUploadState<RepositoryResponseEntity>> = this.store$.select(ClientSelectors.getListDownloadState)
  readonly paginationPayload$: Observable<PaginationResponse<Client>> = this.store$.select(ClientSelectors.getPaginationResponse)
  readonly formUploadState$: Observable<FormUploadState<string>> = this.store$.select(ClientSelectors.getFormUploadState)
  readonly tableData$: Observable<Client[]> = this.store$.select(ClientSelectors.getClients)

  ngOnInit() {
    this.initData()
    this.initFormControls()
  }

  initData() {
    combineLatest([
      this.paginationControl.valueChanges.pipe(startWith(this.paginationControl.value)),
      this.entityStatusControl.valueChanges.pipe(startWith(this.entityStatusControl.value)),
      this.orderControl.valueChanges.pipe(startWith(this.orderControl.value)),
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(500)),
    ])
      .pipe(
        tap(([pagination, status, order, search]) => {
          const request: RepositoryRequest<Client, ClientStatus> = {
            query: search?.value ? 'custom' : pagination.query,
            pagination: pagination,
            filter: {
              status: status,
              field: {
                key: search.key,
                value: search.value,
              },
            },
            order: {
              key: order.key,
              value: order.value,
            },
          }
          this.hasSearchValueControl.setValue(!!search?.value ?? false)
          this.store$.dispatch(ClientActions.getClients({ request }))
        })
      )
      .subscribe()
  }

  initFormControls() {
    this.actionsControl.valueChanges
      .pipe(
        filter((value) => !!value),
        tap(() => this.open(FormType.CREATE))
      )
      .subscribe()
    this.formUploadState$
      .pipe(
        filter((value) => !!value.loaded),
        tap(() => this.getFirstPage())
      )
      .subscribe()
  }

  getFirstPage() {
    this.searchControl.setValue(this.searchControlInitialValue)
    this.paginationControl.setValue(this.paginationControlInitialValue)
  }

  changeSort(event: NzTableQueryParams) {
    const sort = event.sort.filter((el) => el.value)
    if (sort.length > 0) {
      this.orderControl.setValue({
        key: sort[0].key,
        value: sort[0].value === 'ascend' ? 'asc' : 'desc',
      })
    }
  }

  open(type: FormType, item: Client = null) {
    this.modalService.create({
      nzContent: ClientFormComponent,
      nzWidth: '70vw',
      nzFooter: null,
      nzData: {
        type: type,
        item: item,
      },
    })
  }

  onExpandChange(id: string, checked: boolean) {
    checked ? this.expandSet.add(id) : this.expandSet.delete(id)
  }
}
