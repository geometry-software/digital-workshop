import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { VehicleBodyType, VehicleEquipmentType, VehicleReportType } from 'src/app/spare/utils/spare.model'

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/'

interface NhtsaResponse {
  Count: number
  Message: string
  Results: []
  SearchCriteria: string
}

@Injectable({
  providedIn: 'root',
})
export class NhtsaService {
  constructor(private httpClient: HttpClient) {}

  getVehiclesByBodyType(type: VehicleBodyType): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(BASE_URL + `GetMakesForVehicleType/${type}?format=json`)
  }

  getVehicleModelsById(id: number): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(BASE_URL + `GetModelsForMakeId/${id}?format=json`)
  }

  getVehicleModelsByIdAndYear(id: number, year: number): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(BASE_URL + `GetModelsForMakeIdYear/makeId/${id}/modelyear/${year}?format=json`)
  }

  getVehicleBodyTypesById(id: number): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(BASE_URL + `GetVehicleTypesForMakeId/${id}?format=json`)
  }

  getManufacturerDetails(manufacturer: string): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(BASE_URL + `getmanufacturerdetails/${manufacturer}?format=json`)
  }

  getEquipmentPlantCodes(year: number, equipmentType: VehicleEquipmentType, reportType: VehicleReportType): Observable<NhtsaResponse> {
    return this.httpClient.get<NhtsaResponse>(
      BASE_URL + `GetEquipmentPlantCodes?year=${year}&equipmentType=${equipmentType}&reportType=${reportType}&format=json`
    )
  }
}
