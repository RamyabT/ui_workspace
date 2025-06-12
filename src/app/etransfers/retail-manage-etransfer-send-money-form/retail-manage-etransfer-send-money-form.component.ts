import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailManageEtransferSendMoneyFormHelper, RetailManageEtransferSendMoneyFormState } from './retail-manage-etransfer-send-money-form.helper';



@Component({
  selector: 'retail-manage-etransfer-send-money-form',
  templateUrl: './retail-manage-etransfer-send-money-form.component.html',
  styleUrls: ['./retail-manage-etransfer-send-money-form.component.scss'],
  providers: [RetailManageEtransferSendMoneyFormHelper]
})

export class RetailManageEtransferSendMoneyFormComponent extends BaseFpxFormComponent<RetailManageEtransferSendMoneyFormHelper, RetailManageEtransferSendMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageEtransferSendMoneyFormHelper: RetailManageEtransferSendMoneyFormHelper,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageEtransferSendMoneyFormHelper);
    this.setServiceCode("RETAILMANAGEETRANSFERSENDMONEY");
  }
  
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('contactList');
  }


  protected override doPostInit(): void {

  }

}
