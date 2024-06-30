import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientLayoutComponent } from './components/client-layout/client-layout.component'

const ROUTES: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class ClientRoutingModule {}
