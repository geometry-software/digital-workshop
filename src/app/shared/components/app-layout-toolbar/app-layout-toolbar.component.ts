import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { tap } from 'rxjs'
import { Toolbar } from '../../model/toolbar.model'
import { FilterField, RepositoryEntityAction } from '../../repository/repository.model'

@Component({
  selector: 'app-layout-toolbar',
  templateUrl: './app-layout-toolbar.component.html',
  styleUrls: ['./app-layout-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutToolbarComponent implements OnInit {
  @Input()
  toolbarSettings: Toolbar
  @Input()
  searchControl: FormControl<FilterField>
  @Input()
  hasSearchValueControl: FormControl<boolean>
  @Input()
  actionsControl: FormControl<RepositoryEntityAction>
  @Input()
  entityStatusControl: FormControl
  @Input()
  entityStatusList: Array<any>
  @Input()
  searchFieldList: Array<any>
  @Input()
  searchControlInitialValue: FilterField

  searchValue: string
  searchField: string
  hasSearchValue: boolean

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initSearchBar()
  }

  initSearchBar() {
    if (this.toolbarSettings.hasSearchBar) {
      this.searchField = this.searchFieldList[0].value
      this.updateSearchIconAppearance()
    }
  }

  changeType(field: string) {
    this.searchField = field
  }

  changeField(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.searchControl.setValue({ key: this.searchField, value: value })
  }

  resetSearchField() {
    this.hasSearchValue = false
    this.searchValue = null
    this.searchControl.setValue(this.searchControlInitialValue)
  }

  updateSearchIconAppearance() {
    this.hasSearchValueControl.valueChanges
      .pipe(
        tap((value) => {
          this.hasSearchValue = value
          this.cdr.markForCheck()
        })
      )
      .subscribe()
  }
}
