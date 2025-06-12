import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { RetailScheduleBillsFormComponentState,RetailScheduleBillsFormComponentHelper } from './retail-schedule-bills-form.helper';
import { DeviceDetectorService } from '@dep/core';
import { SchedulebillpaymentslogService } from 'src/app/payments/schedulebillpaymentslog-service/schedulebillpaymentslog.service';
import { SchedulebillpaymentService } from 'src/app/transfers/schedulebillpayment-service/schedulebillpayment.service';
import { AccessScopePipe } from 'src/app/common/pipe/access-scope/access-scope.pipe';

@Component({
  selector: 'app-retail-schedule-bills-form',
  templateUrl: './retail-schedule-bills-form.component.html',
  styleUrls: ['./retail-schedule-bills-form.component.scss'],
  providers: [
    RetailScheduleBillsFormComponentHelper,
    CasatransactiondtlsService,
    AccessScopePipe
  ]
})
export class RetailScheduleBillsFormComponent extends BaseFpxFormComponent<RetailScheduleBillsFormComponentHelper,RetailScheduleBillsFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _retailScheduleBillsFormComponentHelper: RetailScheduleBillsFormComponentHelper,
    public schedulebillpaymentlogService: SchedulebillpaymentService,
    public _device: DeviceDetectorService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, _retailScheduleBillsFormComponentHelper);
  }
   protected override doPreInit(): void {

  this.setDataService(this.schedulebillpaymentlogService);
  this.setServiceCode("RETAILSCHBILLPAYMENTS");
  this.addElement('scheduletransactiondetailsGrid');


  }


}
