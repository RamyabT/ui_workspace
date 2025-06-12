import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { EtransferService } from '../etransfer-service/etransfer.service';
import { RetailEtransferManageScheduledFormComponentHelper, RetailEtransferManageScheduledFormComponentState } from './retail-etransfer-manage-scheduled-form.helper';
import { ScheduleetransferService } from '../scheduleetransfer-service/scheduleetransfer.service';


@Component({
  selector: 'retail-etransfer-manage-scheduled-form',
  templateUrl: './retail-etransfer-manage-scheduled-form.component.html',
  styleUrls: ['./retail-etransfer-manage-scheduled-form.component.scss'],
  providers: [
    RetailEtransferManageScheduledFormComponentHelper
  ]
})
export class RetailEtransferManageScheduledFormComponent extends BaseFpxFormComponent<RetailEtransferManageScheduledFormComponentHelper,RetailEtransferManageScheduledFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _etransferHistoryFormComponentHelper: RetailEtransferManageScheduledFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _etransferHistoryFormComponentHelper);
    this.setServiceCode("RETAILSCHETRANSFER");
  }

  override doPreInit(){
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('etransferScheduledGrid');
  }


}
