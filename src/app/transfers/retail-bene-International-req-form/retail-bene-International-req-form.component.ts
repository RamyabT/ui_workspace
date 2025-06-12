import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBeneInternationalReqFormHelper, RetailBeneInternationalReqFormState } from './retail-bene-International-req-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { BeneInternationalReqService } from '../beneInternationalReq-service/beneInternationalReq.service';
import { BeneInternationalReq } from '../beneInternationalReq-service/beneInternationalReq.model';



@Component({
  selector: 'app-retail-bene-International-req-form',
  templateUrl: './retail-bene-International-req-form.component.html',
  styleUrls: ['./retail-bene-International-req-form.component.scss'],
  providers: [RetailBeneInternationalReqFormHelper]
})

export class RetailBeneInternationalReqFormComponent extends BaseFpxFormComponent<RetailBeneInternationalReqFormHelper, RetailBeneInternationalReqFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBeneInternationalReqFormHelper: RetailBeneInternationalReqFormHelper,
    public beneInternationalReqService: BeneInternationalReqService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailBeneInternationalReqFormHelper);
  }
  protected  readonly international_maxLength : any = 35;
  // protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,35}$/;
  protected override doPreInit(): void {
    this.addFormControl('nickName', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneCountry', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneAccType', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('iban', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('confirmIban', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('accountNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('conAccNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryName', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('bic', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('addressLine1', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('bankCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('currency', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('bankDescription', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('addressLine2', '', [Validators.required,], [], 'blur', 1, false, 0);
    this.addFormControl('city', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('bankCountry', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('branchCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('bankAddress', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('isFavourite', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('branchDescription', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('inventoryNumber', '', [], [], 'blur', 0, true, 0);
    this.addFormControl('interBankAddress', '', [], [], 'blur', 0, false, 0);
    this.addFormControl('interBankDesc', '', [], [], 'blur', 0, false, 0);
    this.addFormControl('interBranchCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('interBankCode', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('interBranchDescription', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('additionalBic', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('ifscCode', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addElement('bankDetails');
    this.addElement('beneDetails');
    this.addElement('termsDetails');
    this.addFormControl('intermediaryBic', '', [Validators.required], [], 'blur', 0, false, 0);
    this.addElement('beneBicSearchBtn');
    this.addElement('intermediaryBicSearchBtn');
    this.setDataService(this.beneInternationalReqService);
    this.setServiceCode("RETAILBENEINTL");

  }


  protected override doPostInit(): void {

  }

}
