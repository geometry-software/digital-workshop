import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { OrderConstants } from '../../utils/order.constants'
import { FormControl } from '@angular/forms'
import { RepositoryEntityAction } from 'src/app/shared/repository/repository.model'
import { startWith, tap } from 'rxjs'
import { OrderService } from '../../services/order.service'
import { OrderLayoutService } from '../../utils/order.model'

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderLayoutComponent implements OnInit {
  /** Layout service*/
  readonly layoutService: OrderLayoutService = inject(OrderService)

  /** Constants properties */
  readonly toolbarSettings = OrderConstants.toolbarSettings
  readonly formUrl: string = OrderConstants.formTemplate

  /** Layout controls*/
  readonly actionsControl: FormControl<RepositoryEntityAction> = new FormControl('create')
  isFormLayout: boolean
  isListLayout: boolean

  ngOnInit(): void {
    this.actionsControl?.valueChanges
      .pipe(
        startWith(this.actionsControl.value),
        tap((value) => {
          this.isFormLayout = false
          this.isListLayout = false
          value === 'create' ? (this.isFormLayout = true) : (this.isListLayout = true)
        })
      )
      .subscribe()
  }
}
