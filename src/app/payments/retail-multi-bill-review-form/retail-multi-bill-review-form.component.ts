import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailMultiBillReviewFormHelper,RetailMultiBillReviewFormState} from './retail-multi-bill-review-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MultibillrequestService } from '../multibillrequest-service/multibillrequest.service';
import moment from 'moment';
import { APPCONSTANTS } from '@dep/constants';

 
 
@Component({
 selector: 'app-retail-multi-bill-review-form',
  templateUrl: './retail-multi-bill-review-form.component.html',
  styleUrls: ['./retail-multi-bill-review-form.component.scss'],
  providers : [ RetailMultiBillReviewFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailMultiBillReviewFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailMultiBillReviewFormComponent)
  }]
  })

export class RetailMultiBillReviewFormComponent extends  BaseFpxFormComponent<RetailMultiBillReviewFormHelper, RetailMultiBillReviewFormState>  {
  appConstant: any;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMultiBillReviewFormHelper: RetailMultiBillReviewFormHelper,
    public multibillreviewService: MultibillrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailMultiBillReviewFormHelper);
    this.setServiceCode("RETAILMULTIBILLPAYMENT");  
}
   protected override doPreInit(): void {
    this.appConstant = APPCONSTANTS;
  this.setDataService(this.multibillreviewService);
  this.addFormControl('totalBillAmount', '',  []    ,[],'blur',1,false,);		
  this.addFormControl('accountType', '',  []    ,[],'blur',1,false,);		
  this.addFormControl('debitAccount', '',  []    ,[],'blur',1,false,);	
  this.addFormControl('initiatedDate', moment().format('YYYY-MM-DD'),  []    ,[],'blur',1,false,);		
  this.addFormControl('accountNickname', '',  []    ,[],'blur',1,false,);		

  this.addFormControl('multibillrequestdetail', '',  []    ,[],'blur',1,false,);		
	this.setServiceCode("RETAILMULTIBILLPAYMENT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

