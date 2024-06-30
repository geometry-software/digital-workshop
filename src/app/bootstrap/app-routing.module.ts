import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { IndexComponent } from './components/index/index.component'
import { AuthGuard } from '../auth/services/guard.service'
import { AppNotFoundComponent } from '../shared/components/app-not-found/app-not-found.component'
import { UsersComponent } from '../auth/components/users/users.component'

export const ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: NavbarComponent,
    children: [
      {
        path: 'clients',
        loadChildren: () => import('../client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'spares',
        loadChildren: () => import('../spare/spare.module').then((m) => m.VehicleModule),
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'orders',
        loadChildren: () => import('../order/order.module').then((m) => m.OrderModule),
      },
      { path: '', component: IndexComponent },

      { path: '**', component: AppNotFoundComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
