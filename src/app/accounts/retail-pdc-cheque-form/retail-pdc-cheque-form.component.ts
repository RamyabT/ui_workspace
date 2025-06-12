import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPdcChequeFormHelper,RetailPdcChequeFormState} from './retail-pdc-cheque-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailpdcchequeformService } from '../retailpdcchequeform-service/retailpdcchequeform.service';
import { Retailpdcchequeform } from '../retailpdcchequeform-service/retailpdcchequeform.model';

 
 
@Component({
 selector: 'app-retail-pdc-cheque-form',
  templateUrl: './retail-pdc-cheque-form.component.html',
  styleUrls: ['./retail-pdc-cheque-form.component.scss'],
  providers : [ RetailPdcChequeFormHelper]
  })

export class RetailPdcChequeFormComponent extends  BaseFpxFormComponent<RetailPdcChequeFormHelper, RetailPdcChequeFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPdcChequeFormHelper: RetailPdcChequeFormHelper,
    public retailpdcchequeformService: RetailpdcchequeformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPdcChequeFormHelper);
  }
  protected  readonly pattern : any = /^[0-9]{1,15}$/;
  protected readonly chequeNumber_minLength: any = 1;
  protected readonly chequeNumber_maxLength: any = 15;
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('pdcInquiryType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('chequeNumber', '',  [Validators.required,Validators.minLength(this.chequeNumber_minLength), Validators.maxLength(this.chequeNumber_maxLength)]    ,[],'change',1,false,0);			   		 
     this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required ]    ,[],'change',1,false,0);		
     this.addFormControl('amount', '',  [Validators.required ]    ,[],'change',1,false,0);
     
	this.addElement('search');
	this.addElement('pdcChequeInquiry'); 
	this.setDataService(this.retailpdcchequeformService);
	 this.setServiceCode("RETAILINQPDCCHQSTATUS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
