import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailBillSummaryFormHelper,RetailBillSummaryFormState} from './retail-bill-summary-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BillsummaryService } from '../billsummary-service/billsummary.service';
import { Billsummary } from '../billsummary-service/billsummary.model';

 
 
@Component({
 selector: 'app-retail-bill-summary-form',
  templateUrl: './retail-bill-summary-form.component.html',
  styleUrls: ['./retail-bill-summary-form.component.scss'],
  providers : [ RetailBillSummaryFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailBillSummaryFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailBillSummaryFormComponent)
  }]
  })

export class RetailBillSummaryFormComponent extends  BaseFpxFormComponent<RetailBillSummaryFormHelper, RetailBillSummaryFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBillSummaryFormHelper: RetailBillSummaryFormHelper,
    public billsummaryService: BillsummaryService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailBillSummaryFormHelper);
    this.setServiceCode("RETAILBILLSUMMARY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.billsummaryService);
  this.addElement('UpcomingBillPaymentRoGrid');
  this.addElement('BillPaymentHistoryRoGird');
  this.addElement('filter');

      this.addFormControl('billerName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILBILLSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

