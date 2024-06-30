import { User } from 'src/app/auth/utils/auth.model'
import { Client } from 'src/app/client/utils/client.model'
import { RepositoryEntity, RepositoryEntityStatus, RepositoryLayoutService } from 'src/app/shared/repository/repository.model'
import { Spare } from 'src/app/spare/utils/spare.model'

export interface Order extends RepositoryEntity {
  client?: Client
  user?: User
  fix?: Fix
  cords?: string
}

export interface Fix {
  description?: string
  spare?: Spare
}

export type OrderStatus = 'open' | 'closed' | 'pending' | RepositoryEntityStatus

export interface OrderStatusControl {
  value: OrderStatus
  label: string
}

export interface OrderLayoutService extends RepositoryLayoutService {}
