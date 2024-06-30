import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal'
import { ConfirmationModal } from '../../model/shared.model'

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './app-confirmation-modal.component.html',
  styleUrls: ['./app-confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppConfirmationModal {
  readonly modalData: ConfirmationModal = inject(NZ_MODAL_DATA)
  constructor(public modal: NzModalRef) {}
}
