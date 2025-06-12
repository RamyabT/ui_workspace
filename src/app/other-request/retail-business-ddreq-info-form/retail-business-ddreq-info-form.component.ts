import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBusinessDDReqInfoFormHelper,RetailBusinessDDReqInfoFormState} from './retail-business-ddreq-info-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';

 
 
@Component({
 selector: 'app-retail-business-ddreq-info-form',
  templateUrl: './retail-business-ddreq-info-form.component.html',
  styleUrls: ['./retail-business-ddreq-info-form.component.scss'],
  providers : [ RetailBusinessDDReqInfoFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailBusinessDDReqInfoFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailBusinessDDReqInfoFormComponent)
  }]
  })

export class RetailBusinessDDReqInfoFormComponent extends  BaseFpxFormComponent<RetailBusinessDDReqInfoFormHelper, RetailBusinessDDReqInfoFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBusinessDDReqInfoFormHelper: RetailBusinessDDReqInfoFormHelper,
    public businessddreqService: BusinessddreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBusinessDDReqInfoFormHelper);
  //  this.setServiceCode("RETAILBUSINESSDDREQINFO");  
}
   protected override doPreInit(): void {
  this.setDataService(this.businessddreqService);
    //  this.addFormControl('FieldId_2', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILBUSINESSDDREQINFO");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

