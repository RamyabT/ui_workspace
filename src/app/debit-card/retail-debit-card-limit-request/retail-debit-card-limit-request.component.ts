import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDebitCardLimitRequestHelper,RetailDebitCardLimitRequestState} from './retail-debit-card-limit-request.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DclimitrequestService } from '../dclimitrequest-service/dclimitrequest.service';
import { Dclimitrequest } from '../dclimitrequest-service/dclimitrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-debit-card-limit-request',
  templateUrl: './retail-debit-card-limit-request.component.html',
  styleUrls: ['./retail-debit-card-limit-request.component.scss'],
  providers : [ RetailDebitCardLimitRequestHelper]
  })

export class RetailDebitCardLimitRequestComponent extends  BaseFpxFormComponent<RetailDebitCardLimitRequestHelper, RetailDebitCardLimitRequestState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDebitCardLimitRequestHelper: RetailDebitCardLimitRequestHelper,
    public dclimitrequestService: DclimitrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailDebitCardLimitRequestHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'change',1,false,0);		
    this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
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

	this.setDataService(this.dclimitrequestService);
	this.setServiceCode("RETAILDCLIMITS");

  }
  

  protected override doPostInit(): void {
    
  }
  
}
