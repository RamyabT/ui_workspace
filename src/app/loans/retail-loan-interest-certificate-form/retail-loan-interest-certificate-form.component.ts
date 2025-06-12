import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanInterestCertificateFormHelper,RetailLoanInterestCertificateFormState} from './retail-loan-interest-certificate-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoaninterestcertificateService } from '../loaninterestcertificate-service/loaninterestcertificate.service';
import { Loaninterestcertificate } from '../loaninterestcertificate-service/loaninterestcertificate.model';

 
 
@Component({
 selector: 'app-retail-loan-interest-certificate-form',
  templateUrl: './retail-loan-interest-certificate-form.component.html',
  styleUrls: ['./retail-loan-interest-certificate-form.component.scss'],
  providers : [ RetailLoanInterestCertificateFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailLoanInterestCertificateFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailLoanInterestCertificateFormComponent)
  }]
  })

export class RetailLoanInterestCertificateFormComponent extends  BaseFpxFormComponent<RetailLoanInterestCertificateFormHelper, RetailLoanInterestCertificateFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanInterestCertificateFormHelper: RetailLoanInterestCertificateFormHelper,
    public loaninterestcertificateService: LoaninterestcertificateService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanInterestCertificateFormHelper);
    this.setServiceCode("RETAILLOANINTCERTIFICATE");  
}
   protected override doPreInit(): void {
  this.setDataService(this.loaninterestcertificateService);
      this.addFormControl('loanAccountNumber', '',[ ]  ,
		      [],'blur',0,true);			   		 
      this.addFormControl('dateFrom', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('dateTo', '',[Validators.required, ]   ,[],'change',1,false);			   		 
	this.setServiceCode("RETAILLOANINTERESTCERTIFICATE");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

