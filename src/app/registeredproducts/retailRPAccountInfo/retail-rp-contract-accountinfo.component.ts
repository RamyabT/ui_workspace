import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRPAccountInfoHelper,RetailRPAccountInfoState} from './retail-rp-contract-accountinfo.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RpcontractaccountinfoService } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.service';
import { Rpcontractaccountinfo } from '../rpcontractaccountinfo-service/rpcontractaccountinfo.model';
import { AppConfigService } from '@dep/services';

 
 
@Component({
 selector: 'app-retail-rp-contract-accountinfo',
  templateUrl: './retail-rp-contract-accountinfo.component.html',
  styleUrls: ['./retail-rp-contract-accountinfo.component.scss'],
  providers : [ RetailRPAccountInfoHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailRPAccountInfoComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailRPAccountInfoComponent)
  }]
  })

export class RetailRPAccountInfoComponent extends  BaseFpxFormComponent<RetailRPAccountInfoHelper, RetailRPAccountInfoState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRPAccountInfoHelper: RetailRPAccountInfoHelper,
    public rpcontractaccountinfoService: RpcontractaccountinfoService,
    private validatorService: ValidatorService,
    private _appConfig: AppConfigService,
    
  ) {
    super(formBuilder, router,controlContainer, retailRPAccountInfoHelper);
    // this.setServiceCode("RETAILRPACCOUNTINFO"); 
    // this.setServiceCode("RETAILRPNCTFSA");
    this._appConfig.getData('serviceCode');
}
   protected override doPreInit(): void {
  this.setDataService(this.rpcontractaccountinfoService);
      this.addFormControl('depositAmount', '',[Validators.required, ]   ,[],'blur',1,false);	
      this.addFormControl('segmentId', '',[Validators.required, ]   ,[],'change',1,false)		   		 
      this.addFormControl('productId', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('fromAccount', '',[Validators.required, ]   ,[],'blur',1,false);
      this.addFormControl('intendedUse', '',[Validators.required ]   ,[],'blur',1,false);	
      this.addFormControl('baseRate', '1',[Validators.required ]   ,[],'blur',1,false);	
      this.addFormControl('exchangeRate', '1',[Validators.required ]   ,[],'blur',1,false);	
      this.addFormControl('serviceCodeValue', '', [Validators.required, ], [], 'change', 1, false);

	// this.setServiceCode("RETAILRPACCOUNTINFO");
  //  this.setServiceCode("RETAILRPNCTFSA"); 
  this._appConfig.getData('serviceCode');
  }
  

  protected override doPostInit(): void {
   
  }
 
}

