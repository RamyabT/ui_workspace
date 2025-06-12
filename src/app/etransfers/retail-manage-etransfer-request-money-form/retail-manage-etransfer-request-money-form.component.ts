import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailManageEtransferRequestMoneyFormHelper, RetailManageEtransferRequestMoneyFormState } from './retail-manage-etransfer-request-money-form.helper';



@Component({
  selector: 'retail-manage-etransfer-request-money-form',
  templateUrl: './retail-manage-etransfer-request-money-form.component.html',
  styleUrls: ['./retail-manage-etransfer-request-money-form.component.scss'],
  providers: [RetailManageEtransferRequestMoneyFormHelper]
})

export class RetailManageEtransferRequestMoneyFormComponent extends BaseFpxFormComponent<RetailManageEtransferRequestMoneyFormHelper, RetailManageEtransferRequestMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageEtransferSendMoneyFormHelper: RetailManageEtransferRequestMoneyFormHelper,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageEtransferSendMoneyFormHelper);
    this.setServiceCode("RETAILMANAGEETRANSFERREQUESTMONEY");
  }
  
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('contactList');
  }


  protected override doPostInit(): void {

  }

}
