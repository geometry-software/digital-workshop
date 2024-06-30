import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './components/login/login.component'
import { SharedModule } from '../shared/shared.module'
import { UsersComponent } from './components/users/users.component'

@NgModule({
  declarations: [LoginComponent, UsersComponent],
  exports: [UsersComponent],
  imports: [RouterModule, CommonModule, SharedModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
