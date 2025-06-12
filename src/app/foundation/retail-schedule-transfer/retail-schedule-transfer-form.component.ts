import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { RetailScheduleTransferFormComponentState,RetailScheduleTransferFormComponentHelper } from './retail-schedule-transfer-form.helper';
import { DeviceDetectorService } from '@dep/core';
import { SiownreqService } from 'src/app/transfers/siownreq-service/siownreq.service';
import { AccessScopePipe } from 'src/app/common/pipe/access-scope/access-scope.pipe';

@Component({
  selector: 'app-retail-schedule-transfer-form',
  templateUrl: './retail-schedule-transfer-form.component.html',
  styleUrls: ['./retail-schedule-transfer-form.component.scss'],
  providers: [
    RetailScheduleTransferFormComponentHelper,
    CasatransactiondtlsService,
    AccessScopePipe
  ]
})
export class RetailScheduleTransferFormComponent extends BaseFpxFormComponent<RetailScheduleTransferFormComponentHelper,RetailScheduleTransferFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _retailScheduleTransferFormComponentHelper: RetailScheduleTransferFormComponentHelper,
    public _device: DeviceDetectorService,
    public SiownreqService: SiownreqService,
  ) { 
    super(formBuilder, router,controlContainer, _retailScheduleTransferFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('scheduletransferdetailsGrid');
    this.setDataService(this.SiownreqService);
    this.setServiceCode("RETAILSCHOAT");
  }

}
