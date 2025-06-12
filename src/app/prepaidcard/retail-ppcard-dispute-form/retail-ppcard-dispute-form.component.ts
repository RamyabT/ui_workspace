import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { raisedisputePrepaidCardHelper,raisedisputePrepaidCardState} from './retail-ppcard-dispute-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RaisedisputePrepaidCardService } from '../raisedisputePrepaidCard-service/raisedisputePrepaidCard.service';
import { RaisedisputePrepaidCard } from '../raisedisputePrepaidCard-service/raisedisputePrepaidCard.model';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-ppcard-dispute-form',
  templateUrl: './retail-ppcard-dispute-form.component.html',
  styleUrls: ['./retail-ppcard-dispute-form.component.scss'],
  providers : [ raisedisputePrepaidCardHelper]
  })

export class raisedisputePrepaidCardComponent extends  BaseFpxFormComponent<raisedisputePrepaidCardHelper, raisedisputePrepaidCardState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public raisedisputePrepaidCardHelper: raisedisputePrepaidCardHelper,
    public raisedisputePrepaidCardService: RaisedisputePrepaidCardService,
    private validatorService: ValidatorService,
    protected _appConfig: AppConfigService
    
  ) {
    super(formBuilder, router,controlContainer, raisedisputePrepaidCardHelper);
  }
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
  protected readonly otherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly otherReason_minLength: any = 3;
  protected readonly otherReason_maxLength: any = 100;
   protected override doPreInit(): void {		  
    // this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);	
    this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);	
    this.addFormControl('supportingDocuments', '',  []    ,[],'blur',1,false,0);		 		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('terms', '',  [Validators.required]    ,[],'blur',1,false,0);		
     this.addFormControl('transactionDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionAmount', '',  []    ,[],'blur',1,false,0);			  
     this.addFormControl('transType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionCurrency', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('otherReason', '',  [Validators.required,Validators.minLength(this.otherReason_minLength), Validators.maxLength(this.otherReason_maxLength) ]    ,[],'blur',1,false,0);
     this.addFormControl('cardNumber', '',  []    ,[],'blur',1,false,0);				   		  		 	   		 
	this.setDataService(this.raisedisputePrepaidCardService);
	this.setServiceCode("RETAILPPDISPUTE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
