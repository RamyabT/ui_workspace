import { Component, EventEmitter, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCustomerEnrollmentHelper, RetailCustomerEnrollmentState } from './retail-npss-customer-enroll.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailcustomerenrollmentService } from '../retailcustomerenrollment-service/retailcustomerenrollment.service';
import { Retailcustomerenrollment } from '../retailcustomerenrollment-service/retailcustomerenrollment.model';
import { RetailSavingsAccountRoGridComponent } from '../retail-savings-account-ro-grid/retail-savings-account-ro-grid.component';



@Component({
  selector: 'app-retail-npss-customer-enroll',
  templateUrl: './retail-npss-customer-enroll.component.html',
  styleUrls: ['./retail-npss-customer-enroll.component.scss'],
  providers: [RetailCustomerEnrollmentHelper, RetailcustomerenrollmentService]
})

export class RetailCustomerEnrollmentComponent extends BaseFpxFormComponent<RetailCustomerEnrollmentHelper, RetailCustomerEnrollmentState>  {
  
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCustomerEnrollmentHelper: RetailCustomerEnrollmentHelper,
    public retailcustomerenrollmentService: RetailcustomerenrollmentService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailCustomerEnrollmentHelper);
    this.setServiceCode("RETAILNPSSENROLL");
  }
  protected override doPreInit(): void {
    this.addElement('savingsAccountsList');
    this.addFormControl('accountDetails', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('operationMode', '', [Validators.required]);
    this.setDataService(this.retailcustomerenrollmentService);
  }

  protected override doPostInit(): void {
  }

}
