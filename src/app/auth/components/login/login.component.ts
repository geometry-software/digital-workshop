import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { fadeInOnEnterAnimation } from 'angular-animations'
import { tap } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation()],
})
export class LoginComponent {
  user = new FormControl()
  hasRequiredError: boolean
  isDisabled: boolean

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.hasRequiredError = false
    this.isDisabled = true
    if (this.user.value) {
      this.authService
        .login(this.user.value)
        .pipe(
          tap(() => {
            this.isDisabled = false
            this.router.navigateByUrl('users')
          })
        )
        .subscribe()
    } else {
      this.isDisabled = false
      this.hasRequiredError = true
    }
  }
}
