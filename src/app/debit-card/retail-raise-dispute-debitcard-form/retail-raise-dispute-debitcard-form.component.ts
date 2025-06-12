import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { raisedisputedebitcardHelper,raisedisputedebitcardState} from './retail-raise-dispute-debitcard-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RaisedisputedebitcardService } from '../raisedisputedebitcard-service/raisedisputedebitcard.service';
import { Raisedisputedebitcard } from '../raisedisputedebitcard-service/raisedisputedebitcard.model';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-raise-dispute-debitcard-form',
  templateUrl: './retail-raise-dispute-debitcard-form.component.html',
  styleUrls: ['./retail-raise-dispute-debitcard-form.component.scss'],
  providers : [ raisedisputedebitcardHelper]
  })

export class raisedisputedebitcardComponent extends  BaseFpxFormComponent<raisedisputedebitcardHelper, raisedisputedebitcardState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public raisedisputedebitcardHelper: raisedisputedebitcardHelper,
    public raisedisputedebitcardService: RaisedisputedebitcardService,
    private validatorService: ValidatorService,
    protected _appConfig: AppConfigService
    
  ) {
    super(formBuilder, router,controlContainer, raisedisputedebitcardHelper);
  }
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
  protected readonly otherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly otherReason_minLength: any = 3;
  protected readonly otherReason_maxLength: any = 100;
   protected override doPreInit(): void {
    this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);		
    this.addFormControl('inventoryNumber', '',  [ ]    ,[],'blur',1,true,0);	   		 
    //  this.addFormControl('cardHolderName', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('cardNumber', '',  []    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('cardType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionAmount', '',  []    ,[],'blur',1,false,0);			  
     this.addFormControl('transType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionCurrency', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);		 		 
     this.addFormControl('reason', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('remarks', '',  [Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength) ]    ,[],'blur',1,false,0);
    this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('supportingDocuments', '',  [ ]    ,[],'blur',1,false,0);			  
     this.addFormControl('otherReason', '',  [Validators.required,Validators.minLength(this.otherReason_minLength), Validators.maxLength(this.otherReason_maxLength) ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.raisedisputedebitcardService);
	this.setServiceCode("RETAILDCRAISEDISPUTE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
