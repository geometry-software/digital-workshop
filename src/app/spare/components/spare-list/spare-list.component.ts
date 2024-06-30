import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Observable, filter, map, shareReplay, switchMap } from 'rxjs'
import { NhtsaService } from '../../../shared/services/nhtsa.service'
import { SpareConstants } from '../../utils/spare.constants'
import { VehicleBodyType } from '../../utils/spare.model'

@Component({
  selector: 'app-spare-list',
  templateUrl: './spare-list.component.html',
  styleUrls: ['./spare-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpareListComponent implements OnInit {
  readonly vehicleBodyType = VehicleBodyType
  readonly toolbarSettings = SpareConstants.toolbarSettings

  bodyType: FormControl = new FormControl(null)
  vehicleName: FormControl = new FormControl(null)

  vehiclesList$: Observable<any>
  manufacturerDetails$: Observable<any>

  constructor(private nhtsaService: NhtsaService) {}

  ngOnInit() {
    this.vehiclesList$ = this.bodyType.valueChanges.pipe(
      switchMap((value) => this.nhtsaService.getVehiclesByBodyType(value)),
      shareReplay(1)
    )
    this.manufacturerDetails$ = this.vehicleName.valueChanges.pipe(
      filter((value) => !!value),
      switchMap((response) => this.nhtsaService.getManufacturerDetails(response.MakeName).pipe(map((manufacturer) => manufacturer.Results)))
    )
  }
}
