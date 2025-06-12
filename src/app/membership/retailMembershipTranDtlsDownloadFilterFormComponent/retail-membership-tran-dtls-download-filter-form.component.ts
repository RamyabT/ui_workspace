import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailmembershiptrandtlsdownloadfilterformHelper,retailmembershiptrandtlsdownloadfilterformState} from './retail-membership-tran-dtls-download-filter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailmembershiptrandtlsdownloadfilterformService } from '../retailmembershiptrandtlsdownloadfilterform-service/retailmembershiptrandtlsdownloadfilterform.service';
import { Retailmembershiptrandtlsdownloadfilterform } from '../retailmembershiptrandtlsdownloadfilterform-service/retailmembershiptrandtlsdownloadfilterform.model';

 
 
@Component({
 selector: 'app-retail-membership-tran-dtls-download-filter-form',
  templateUrl: './retail-membership-tran-dtls-download-filter-form.component.html',
  styleUrls: ['./retail-membership-tran-dtls-download-filter-form.component.scss'],
  providers : [ retailmembershiptrandtlsdownloadfilterformHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => retailmembershiptrandtlsdownloadfilterformComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => retailmembershiptrandtlsdownloadfilterformComponent)
  }]
  })

export class retailmembershiptrandtlsdownloadfilterformComponent extends  BaseFpxFormComponent<retailmembershiptrandtlsdownloadfilterformHelper, retailmembershiptrandtlsdownloadfilterformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailmembershiptrandtlsdownloadfilterformHelper: retailmembershiptrandtlsdownloadfilterformHelper,
    public retailmembershiptrandtlsdownloadfilterformService: RetailmembershiptrandtlsdownloadfilterformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailmembershiptrandtlsdownloadfilterformHelper);
    this.setServiceCode("RETAILMEMBERSHIPTRANSACTION");  
}
   protected override doPreInit(): void {
  this.setDataService(this.retailmembershiptrandtlsdownloadfilterformService);
      this.addFormControl('rangeType', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('fromDate', '1',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('toDate', '1',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('downloadFileFormat', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILMEMBERSHIPTRANSACTION");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

