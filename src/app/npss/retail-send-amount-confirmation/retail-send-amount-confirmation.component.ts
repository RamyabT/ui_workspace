import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { NPSSSendMoneyHelper,NPSSSendMoneyState} from './retail-send-amount-confirmation.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { Npsssendmoney } from '../npsssendmoney-service/npsssendmoney.model';

 
 
@Component({
 selector: 'app-retail-send-amount-confirmation',
  templateUrl: './retail-send-amount-confirmation.component.html',
  styleUrls: ['./retail-send-amount-confirmation.component.scss'],
  providers : [ NPSSSendMoneyHelper]
  })

export class NPSSSendMoneyComponent extends  BaseFpxFormComponent<NPSSSendMoneyHelper, NPSSSendMoneyState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public nPSSSendMoneyHelper: NPSSSendMoneyHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, nPSSSendMoneyHelper);
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
    this.addFormControl('requestToPayID', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('lastName', '', [], [], 'blur', 1, false, 0);	
    this.addFormControl('transactionCurrency', '', [], [], 'blur', 1, false, 0);	
	this.setDataService(this.npsssendmoneyService);
	this.setServiceCode("RETAILNPSSSENDMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
