import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { PaginationRequest, PaginationResponse } from '../../model/pagination.model'
import { RepositoryRequestQuery } from '../../repository/repository.model'

@Component({
  selector: 'app-table-pagination',
  templateUrl: './app-table-pagination.component.html',
  styleUrls: ['./app-table-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTablePaginationComponent implements OnInit {
  @Input()
  paginationControl: FormControl<PaginationRequest<any>>
  @Input()
  paginationPayload: PaginationResponse<any>
  size: number

  ngOnInit(): void {
    this.size = this.paginationControl.value.size
  }

  changeSize(size: number) {
    this.paginationControl.setValue({
      query: this.paginationControl.value.query,
      item: this.paginationControl.value.item,
      size: size,
    })
  }

  changePage(query: RepositoryRequestQuery) {
    let item
    switch (query) {
      case 'first':
        item = null
        break
      case 'next':
        item = this.paginationPayload.item.last
        break
      case 'previous':
        item = this.paginationPayload.item.first
        break
    }
    this.paginationControl.setValue({
      query: query,
      item: item,
      size: this.paginationControl.value.size,
    })
  }
}
