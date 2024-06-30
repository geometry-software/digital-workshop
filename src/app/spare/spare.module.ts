import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { VehicleRoutingModule } from './spare-routing.module'
import { NgZorroAntdModule } from '../shared/design-system/ng-zorro.module'
import { SpareListComponent } from './components/spare-list/spare-list.component'
import { SharedModule } from '../shared/shared.module'
import { SpareService } from './services/spare.service'

@NgModule({
  declarations: [SpareListComponent],
  exports: [],
  imports: [RouterModule, CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, VehicleRoutingModule, SharedModule],
  providers: [SpareService],
})
export class VehicleModule {}
