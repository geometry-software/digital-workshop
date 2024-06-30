import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SpareListComponent } from './components/spare-list/spare-list.component'

const ROUTES: Routes = [
  {
    path: '',
    component: SpareListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [],
})
export class VehicleRoutingModule {}
