import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControlStatus  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxChangeHandler, BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { CobTaxDetailsFormHelper, CobTaxDetailsFormState } from './cob-tax-details-form.helper';
import { CobtaxdetailsService } from '../cobtaxdetails-service/cobtaxdetails.service';

 
 
@Component({
 selector: 'app-cob-tax-details-form',
  templateUrl: './cob-tax-details-form.component.html',
  styleUrls: ['./cob-tax-details-form.component.scss'],
  providers : [ CobTaxDetailsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CobTaxDetailsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => CobTaxDetailsFormComponent)
  }]
  })

export class CobTaxDetailsFormComponent extends  BaseFpxFormComponent<CobTaxDetailsFormHelper, CobTaxDetailsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cobTaxDetailsFormHelper: CobTaxDetailsFormHelper,
    public cobtaxdetailsService: CobtaxdetailsService,
    private validatorService: ValidatorService,
    public appConfig: AppConfigService
  ) {
    super(formBuilder, router,controlContainer, cobTaxDetailsFormHelper);
    this.setServiceCode("RETAILCOBTAXDETAILS");  
}
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 35;
  protected readonly city_minLength:any = 2;
  protected readonly city_maxLength:any = 35;
   protected override doPreInit(): void {
  this.setDataService(this.cobtaxdetailsService);
      this.addFormControl('countryOfBirth', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('cityOfBirth', '',[Validators.required, Validators.minLength(this.city_minLength), Validators.maxLength(this.city_maxLength)]  ,[],'blur',1,false);			   		 
      this.addFormControl('countryOfTax', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('taxPayerIdAvailable', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('reasonForNoTin', '',[Validators.required,  ]   ,[],'blur',1,false);			   		 	
      this.addFormControl('taxPayerId', '',[Validators.required, ],[],'blur',1);   
      this.addFormControl('addCountryOfTax', '',[ ],[],'blur',1);
      this.addFormControl('remarks', '', [Validators.required, Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)], [], 'change', 1, false, 0);

	this.setServiceCode("RETAILCOBTAXDETAILS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

