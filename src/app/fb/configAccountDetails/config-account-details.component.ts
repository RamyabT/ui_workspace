import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { configAccountDetailsHelper,configAccountDetailsState} from './config-account-details.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChildreqaccountdtlService } from '../childreqaccountdtl-service/childreqaccountdtl.service';
import { Childreqaccountdtl } from '../childreqaccountdtl-service/childreqaccountdtl.model';

 
 
@Component({
 selector: 'app-config-account-details',
  templateUrl: './config-account-details.component.html',
  styleUrls: ['./config-account-details.component.scss'],
  providers : [ configAccountDetailsHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => configAccountDetailsComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => configAccountDetailsComponent)
  }]
  })

export class configAccountDetailsComponent extends  BaseFpxFormComponent<configAccountDetailsHelper, configAccountDetailsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public configAccountDetailsHelper: configAccountDetailsHelper,
    public childreqaccountdtlService: ChildreqaccountdtlService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, configAccountDetailsHelper);
    // this.setServiceCode("childreqaccountdtl");  
}
   protected override doPreInit(): void {
  this.setDataService(this.childreqaccountdtlService);
  //  this.setTabConfiguration("", false, false, false, false,'HTab_1_HTab','');	 		
	// this.addTab('Config Account Details','', false,false, false,'HTab_1_HTab');
      this.addFormControl('debitAccNo', '',[Validators.required ]   ,[],'change',1,false);			   		 
      this.addFormControl('initialBalance', '',[Validators.required ]   ,[],'blur',1,false);			   		 
      this.addFormControl('recurringfrequency', '',[ ]   ,[],'change',1,false);			   		 
      this.addFormControl('recurringAmount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('startDate', '',[ ]   ,[],'change',1,false);			   		 
      this.addFormControl('noOfInstallments', '',[ ]   ,[],'change',1,false);			   		 
      this.addFormControl('endDate', '',[ ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('dailyLimit', '',[ ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('trnAuthLimit', '',[ ]   ,[],'blur',1,false);			   		 
	// this.setServiceCode("childreqaccountdtl");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

