import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { EtransferHistoryFormComponentHelper, EtransferHistoryFormComponentState } from './etransfer-history-form.helper';
import { EtransferService } from '../etransfer-service/etransfer.service';


@Component({
  selector: 'etransfer-history-form',
  templateUrl: './etransfer-history-form.component.html',
  styleUrls: ['./etransfer-history-form.component.scss'],
  providers: [
    EtransferHistoryFormComponentHelper,
    EtransferService
  ]
})
export class ETransferHistoryFormComponent extends BaseFpxFormComponent<EtransferHistoryFormComponentHelper,EtransferHistoryFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _etransferHistoryFormComponentHelper: EtransferHistoryFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _etransferHistoryFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('etransferHistoryGrid');
  }


}
