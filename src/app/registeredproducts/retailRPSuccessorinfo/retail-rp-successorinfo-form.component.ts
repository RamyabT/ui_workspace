import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRPSuccessorinfoHelper,RetailRPSuccessorinfoState} from './retail-rp-successorinfo-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RpcontractsuccessorinfoService } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.service';
import { Rpcontractsuccessorinfo } from '../rpcontractsuccessorinfo-service/rpcontractsuccessorinfo.model';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-rp-successorinfo-form',
  templateUrl: './retail-rp-successorinfo-form.component.html',
  styleUrls: ['./retail-rp-successorinfo-form.component.scss'],
  providers : [ RetailRPSuccessorinfoHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailRPSuccessorinfoComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailRPSuccessorinfoComponent)
  }]
  })

export class RetailRPSuccessorinfoComponent extends  BaseFpxFormComponent<RetailRPSuccessorinfoHelper, RetailRPSuccessorinfoState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRPSuccessorinfoHelper: RetailRPSuccessorinfoHelper,
    public rpcontractsuccessorinfoService: RpcontractsuccessorinfoService,
    private validatorService: ValidatorService,
    private _appConfig: AppConfigService,
    
  ) {
    super(formBuilder, router,controlContainer, retailRPSuccessorinfoHelper);
    this.setServiceCode(this._appConfig.getData('serviceCode'));
} 
   protected override doPreInit(): void {
  this.setDataService(this.rpcontractsuccessorinfoService);
      this.addFormControl('successorElectConsent', '',[Validators.required,  ]   ,[],'blur',1,false);
      this.addFormControl('firstName', '',[Validators.required, ]   ,[],'blur',1,false);
      this.addFormControl('initial', '',[  ]   ,[],'blur',1,false);
      this.addFormControl('lastName', '',[Validators.required, ]   ,[],'blur',1,false);
      this.addFormControl('relationshiplist', '',[ Validators.required ]   ,[],'blur',1,false);
      this.addFormControl('beneElectConsent', '',[Validators.required,  ]   ,[],'blur',1,false);
      this.addFormControl('rpcontractbeneficiaryinfo', '',[ ]   ,[],'blur',1,false);

      this.addFormControl('beneInfoProportionFlag', '0', [Validators.required, Validators.min(1), Validators.max(1)]);
	
      this.setServiceCode(this._appConfig.getData('serviceCode'));

  }
  

  protected override doPostInit(): void {
   
  }
 
}

