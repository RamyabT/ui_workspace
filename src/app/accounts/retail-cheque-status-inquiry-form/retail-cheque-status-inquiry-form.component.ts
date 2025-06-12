import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChequeStatusInquiryFormHelper,RetailChequeStatusInquiryFormState} from './retail-cheque-status-inquiry-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailchequestatusinquiryformService } from '../retailchequestatusinquiryform-service/retailchequestatusinquiryform.service';
import { Retailchequestatusinquiryform } from '../retailchequestatusinquiryform-service/retailchequestatusinquiryform.model';

 
 
@Component({
 selector: 'app-retail-cheque-status-inquiry-form',
  templateUrl: './retail-cheque-status-inquiry-form.component.html',
  styleUrls: ['./retail-cheque-status-inquiry-form.component.scss'],
  providers : [ RetailChequeStatusInquiryFormHelper]
  })

export class RetailChequeStatusInquiryFormComponent extends  BaseFpxFormComponent<RetailChequeStatusInquiryFormHelper, RetailChequeStatusInquiryFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChequeStatusInquiryFormHelper: RetailChequeStatusInquiryFormHelper,
    public retailchequestatusinquiryformService: RetailchequestatusinquiryformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChequeStatusInquiryFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('inquiryType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('chequeNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('fromChequeNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('toChequeNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('chequeStatus', '',  []    ,[],'blur',1,false,0);			   		 
	this.addElement('search');
	this.addElement('chequeStatusInquiry'); 
	this.setDataService(this.retailchequestatusinquiryformService);
	 this.setServiceCode("RETAILINQCHQSTATUS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
