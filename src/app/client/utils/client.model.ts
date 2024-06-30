import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { FormType } from 'src/app/shared/model/form.model'
import { RepositoryEntityStatus } from 'src/app/shared/repository/repository.model'
import { Vehicle } from 'src/app/spare/utils/spare.model'
import { VehicleForm } from 'src/app/spare/utils/spare.model'

export interface Client {
  id?: string
  name?: string
  phone?: string
  vehicles?: Vehicle[]
  timestamp?: Date
  updated?: Date
  status?: ClientStatus
}

export interface ClientForm {
  name: FormControl<string | null>
  phone: FormControl<string | null>
  vehicles: FormArray<FormGroup<VehicleForm | null>>
}

export enum ClientFormVehicleSelect {
  TYPE = 'TYPE',
  BRAND = 'BRAND',
  MODEL = 'MODEL',
}

export type ClientStatus = 'open' | RepositoryEntityStatus

export interface ClientStatusControl {
  value: ClientStatus
  label: string
}
