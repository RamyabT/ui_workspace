import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanTranDtlsDownloadFilterFormHelper,RetailLoanTranDtlsDownloadFilterFormState} from './retail-loan-tran-dtls-download-filter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailloantrandtlsdownloadfilterformService } from '../retailloantrandtlsdownloadfilterform-service/retailloantrandtlsdownloadfilterform.service';
import { Retailloantrandtlsdownloadfilterform } from '../retailloantrandtlsdownloadfilterform-service/retailloantrandtlsdownloadfilterform.model';

 
 
@Component({
 selector: 'app-retail-loan-tran-dtls-download-filter-form',
  templateUrl: './retail-loan-tran-dtls-download-filter-form.component.html',
  styleUrls: ['./retail-loan-tran-dtls-download-filter-form.component.scss'],
  providers : [ RetailLoanTranDtlsDownloadFilterFormHelper, 
  // {
  //   provide: NG_VALUE_ACCESSOR,
  //   multi: true,
  //   useExisting: forwardRef(() => RetailLoanTranDtlsDownloadFilterFormComponent)
  // },
  // {
  //   provide: NG_VALIDATORS,
  //   multi: true,
  //   useExisting: forwardRef(() => RetailLoanTranDtlsDownloadFilterFormComponent)
  // }
  ]
  })

export class RetailLoanTranDtlsDownloadFilterFormComponent extends  BaseFpxFormComponent<RetailLoanTranDtlsDownloadFilterFormHelper, RetailLoanTranDtlsDownloadFilterFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanTranDtlsDownloadFilterFormHelper: RetailLoanTranDtlsDownloadFilterFormHelper,
    public retailloantrandtlsdownloadfilterformService: RetailloantrandtlsdownloadfilterformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanTranDtlsDownloadFilterFormHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.retailloantrandtlsdownloadfilterformService);
  this.addFormControl('rangeType', '',  [Validators.required ]    ,[],'blur',1,false,0);
  this.addFormControl('downloadFileFormat', '',  [Validators.required ]    ,[],'blur',1,false,0);
  this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);
  this.addFormControl('toDate', '',  [Validators.required ]    ,[],'blur',1,false,0);	
  this.addElement('download');
	this.addElement('view');
	this.setServiceCode("RETAILLOANTRANDTLSFILTER");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
