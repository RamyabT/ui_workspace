import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanDocumentUploadHelper, LoanDocumentUploadState } from './loan-document-upload.helper';

@Component({
  selector: 'app-loan-document-upload',
  templateUrl: './loan-document-upload.component.html',
  styleUrls: ['./loan-document-upload.component.scss'],
  providers : [ LoanDocumentUploadHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LoanDocumentUploadComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => LoanDocumentUploadComponent)
    }]  
})  

export class LoanDocumentUploadComponent extends  BaseFpxFormComponent<LoanDocumentUploadHelper, LoanDocumentUploadState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loanDocumentUploadHelper: LoanDocumentUploadHelper,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, loanDocumentUploadHelper);
     
}
   protected override doPreInit(): void {
    this.addFormControl('salarySlip', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('bankStatement', '',[ ]   ,[],'blur',1,false);			   	
    this.addFormControl('allotmentLetter', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('buyerAggrement', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('invoiceFromDealer', '',[ ]   ,[],'blur',1,false);		
    this.addFormControl('vehicleRegCertificate', '',[ ]   ,[],'blur',1,false);	
    this.addFormControl('coApplicantfile', '',[ ]   ,[],'blur',1,false);			
    this.addFormControl('dealerInvoiceorQuote', '',[ ]   ,[],'blur',1,false);	
  }
  

  protected override doPostInit(): void {
   
  }
 
}

