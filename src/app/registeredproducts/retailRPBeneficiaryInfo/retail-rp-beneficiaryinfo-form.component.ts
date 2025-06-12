import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRPBeneficiaryInfoHelper,RetailRPBeneficiaryInfoState} from './retail-rp-beneficiaryinfo-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RpcontractbeneficiaryinfoService } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.service';
import { Rpcontractbeneficiaryinfo } from '../rpcontractbeneficiaryinfo-service/rpcontractbeneficiaryinfo.model';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-rp-beneficiaryinfo-form',
  templateUrl: './retail-rp-beneficiaryinfo-form.component.html',
  styleUrls: ['./retail-rp-beneficiaryinfo-form.component.scss'],
  providers : [ RetailRPBeneficiaryInfoHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailRPBeneficiaryInfoComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailRPBeneficiaryInfoComponent)
  }]
  })

export class RetailRPBeneficiaryInfoComponent extends  BaseFpxFormComponent<RetailRPBeneficiaryInfoHelper, RetailRPBeneficiaryInfoState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRPBeneficiaryInfoHelper: RetailRPBeneficiaryInfoHelper,
    public rpcontractbeneficiaryinfoService: RpcontractbeneficiaryinfoService,
    private validatorService: ValidatorService,
    private _appConfig: AppConfigService,
    
  ) {
    super(formBuilder, router,controlContainer, retailRPBeneficiaryInfoHelper);
    // this.setServiceCode("RETAILRPBENEFICIARYINFO");  
    this._appConfig.getData('serviceCode');
}
   protected override doPreInit(): void {
  this.setDataService(this.rpcontractbeneficiaryinfoService);
      this.addFormControl('firstname', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('initial', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('lastname', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('relationship', '',[Validators.required ]   ,[],'blur',1,false);			   		 
      this.addFormControl('proportion', '',[Validators.required ]   ,[],'blur',1,false);		
      this.addFormControl('addAnotherBeneficiary', '',  []    ,[],'blur',1,false,);	
      this.addFormControl('actions_column', '',[Validators.required ]   ,[],'blur',1,false);		   		 
	// this.setServiceCode("RETAILRPBENEFICIARYINFO");
    this._appConfig.getData('serviceCode');

  }
  

  protected override doPostInit(): void {
   
  }
 
}

