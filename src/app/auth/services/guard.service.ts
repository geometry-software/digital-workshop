import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    if (this.authService?.user) {
      return true
    } else {
      this.router.navigate(['auth'])
      return false
    }
  }
}
