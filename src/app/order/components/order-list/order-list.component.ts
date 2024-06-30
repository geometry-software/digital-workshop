import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Order, OrderLayoutService } from '../../utils/order.model'

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  /** Layout inputs */
  @Input()
  layoutService: OrderLayoutService

  /** List properties*/
  listData$: Observable<Order[]>
  ngOnInit(): void {
    this.listData$ = this.layoutService.getAll<Order>()
  }
}
