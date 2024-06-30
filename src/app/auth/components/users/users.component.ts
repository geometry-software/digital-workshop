import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { User } from '../../utils/auth.model'
import { AuthConstants } from '../../utils/auth.constants'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly toolbarSettings = AuthConstants.toolbarSettings
  readonly listData$: Observable<User[]> = inject(AuthService).users
}
