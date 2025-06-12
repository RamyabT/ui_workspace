import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanTranDtlsFilterFormHelper,RetailLoanTranDtlsFilterFormState} from './retail-loan-tran-dtls-filter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailloantrandtlsfilterformService } from '../retailloantrandtlsfilterform-service/retailloantrandtlsfilterform.service';
import { Retailloantrandtlsfilterform } from '../retailloantrandtlsfilterform-service/retailloantrandtlsfilterform.model';

 
 
@Component({
 selector: 'app-retail-loan-tran-dtls-filter-form',
  templateUrl: './retail-loan-tran-dtls-filter-form.component.html',
  styleUrls: ['./retail-loan-tran-dtls-filter-form.component.scss'],
  providers : [ RetailLoanTranDtlsFilterFormHelper, 
  // {
  //   provide: NG_VALUE_ACCESSOR,
  //   multi: true,
  //   useExisting: forwardRef(() => RetailLoanTranDtlsFilterFormComponent)
  // },
  // {
  //   provide: NG_VALIDATORS,
  //   multi: true,
  //   useExisting: forwardRef(() => RetailLoanTranDtlsFilterFormComponent)
  // }
  ]
  })

export class RetailLoanTranDtlsFilterFormComponent extends  BaseFpxFormComponent<RetailLoanTranDtlsFilterFormHelper, RetailLoanTranDtlsFilterFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanTranDtlsFilterFormHelper: RetailLoanTranDtlsFilterFormHelper,
    public retailloantrandtlsfilterformService: RetailloantrandtlsfilterformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanTranDtlsFilterFormHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.retailloantrandtlsfilterformService);
  this.addFormControl('rangeType', '',  [Validators.required ]    ,[],'blur',1,false,0);
  this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);
  this.addFormControl('toDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
  this.addElement('view');
	this.setServiceCode("RETAILLOANTRANDTLSFILTER");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
