import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLimitRequestControlHelper,RetailLimitRequestControlState} from './retail-cc-limit-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CclimitrequestService } from '../cclimitrequest-service/cclimitrequest.service';
import { Cclimitrequest } from '../cclimitrequest-service/cclimitrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-cc-limit-request-form',
  templateUrl: './retail-cc-limit-request-form.component.html',
  styleUrls: ['./retail-cc-limit-request-form.component.scss'],
  providers : [ RetailLimitRequestControlHelper]
  })

export class RetailLimitRequestControlComponent extends  BaseFpxFormComponent<RetailLimitRequestControlHelper, RetailLimitRequestControlState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLimitRequestControlHelper: RetailLimitRequestControlHelper,
    public cclimitrequestService: CclimitrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailLimitRequestControlHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardRefNumber', '',  [ ]    ,[],'change',1,false,0);			   		 	   		 
	this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('terms', '',  [Validators.required ]    ,[],'change',1,false,0);
    this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
         
    this.addFormControl('atmFlag', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('onlinePurchaseFlag', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('contactlessPurchaseFlag', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('posPayFlag', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('intlAtmFlag', '',  []    ,[],'change',1,false,1);			   		 
    this.addFormControl('intlOnlinePurchaseFlag', '',  []    ,[],'change',1,false,1);			   		 
    this.addFormControl('intlContactlessPurchaseFlag', '',  []    ,[],'change',1,false,1);			   		 
    this.addFormControl('intlPosPayFlag', '',  []    ,[],'change',1,false,1);			   		 
    this.addFormControl('atmLimit', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('onlinePurchaseLimit', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('contactlessPurchaseLimit', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('posPayLimit', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('intlAtmLimit', '',  []    ,[],'blur',1,false,1);			   		 
    this.addFormControl('intlOnlinePurchaseLimit', '',  []    ,[],'blur',1,false,1);			   		 
    this.addFormControl('intlContactlessPurchaseLimit', '',  []    ,[],'blur',1,false,1);			   		 
    this.addFormControl('intlPosPayLimit', '',  []    ,[],'blur',1,false,1);

    this.addFormControl('contactlessMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('contactMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('onlineMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('posMaxLimit', '', [], [], 'change', 1, false, 0);


    this.addFormControl('intlAtmMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlConcatlessMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('atmMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlContactlessMinLimit', '', [], [], 'change', 1, false, 0);


    this.addFormControl('onlineMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('atmMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('posMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlPosMinLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlPosMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlOnlineMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlAtmMaxLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('currency', '', [], [], 'change', 1, false, 0);
    this.addFormControl('overallCardLimit', '', [], [], 'change', 1, false, 0);
    this.addFormControl('intlOnlineMinLimit', '', [], [], 'change', 1, false, 0);		   		 
    	
    
	this.addFormControl('searchText', '', [], [], 'change');


         
	this.setDataService(this.cclimitrequestService);
	this.setServiceCode("RETAILCCLIMITS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
