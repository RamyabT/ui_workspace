import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { RetailScanQrHelper, RetailScanQrState } from './retail-scan-qr.helper';

 
 
@Component({
 selector: 'app-retail-scan-qr',
  templateUrl: './retail-scan-qr.component.html',
  styleUrls: ['./retail-scan-qr.component.scss'],
  providers : [ RetailScanQrHelper]
  })

export class RetailScanQrComponent extends  BaseFpxFormComponent<RetailScanQrHelper, RetailScanQrState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailScanQrHelper: RetailScanQrHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailScanQrHelper);
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
    this.addFormControl('', '', [], [], 'blur', 1, false, 0);	
    this.addFormControl('personCount','',[Validators.required],[],'blur',1,false,0);
    this.setServiceCode("RETAILSCANQR");
  }
  

  protected override doPostInit(): void {
   
  }
  
}
