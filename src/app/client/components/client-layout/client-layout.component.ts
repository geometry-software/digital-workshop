import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ClientStatus } from '../../utils/client.model'
import { FilterField, RepositoryEntityAction } from 'src/app/shared/repository/repository.model'
import { ClientConstants } from '../../utils/client.constants'

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutComponent {
  readonly toolbarSettings = ClientConstants.toolbarSettings
  readonly searchControlInitialValue = ClientConstants.searchControlInitialValue
  readonly searchFieldList = ClientConstants.searchFieldList
  readonly entityStatusList = ClientConstants.entityStatusList
  readonly entityStatusControlInitialValue = ClientConstants.entityStatusControlInitialValue
  searchControl: FormControl<FilterField> = new FormControl(this.searchControlInitialValue)
  actionsControl: FormControl<RepositoryEntityAction> = new FormControl(null)
  entityStatusControl: FormControl<ClientStatus> = new FormControl(this.entityStatusControlInitialValue)
  hasSearchValueControl: FormControl<boolean> = new FormControl(false)
}
