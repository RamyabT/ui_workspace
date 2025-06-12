import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailIndividualDDReqInfoFormHelper,RetailIndividualDDReqInfoFormState} from './retail-individual-ddreq-info-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BusinessddreqService } from '../businessddreq-service/businessddreq.service';
import { Businessddreq } from '../businessddreq-service/businessddreq.model';

 
 
@Component({
 selector: 'app-retail-individual-ddreq-info-form',
  templateUrl: './retail-individual-ddreq-info-form.component.html',
  styleUrls: ['./retail-individual-ddreq-info-form.component.scss'],
  providers : [ RetailIndividualDDReqInfoFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailIndividualDDReqInfoFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailIndividualDDReqInfoFormComponent)
  }]
  })

export class RetailIndividualDDReqInfoFormComponent extends  BaseFpxFormComponent<RetailIndividualDDReqInfoFormHelper, RetailIndividualDDReqInfoFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailIndividualDDReqInfoFormHelper: RetailIndividualDDReqInfoFormHelper,
    public businessddreqService: BusinessddreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailIndividualDDReqInfoFormHelper);
  //  this.setServiceCode("RETAILINDIVIDUALDDREQINFO");  
}
   protected override doPreInit(): void {
  this.setDataService(this.businessddreqService);
	this.setServiceCode("RETAILINDIVIDUALDDREQINFO");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

