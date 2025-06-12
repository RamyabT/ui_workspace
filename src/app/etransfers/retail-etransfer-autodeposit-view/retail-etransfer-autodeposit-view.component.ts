import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { RetailEtransferAutodepositViewHelper, RetailEtransferAutodepositViewState } from './retail-etransfer-autodeposit-view.helper';
import { EtransferautodepositlogService } from '../etransferautodepositlog-service/etransferautodepositlog.service';

@Component({
  selector: 'app-retail-etransfer-autodeposit-view',
  templateUrl: './retail-etransfer-autodeposit-view.component.html',
  styleUrls: ['./retail-etransfer-autodeposit-view.component.scss'],
  providers: [
    RetailEtransferAutodepositViewHelper
  ]
})
export class RetailEtransferAutodepositViewComponent extends BaseFpxFormComponent<RetailEtransferAutodepositViewHelper, RetailEtransferAutodepositViewState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public EtransferautodepositlogService: EtransferautodepositlogService,
    public retailEtransferAutodepositViewHelper: RetailEtransferAutodepositViewHelper,
  ) { 
    super(formBuilder, router,controlContainer, retailEtransferAutodepositViewHelper);
  }

  override doPreInit(){
    this.addElement('autodepositdetailsGrid');
    this.setDataService(this.EtransferautodepositlogService);
    this.setServiceCode('RETAILETRANSFERAUTODEPOSIT');
  }

}
