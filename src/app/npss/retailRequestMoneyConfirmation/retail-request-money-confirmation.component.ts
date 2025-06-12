import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRequestMoneyConfirmationHelper,RetailRequestMoneyConfirmationState} from './retail-request-money-confirmation.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpssrequestmoneyService } from '../npssrequestmoney-service/npssrequestmoney.service';

 
 
@Component({
 selector: 'app-retail-request-money-confirmation',
  templateUrl: './retail-request-money-confirmation.component.html',
  styleUrls: ['./retail-request-money-confirmation.component.scss'],
  providers : [ RetailRequestMoneyConfirmationHelper]
  })

export class RetailRequestMoneyConfirmationComponent extends  BaseFpxFormComponent<RetailRequestMoneyConfirmationHelper, RetailRequestMoneyConfirmationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRequestMoneyConfirmationHelper: RetailRequestMoneyConfirmationHelper,
    public retailrequestmoneyconfirmationService: NpssrequestmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailRequestMoneyConfirmationHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionAmount', '',  [Validators.required]  ,[],'blur',1,false,0);	
    this.addFormControl('remarks', '',  []  ,[],'blur',1,false,0);	
    this.addFormControl('debitAccount', '',  []  ,[],'blur',1,false,0);
    this.addFormControl('receipientCustomerId', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('iban', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('receipientAccNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('beneValue', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('firstName', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('lastName', '', [], [], 'blur', 1, false, 0);	
    this.addFormControl('transactionCurrency', '', [], [], 'blur', 1, false, 0);	
    
	this.setDataService(this.retailrequestmoneyconfirmationService);
	this.setServiceCode("RETAILNPSSREQUESTMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
