import { Component, ChangeDetectionStrategy, inject, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Order, OrderLayoutService, OrderStatus } from '../../utils/order.model'
import { FormService } from 'src/app/shared/services/form.service'
import { ActivatedRoute } from '@angular/router'
import { FormLayout } from 'src/app/shared/model/form.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit {
  /** Layout inputs */
  @Input()
  layoutService: OrderLayoutService
  @Input()
  formUrl

  /** DI properties*/
  readonly formService: FormService = inject(FormService)
  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  /** Form properties*/
  formLayout$: Observable<FormLayout<Order>>

  ngOnInit(): void {
    this.formLayout$ = this.formService.getFormLayout(this.formUrl)
  }

  formSubmit(form: FormGroup) {
    if (form.valid) {
      this.layoutService.create<Order>(this.formService.transformFormValueToCreateObject<Order, OrderStatus>(form, 'open'))
      form.reset()
    } else {
      this.formService.highlightInvalidFields(form)
    }
  }
}
