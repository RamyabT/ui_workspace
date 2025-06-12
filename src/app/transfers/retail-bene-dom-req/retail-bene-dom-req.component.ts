import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBeneDomReqHelper,RetailBeneDomReqState} from './retail-bene-dom-req.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BenedomreqService } from '../benedomreq-service/benedomreq.service';
import { Benedomreq } from '../benedomreq-service/benedomreq.model';

 
 
@Component({
 selector: 'app-retail-bene-dom-req',
  templateUrl: './retail-bene-dom-req.component.html',
  styleUrls: ['./retail-bene-dom-req.component.scss'],
  providers : [ RetailBeneDomReqHelper]
  })

export class RetailBeneDomReqComponent extends  BaseFpxFormComponent<RetailBeneDomReqHelper, RetailBeneDomReqState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBeneDomReqHelper: RetailBeneDomReqHelper,
    public benedomreqService: BenedomreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBeneDomReqHelper);
  }
      // protected  readonly routingCode_pattern : any = /^[A-Za-z0-9]{11}$/;
      protected readonly remarks_pattern:any = /^(?!.*\s{2,})(?!\s*$)(\w+(\s\w+)*){3,30}$/;
   protected override doPreInit(): void {
     this.addFormControl('nickName', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('routingCode', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('bankCode', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('confirmAccountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountCurrency', '',  [Validators.required ]    ,[],'blur',1,false,0);
     this.addFormControl('branchCode', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('beneficiaryName', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDescription', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('bankDescription', '',  []    ,[],'blur',1,false,0); 	   		 
     this.addFormControl('bankAddress', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressLine1', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('addressLine2', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('city', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
     this.addFormControl('country', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.pattern(this.remarks_pattern)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('isFavourite', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',0,true,0);	
     this.addElement('bankDetails');
     this.addElement('beneDetails');
     this.addElement('termsDetails');	 	
     this.addElement('beneFullNameElement');
     this.addFormControl('beneFullName', '',  []    ,[],'blur',1,false,0);   		 
	this.setDataService(this.benedomreqService);
	this.setServiceCode("RETAILBENEDOMESTIC");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
