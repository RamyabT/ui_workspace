import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CorpAddressDetailsFormHelper,CorpAddressDetailsFormState} from './corp-address-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CobaddressinfoService } from '../cobaddressinfo-service/cobaddressinfo.service';
import { Cobaddressinfo } from '../cobaddressinfo-service/cobaddressinfo.model';
 
@Component({
 selector: 'app-corp-address-details-form',
  templateUrl: './corp-address-details-form.component.html',
  styleUrls: ['./corp-address-details-form.component.scss'],
  providers : [ CorpAddressDetailsFormHelper]
  })

export class CorpAddressDetailsFormComponent extends BaseFpxFormComponent<CorpAddressDetailsFormHelper, CorpAddressDetailsFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public corpAddressDetailsFormHelper: CorpAddressDetailsFormHelper,
    public cobaddressinfoService: CobaddressinfoService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, corpAddressDetailsFormHelper);
  }
   protected override doPreInit(): void {

   this.addFormControl('addressType', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'addressType',
		          this.cobaddressinfoService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 

   this.addFormControl('mobileNumber', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('email', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('country', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('state', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('city', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('zipCode', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('buildingId', '',  []    ,[],'blur',1,false,0);			   		 

   this.addFormControl('buildingName', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.cobaddressinfoService);
	 this.setServiceCode("");
  }
 

  protected override doPostInit(): void {
   
  }
  
}
