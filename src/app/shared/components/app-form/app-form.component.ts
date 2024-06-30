import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { FormLayout } from '../../model/form.model'

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class FormComponent {
  @Input()
  formLayout$: Observable<FormLayout<any>>
  @Output()
  formSubmit = new EventEmitter()
}
