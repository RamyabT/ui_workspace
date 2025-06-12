import { Component, OnInit, Optional } from '@angular/core';
import { RetailViewScheduleBillsFormHelper, RetailViewScheduleBillsFormState } from './retail-view-schedule-bills-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { SchedulebillpaymentService } from 'src/app/transfers/schedulebillpayment-service/schedulebillpayment.service';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchedulebillpaymentslogService } from '../schedulebillpaymentslog-service/schedulebillpaymentslog.service';

@Component({
  selector: 'app-retail-view-schedule-bills-form',
  templateUrl: './retail-view-schedule-bills-form.component.html',
  styleUrls: ['./retail-view-schedule-bills-form.component.scss'],
  providers : [ RetailViewScheduleBillsFormHelper]
})
export class RetailViewScheduleBillsFormComponent  extends  BaseFpxFormComponent<RetailViewScheduleBillsFormHelper, RetailViewScheduleBillsFormState>  {
    constructor(
      @Optional() controlContainer: ControlContainer,
      formBuilder: FormBuilder,
      private router: Router,
      public retailViewScheduleBillsFormHelper: RetailViewScheduleBillsFormHelper,
      public schedulebillpaymentlogService: SchedulebillpaymentslogService,
      private validatorService: ValidatorService,
      
    ) {
      super(formBuilder, router,controlContainer, retailViewScheduleBillsFormHelper);
    }
     protected override doPreInit(): void {
  
    this.setDataService(this.schedulebillpaymentlogService);
    this.setServiceCode("RETAILSCHBILLPAYMENTS");
  
  
    }
    
  
    protected override doPostInit(): void {
     
    }
    
  }

