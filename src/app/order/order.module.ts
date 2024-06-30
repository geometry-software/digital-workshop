import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { OrderRoutingModule } from './order-routing.module'
import { NgZorroAntdModule } from '../shared/design-system/ng-zorro.module'
import { SharedModule } from '../shared/shared.module'
import { OrderService } from './services/order.service'
import { OrderLayoutComponent } from './components/order-layout/order-layout.component'
import { OrderListComponent } from './components/order-list/order-list.component'
import { OrderFormComponent } from './components/order-form/order-form.component'

@NgModule({
  declarations: [OrderLayoutComponent, OrderListComponent, OrderFormComponent],
  imports: [RouterModule, CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, OrderRoutingModule, SharedModule],
  providers: [OrderService],
})
export class OrderModule {}
