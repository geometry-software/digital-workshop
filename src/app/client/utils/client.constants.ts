import { PaginationRequest } from 'src/app/shared/model/pagination.model'
import { Client, ClientStatus, ClientStatusControl } from './client.model'
import { FilterField, OrderRequest } from 'src/app/shared/repository/repository.model'
import { Toolbar } from 'src/app/shared/model/toolbar.model'

export abstract class ClientConstants {
  static readonly storeFeatureKey = 'Clients'
  static readonly notificationTitle = 'Clients'
  static readonly collectionName = 'clients'
  static readonly tableNoResult = 'No clients found'
  static readonly phoneMaskConfig = {
    prefix: '+55 ',
    mask: '(00) 0000 0000',
  }
  static readonly paginationTitle = 'clients'
  static readonly paginationSize = [3, 5, 10]
  static readonly toolbarSettings: Toolbar = {
    title: 'Manage information about clients',
    formButtonTitle: 'New client',
    hasSearchBar: true,
    hasStatusBar: true,
  }
  static readonly searchControlInitialValue: FilterField = { key: 'name', value: '' }
  static readonly searchFieldList: Array<any> = [
    { value: 'name', title: 'by name' },
    { value: 'phone', title: 'by phone' },
  ]
  static readonly orderControlInitialValue: OrderRequest = { key: 'timestamp', value: 'desc' }
  static readonly paginationControlInitialValue: PaginationRequest<Client> = {
    query: 'first',
    item: null,
    size: 5,
  }
  static readonly entityStatusControlInitialValue: ClientStatus = 'active'
  static readonly entityStatusList: Array<ClientStatusControl> = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ]
}
