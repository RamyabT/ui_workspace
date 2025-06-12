import { Component, EventEmitter, Optional } from '@angular/core'
import {
  FormBuilder,
  Validators,
  ControlContainer,
  FormGroup
} from '@angular/forms'
import { Router } from '@angular/router'
import {
  RetailNPSSSendMoneyHelper,
  RetailNPSSSendMoneyState
} from './retail-npss-send-money.helper'
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core'
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service'
import { Npsssendmoney } from '../npsssendmoney-service/npsssendmoney.model'

@Component({
  selector: 'app-retail-npss-send-money',
  templateUrl: './retail-npss-send-money.component.html',
  styleUrls: ['./retail-npss-send-money.component.scss'],
  providers: [RetailNPSSSendMoneyHelper]
})
export class RetailNPSSSendMoneyComponent extends BaseFpxFormComponent<
  RetailNPSSSendMoneyHelper,
  RetailNPSSSendMoneyState
> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailNPSSSendMoneyHelper: RetailNPSSSendMoneyHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    private validatorService: ValidatorService
  ) {
    super(formBuilder, router, controlContainer, retailNPSSSendMoneyHelper)
  }
  protected override doPreInit(): void {
    this.addFormControl('email', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('mobileNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('receipientCustomerId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('iban', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('receipientAccNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('firstName', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('lastName', '', [], [], 'blur', 1, false, 0);

    this.setDataService(this.npsssendmoneyService)
    this.setServiceCode('RETAILNPSSSENDMONEY')
  }

  protected override doPostInit(): void { }
}
