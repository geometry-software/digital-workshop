import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms'
import { Observable, delay, forkJoin, map, of, tap, concat, filter } from 'rxjs'
import { Store } from '@ngrx/store'
import { fadeInOnEnterAnimation } from 'angular-animations'
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal'
import { Client, ClientForm, ClientFormVehicleSelect, ClientStatus } from '../../utils/client.model'
import { NhtsaService } from 'src/app/shared/services/nhtsa.service'
import { ClientActions } from '../../store/client.actions'
import { VehicleBodyType, VehicleBrand, VehicleModel } from 'src/app/spare/utils/spare.model'
import { ClientConstants } from '../../utils/client.constants'
import { getFormUploadState } from '../../store/client.selectors'
import { FormAction, FormInitialization, FormType, FormUploadState, ModalData } from 'src/app/shared/model/form.model'
import { ConfirmationService } from 'src/app/shared/services/confirmation.service'
import { Log } from 'src/app/shared/repository/repository.model'
import * as ClientSelectors from '../../store/client.selectors'
import { generatePdf } from '../../utils/generate-pdf'

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  animations: [fadeInOnEnterAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  form: FormGroup<ClientForm | null>
  formInitializationState$: Observable<FormInitialization>
  formType: string = FormType.CREATE
  formTitle: string = FormAction.ADD
  editFormValue: Client
  editFormId: string
  clientLog: Array<Log<Client>>

  vehicleListByIndexMap = new Map()
  modelListByIndexMap = new Map()

  readonly modalData: ModalData<Client> = inject(NZ_MODAL_DATA)
  readonly phoneMaskConfig = ClientConstants.phoneMaskConfig
  readonly FormType = FormType
  readonly vehicleBodyType = VehicleBodyType
  readonly ClientFormVehicleSelect = ClientFormVehicleSelect
  readonly FormInitialization = FormInitialization

  readonly getFormUploadState$: Observable<FormUploadState<string>> = this.store$
    .select(getFormUploadState)
    .pipe(tap((value) => this.updateFormTemplate(value)))

  constructor(
    private store$: Store,
    private modal: NzModalRef,
    private confirmationService: ConfirmationService,
    private nhtsaService: NhtsaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm()
  }

  submit() {
    if (this.form.valid) {
      if (this.formType === FormType.CREATE) {
        this.store$.dispatch(
          ClientActions.createClient({
            item: {
              ...this.form.value,
              status: 'active',
              timestamp: new Date(),
            },
          })
        )
      } else {
        this.store$.dispatch(
          ClientActions.updateClient({
            item: {
              ...this.form.value,
              id: this.editFormId,
              updated: new Date(),
            },
            log: {
              item: this.editFormValue,
              id: this.editFormId,
              timestamp: new Date(),
            },
          })
        )
      }
    } else {
      this.highlightInvalidFields()
    }
  }

  highlightInvalidFields() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
      if (control.controls) {
        control.controls.forEach((element) =>
          Object.values(element.controls).forEach((control: any) => {
            if (control.invalid) {
              control.markAsDirty()
              control.updateValueAndValidity({ onlySelf: true })
            }
          })
        )
      }
    })
  }

  requestVehicleData(i: number, type: ClientFormVehicleSelect, value: any) {
    if (value) {
      switch (type) {
        case ClientFormVehicleSelect.TYPE:
          this.nhtsaService
            .getVehiclesByBodyType(value)
            .pipe(
              // takeUntilDestroyed(),
              tap((value) => {
                this.vehicleListByIndexMap.set(i, value.Results)
                this.form.controls.vehicles.at(i).patchValue({ brand: null, model: null })
                this.cdr.markForCheck()
              })
            )
            .subscribe()
          break
        case ClientFormVehicleSelect.BRAND:
          this.nhtsaService
            .getVehicleModelsById(value?.MakeId)
            .pipe(
              // takeUntilDestroyed(),
              tap((value) => {
                this.modelListByIndexMap.set(i, value.Results)
                this.form.controls.vehicles.at(i).patchValue({ model: null })
                this.cdr.markForCheck()
              })
            )
            .subscribe()
          break
      }
    }
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      vehicles: new FormArray([this.addVehicleFormRow()]),
    })
    if (this.modalData.type === FormType.EDIT) {
      this.formType = FormType.EDIT
      this.formTitle = FormAction.EDIT
      this.editFormValue = this.modalData.item
      this.editFormId = this.modalData.item.id
      if (this.editFormValue.updated) {
        this.store$.dispatch(
          ClientActions.getClientLog({
            id: this.editFormId,
          })
        )
        this.initLog()
      }
      this.requestExtraFormData()
    } else {
      this.formInitializationState$ = concat(of(FormInitialization.CLEAR), of(FormInitialization.LOADED).pipe(delay(60)))
    }
  }

  initLog() {
    this.store$
      .select(ClientSelectors.getClientLog)
      .pipe(
        filter((value) => !!value),
        tap((value) => (this.clientLog = value))
      )
      .subscribe()
  }

  requestExtraFormData() {
    this.editFormValue.vehicles.forEach(() => this.form.controls.vehicles.push(this.addVehicleFormRow()))
    this.form.patchValue(this.editFormValue)
    this.form.controls.vehicles.removeAt(this.editFormValue.vehicles.length)
    this.formInitializationState$ = concat(
      of(FormInitialization.LOADING),
      forkJoin(
        this.editFormValue.vehicles.map((el, i) =>
          forkJoin([
            this.nhtsaService.getVehiclesByBodyType(el.type).pipe(tap((value) => this.vehicleListByIndexMap.set(i, value.Results))),
            this.nhtsaService.getVehicleModelsById(el.brand.MakeId).pipe(tap((value) => this.modelListByIndexMap.set(i, value.Results))),
          ])
        )
      ).pipe(map(() => FormInitialization.LOADED))
    )
  }

  addVehicleFormRow() {
    return new FormGroup({
      type: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      plate: new FormControl('', Validators.required),
    })
  }

  addRow(event: Event) {
    event.preventDefault()
    this.form.controls.vehicles.push(this.addVehicleFormRow())
  }

  removeRow(i: number) {
    this.form.controls.vehicles.removeAt(i)
  }

  close() {
    this.modal.close()
  }

  compareBrand = (o1: VehicleBrand, o2: VehicleBrand) => (o1 && o2 ? o1.MakeName === o2.MakeName : o1 === o2)

  compareModel = (o1: VehicleModel, o2: VehicleModel) => (o1 && o2 ? o1.Model_Name === o2.Model_Name : o1 === o2)

  updateFormTemplate(value: FormUploadState<string>) {
    if (value.loaded && !value.loading) {
      this.modal.close(true)
      this.store$.dispatch(ClientActions.resetFormState())
    }
  }

  archive() {
    const status: ClientStatus = this.modalData.item.status === 'active' ? 'archived' : 'active'
    this.confirmationService
      .confirm({
        title: `Change client status to ${status}?`,
      })
      .afterClose.pipe(
        // takeUntilDestroyed(),
        filter((value) => !!value),
        tap(() =>
          this.store$.dispatch(
            ClientActions.updateClientStatus({
              id: this.editFormId,
              status: status,
            })
          )
        )
      )
      .subscribe()
  }

  downloadPdf() {
    generatePdf(this.editFormValue, this.clientLog)
  }
}
