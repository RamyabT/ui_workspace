import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailManageEtransferContactlogFormHelper, RetailManageEtransferContactlogFormState } from './retail-manage-etransfercontactlog-form.helper';
import { EtransfercontactlogService } from '../etransfercontactlog-service/etransfercontactlog.service';



@Component({
  selector: 'app-retail-manage-etransfercontactlog-form',
  templateUrl: './retail-manage-etransfercontactlog-form.component.html',
  styleUrls: ['./retail-manage-etransfercontactlog-form.component.scss'],
  providers: [RetailManageEtransferContactlogFormHelper]
})

export class RetailManageEtransferContactlogFormComponent extends BaseFpxFormComponent<RetailManageEtransferContactlogFormHelper, RetailManageEtransferContactlogFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageEtransferContactlogFormHelper: RetailManageEtransferContactlogFormHelper,
    public etransfercontactlogService: EtransfercontactlogService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageEtransferContactlogFormHelper);
    this.setServiceCode("RETAILMANAGEETRANSFERCONTACT");
  }
  
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('contactList');
    this.setDataService(this.etransfercontactlogService);
  }


  protected override doPostInit(): void {

  }

}
