import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageServiceLimitsHelper,ManageServiceLimitsState} from './retail-manage-service-limits-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ManagetransactionlimitsService } from '../managetransactionlimits-service/managetransactionlimits.service';
import { Managetransactionlimits } from '../managetransactionlimits-service/managetransactionlimits.model';

 
 
@Component({
 selector: 'app-retail-manage-service-limits-form',
  templateUrl: './retail-manage-service-limits-form.component.html',
  styleUrls: ['./retail-manage-service-limits-form.component.scss'],
  providers : [ ManageServiceLimitsHelper]
  })

export class ManageServiceLimitsComponent extends  BaseFpxFormComponent<ManageServiceLimitsHelper, ManageServiceLimitsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public manageServiceLimitsHelper: ManageServiceLimitsHelper,
    public managetransactionlimitsService: ManagetransactionlimitsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, manageServiceLimitsHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('instaPay', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('oatTransfer', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('withinBankTransfer', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('domesticTransfer', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('internationalTransfer', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('currency', '',  []    ,[],'blur',1,false,0);			   		 
			   		 
	this.setDataService(this.managetransactionlimitsService);
	this.setServiceCode("RETAILMANAGELIMITS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
