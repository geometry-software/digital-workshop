import { FormControl } from '@angular/forms'

export interface Vehicle {
  id?: string
  type?: VehicleBodyType
  brand?: VehicleBrand
  model?: VehicleModel
  year?: number
  plate?: string
}

export interface VehicleBrand {
  MakeId: number
  MakeName: string
  VehicleTypeId: number
  VehicleTypeName: string
}

export interface VehicleModel {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

export interface VehicleForm {
  type: FormControl<VehicleBodyType | null>
  brand: FormControl<VehicleBrand | null>
  model: FormControl<VehicleModel | null>
  year: FormControl<number | null>
  plate: FormControl<string | null>
}

export enum VehicleBodyType {
  CAR = 'car',
  MOTO = 'moto',
  TRUCK = 'truck',
  BUS = 'bus',
}

export enum VehicleEquipmentType {
  TIRES = 1,
  BRAKE_HOSES = 3,
  GLAZING = 13,
  RETREAD = 16,
}

export enum VehicleReportType {
  ASSIGNED_DURING_SELECTED_YEAR = 'new',
  MODIFIED_DURING_SELECTED_YEAR = 'updated',
  NO_LONGER_ACTIVE = 'closed',
  ALL = 'all',
}

export enum Spare {
  BODY = 'BODY',
  DOOR = 'DOOR',
  GAUGES = 'GAUGES',
  SENSORS = 'SENSORS',
  BREAKS = 'BREAKS',
  ENGINE = 'ENGINE',
  FUEL = 'FUEL',
  AC = 'AC',
}
