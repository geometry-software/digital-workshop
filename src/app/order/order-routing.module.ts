import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrderLayoutComponent } from './components/order-layout/order-layout.component'

const routes: Routes = [
  {
    path: '',
    component: OrderLayoutComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OrderRoutingModule {}
