import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RepositoryService } from 'src/app/shared/repository/repository.service'
import { OrderRequest, RepositoryLayoutService, RepositoryResponseEntity } from 'src/app/shared/repository/repository.model'
import { OrderConstants } from '../utils/order.constants'

@Injectable()
export class OrderService implements RepositoryLayoutService {
  readonly collection = OrderConstants.collectionName

  constructor(private repositoryService: RepositoryService) {}

  getAll<T>(): Observable<T[]> {
    return this.repositoryService.getAllDocuments<T>(this.collection)
  }

  getById<T>(id: string): Observable<T> {
    return this.repositoryService.getDocumentById(this.collection, id)
  }

  getTotalByStatus<S>(status: S): Observable<number> {
    return this.repositoryService.getCollectionSize<S>(this.collection, status)
  }

  getFirstPage<T, S>(order: OrderRequest, size: number, status: S): Observable<T[]> {
    return this.repositoryService.getFirstPage<T, S>(this.collection, order, size, status)
  }

  getNextPage<T, S, V>(order: OrderRequest, size: number, status: S, value: V): Observable<T[]> {
    return this.repositoryService.getNextPage<T, S, V>(this.collection, order, size, status, value)
  }

  getPreviousPage<T, S, V>(order: OrderRequest, size: number, status: S, value: V): Observable<T[]> {
    return this.repositoryService.getPreviousPage<T, S, V>(this.collection, order, size, status, value)
  }

  getAllByQuery<T>(property: string, value: string): Observable<T[]> {
    return this.repositoryService.getAllDocumentsByIncludesQuery<T>(this.collection, property, value)
  }

  create<T>(item: T): Observable<RepositoryResponseEntity> {
    return this.repositoryService.createDocument<T>(this.collection, item)
  }

  createOrder<T>(item: T): Observable<RepositoryResponseEntity> {
    return this.repositoryService.createDocument<T>(this.collection, item)
  }

  update<T>(item: T, id: string): Observable<void> {
    return this.repositoryService.updateDocument(this.collection, item, id)
  }

  updateStatus<T>(id: string, status: T): Observable<void> {
    return this.repositoryService.updateDocument(this.collection, { status: status }, id)
  }
}
