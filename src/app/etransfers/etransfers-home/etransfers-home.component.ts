import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { ETransferHistoryFormComponent } from '../etransfer-history-form/etransfer-history-form.component';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EtransferHistoryFormComponentHelper } from '../etransfer-history-form/etransfer-history-form.helper';
import { EtransfersHomeComponentHelper, EtransfersHomeComponentState } from './etransfers-home.helper';

@Component({
  selector: 'app-etransfers-home',
  templateUrl: './etransfers-home.component.html',
  styleUrls: ['./etransfers-home.component.scss'],
  providers: [
    EtransfersHomeComponentHelper
  ]
})
export class EtransfersHomeComponent  extends BaseFpxFormComponent<EtransfersHomeComponentHelper,EtransfersHomeComponentState> {
  @ViewChild(EtransfersHomeComponent) etransfersHomeComponent!: EtransfersHomeComponent;

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _etransfersHomeComponentHelper: EtransfersHomeComponentHelper,
    private _appConfig: AppConfigService
  ) { 
    super(formBuilder, router,controlContainer, _etransfersHomeComponentHelper);
  }

  override doPreInit(){

  }


  override doPostInit() {

  }

  

  back() {
    this.router.navigate(['/etransfers-space']);
  }

}
