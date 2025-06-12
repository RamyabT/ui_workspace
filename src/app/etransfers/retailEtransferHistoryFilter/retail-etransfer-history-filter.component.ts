import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferHistoryFilterHelper,RetailEtransferHistoryFilterState} from './retail-etransfer-history-filter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailetransferhistoryfilterService } from '../retailetransferhistoryfilter-service/retailetransferhistoryfilter.service';
import { Retailetransferhistoryfilter } from '../retailetransferhistoryfilter-service/retailetransferhistoryfilter.model';

 
 
@Component({
 selector: 'app-retail-etransfer-history-filter',
  templateUrl: './retail-etransfer-history-filter.component.html',
  styleUrls: ['./retail-etransfer-history-filter.component.scss'],
  providers : [ RetailEtransferHistoryFilterHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferHistoryFilterComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferHistoryFilterComponent)
  }]
  })

export class RetailEtransferHistoryFilterComponent extends  BaseFpxFormComponent<RetailEtransferHistoryFilterHelper, RetailEtransferHistoryFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferHistoryFilterHelper: RetailEtransferHistoryFilterHelper,
    public retailetransferhistoryfilterService: RetailetransferhistoryfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferHistoryFilterHelper);
    this.setServiceCode("ETRANSFERSENDMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.retailetransferhistoryfilterService);
      this.addFormControl('fromDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('toDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("ETRANSFERSENDMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

