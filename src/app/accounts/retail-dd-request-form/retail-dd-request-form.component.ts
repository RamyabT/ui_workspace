import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDDRequestFormHelper, RetailDDRequestFormState } from './retail-dd-request-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DdrequestService } from '../ddrequest-service/ddrequest.service';
import { Ddrequest } from '../ddrequest-service/ddrequest.model';



@Component({
  selector: 'app-retail-dd-request-form',
  templateUrl: './retail-dd-request-form.component.html',
  styleUrls: ['./retail-dd-request-form.component.scss'],
  providers: [RetailDDRequestFormHelper]
})

export class RetailDDRequestFormComponent extends BaseFpxFormComponent<RetailDDRequestFormHelper, RetailDDRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDDRequestFormHelper: RetailDDRequestFormHelper,
    public ddrequestService: DdrequestService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailDDRequestFormHelper);
  }
  protected readonly amount_pattern: any = /^[0-9 ]/;
  protected readonly remarks_maxLength: any = 100;
  protected readonly beneficiaryName_pattern: any = /^[A-Za-z*\s{1}]/;
  protected readonly beneficiaryName_minLength: any = 3;
  protected readonly beneficiaryName_maxLength: any = 32;
  protected readonly beneficiaryID_pattern: any = /^[A-Za-z0-9 ]/;
  protected readonly beneficiaryID_minLength: any = 3;
  protected readonly beneficiaryID_maxLength: any = 20;
  protected override doPreInit(): void {
    this.addFormControl('accountNumber', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryName', '', [Validators.required, Validators.required, Validators.minLength(this.beneficiaryName_minLength), Validators.maxLength(this.beneficiaryName_maxLength)], [], 'blur', 1, false, 0);
    this.addFormControl('beneficiaryID', '', [Validators.required, Validators.required, Validators.minLength(this.beneficiaryID_minLength), Validators.maxLength(this.beneficiaryID_maxLength)], [], 'blur', 1, false, 0);
    this.addFormControl('issueDate', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('payableAt', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('availableBalance', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('amount', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('deliveryOption', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('dlvryBranch', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [ Validators.maxLength(this.remarks_maxLength)], [], 'change', 1, false, 0);
    this.addFormControl('terms', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('baseRate', '', [], [], 'change', 1, false, 0);
    this.addFormControl('chargesAmount', '', [], [], 'change', 1, false, 0);
    this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('currency', '', [], [], 'change', 1, false, 0);
    this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);	
    this.addFormControl('addressInformation', '',  []    ,[],'blur',1,false,0);			   		 
    this.addElement('exchangeDetails');
    this.addElement('addressInfo');
    this.setDataService(this.ddrequestService);
    this.setServiceCode("RETAILDDREQ");

  }


  protected override doPostInit(): void {

  }

}
