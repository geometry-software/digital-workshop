import { Injectable } from '@angular/core'
import { NzNotificationRef, NzNotificationService } from 'ng-zorro-antd/notification'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private nzNotificationService: NzNotificationService) {}

  notifyCreateSuccess = (title: string): NzNotificationRef => this.nzNotificationService.success('Done', `${title} was successfully saved`)

  notifyEditSuccess = (title: string): NzNotificationRef => this.nzNotificationService.success('Done', `${title} successfully edited`)

  notifyError = (): NzNotificationRef => this.nzNotificationService.error('Connection Error', 'Check internet connection or try later')

  notifyConnectionWarning = (): NzNotificationRef =>
    this.nzNotificationService.warning('Server does not respond', 'Another request attempt is proceeded')
}
