import { ChangeDetectionStrategy, Component,EventEmitter,Optional, forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailProfileDetailsFormHelper, RetailProfileDetailsFormState} from './retail-profile-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CustomerinfologService } from '../customerinfolog-service/customerinfolog.service';
import { Customerinfolog } from '../customerinfolog-service/customerinfolog.model';

 
 
@Component({
 selector: 'app-retail-profile-details-form',
  templateUrl: './retail-profile-details-form.component.html',
  styleUrls: ['./retail-profile-details-form.component.scss'],

  providers: [
    RetailProfileDetailsFormHelper,
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RetailProfileDetailsFormComponent),
    multi: true,
    }
    ],
    changeDetection : ChangeDetectionStrategy.OnPush
  })

export class RetailProfileDetailsFormComponent extends  BaseFpxFormComponent<RetailProfileDetailsFormHelper, RetailProfileDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProfileDetailsFormHelper: RetailProfileDetailsFormHelper,
    public customerinfologService: CustomerinfologService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailProfileDetailsFormHelper);
  }
   protected override doPreInit(): void {
  
    this.addFormControl('inventoryNumber', '',  [Validators.required]    ,[],'blur',1,true,0);			   		 
     this.addFormControl('mobileNumber', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('email', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('residentialAddress', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    // this.addFormControl('workAddress', '',  []    ,[],'blur',1,false,0);			
    this.addFormControl('correspondenceAddress', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('customerinfologdetails', '',  [Validators.required]    ,[],'blur',1,false,0);			   		    		 
    this.setDataService(this.customerinfologService);
    this.setServiceCode("RETAILCUSTOMERINFOLOG");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
