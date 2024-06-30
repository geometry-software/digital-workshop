import { Injectable } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd/modal'
import { AppConfirmationModal } from '../components/app-confirmation-modal/app-confirmation-modal.component'
import { ConfirmationModal } from '../model/shared.model'

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private modalService: NzModalService) {}

  confirm = (data: ConfirmationModal) =>
    this.modalService.create({
      nzContent: AppConfirmationModal,
      nzFooter: null,
      nzCentered: true,
      nzAutofocus: null,
      nzData: {
        title: data.title,
        text: data.text,
        confirm: data.confirm,
      },
    })
}
