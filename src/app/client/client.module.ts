import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { SharedModule } from '../shared/shared.module'
import { ClientRoutingModule } from './client-routing.module'
import { reducer } from './store/client.reducer'
import { ClientEffects } from './store/client.effects'
import { ClientService } from './services/client.service'
import { ClientConstants } from './utils/client.constants'
import { ClientFormComponent } from './components/client-form/client-form.component'
import { ClientListComponent } from './components/client-list/client-list.component'
import { ClientLayoutComponent } from './components/client-layout/client-layout.component'

@NgModule({
  declarations: [ClientLayoutComponent, ClientListComponent, ClientFormComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClientRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    StoreModule.forFeature(ClientConstants.storeFeatureKey, reducer),
    EffectsModule.forFeature([ClientEffects]),
  ],
  providers: [ClientService, provideNgxMask()],
})
export class ClientModule {}
