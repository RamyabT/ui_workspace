import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ccraisedisputeHelper,ccraisedisputeState} from './retail-cc-raise-dispute-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcraisedisputeService } from '../ccraisedispute-service/ccraisedispute.service';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-cc-raise-dispute-form',
  templateUrl: './retail-cc-raise-dispute-form.component.html',
  styleUrls: ['./retail-cc-raise-dispute-form.component.scss'],
  providers : [ ccraisedisputeHelper]
  })

export class ccraisedisputeComponent extends  BaseFpxFormComponent<ccraisedisputeHelper, ccraisedisputeState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public ccraisedisputeHelper: ccraisedisputeHelper,
    public ccraisedisputeService: CcraisedisputeService,
    private validatorService: ValidatorService,
    protected _appConfig: AppConfigService
    
  ) {
    super(formBuilder, router,controlContainer, ccraisedisputeHelper);
  }
  protected readonly otherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly otherReason_minLength: any = 3;
  protected readonly otherReason_maxLength: any = 100;
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('supportingDocument', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('terms', '',  [Validators.required]    ,[],'blur',1,false,0);	
     this.addFormControl('transactionDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionAmount', '',  []    ,[],'blur',1,false,0);			  
     this.addFormControl('transType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionCurrency', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);		  
     this.addFormControl('otherReason', '',  [Validators.required,Validators.minLength(this.otherReason_minLength), Validators.maxLength(this.otherReason_maxLength) ]    ,[],'blur',1,false,0);
     this.addFormControl('cardNumber', '',  [ ]    ,[],'blur',1,false,0);		
     this.addElement('infoNote');	   		  		 
	this.setDataService(this.ccraisedisputeService);
	this.setServiceCode("RETAILCCRAISEDISPUTE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
