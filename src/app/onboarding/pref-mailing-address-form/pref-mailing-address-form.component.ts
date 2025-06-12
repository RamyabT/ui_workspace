import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { PreferedMailingAddressHelper,PreferedMailingAddressState} from './pref-mailing-address-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PrefMailingAddressService } from '../prefMailingAddress-service/prefMailingAddress.service';
import { PrefMailingAddress } from '../prefMailingAddress-service/prefMailingAddress.model';

 
 
@Component({
   selector: 'app-pref-mailing-address-form',
    templateUrl: './pref-mailing-address-form.component.html',
    styleUrls: ['./pref-mailing-address-form.component.scss'],
    providers : [ PreferedMailingAddressHelper]
  })

export class PreferedMailingAddressComponent extends  BaseFpxFormComponent<PreferedMailingAddressHelper, PreferedMailingAddressState>  {
    constructor(
      @Optional() controlContainer: ControlContainer,
      formBuilder: FormBuilder,
      private router: Router,
      public preferedMailingAddressHelper: PreferedMailingAddressHelper,
      public prefMailingAddressService: PrefMailingAddressService,
      private validatorService: ValidatorService,
      
    ) {
        super(formBuilder, router,controlContainer, preferedMailingAddressHelper);
    }
     protected override doPreInit(): void {
         this.addFormControl('preferredPurposeOfAccount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
        //  this.addFormControl('prefAnnualIncome', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('preferredBranch', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
         this.addFormControl('dualNationalityHolder', '0',  [Validators.required ]    ,[],'change',1,false,0);			   		 
        //  this.addFormControl('salaryOrMonthlyIncome', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('mainSourceOfIncome', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('pepDeclaration', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
         this.addFormControl('preferredMaritalStatus', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('countryOfResidence', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
         this.addFormControl('preferredMailingAddress', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
         this.addFormControl('otherNationality', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    	this.setDataService(this.prefMailingAddressService);
    	this.setServiceCode("prefMailingAddress");
    
    }
    
  
    protected override doPostInit(): void {
       
    }
    
}

