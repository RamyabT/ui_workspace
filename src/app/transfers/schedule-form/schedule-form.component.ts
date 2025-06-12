import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ScheduleFormComponentState,ScheduleFormComponentHelper } from './schedule-form.helper';
import { SiownreqService } from '../siownreq-service/siownreq.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss'],
  providers: [
    ScheduleFormComponentHelper,
    CasatransactiondtlsService
  ]
})
export class ScheduleFormComponent extends BaseFpxFormComponent<ScheduleFormComponentHelper,ScheduleFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public SiownreqService: SiownreqService,
    public _scheduleFormComponentHelper: ScheduleFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _scheduleFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('scheduletransactiondetailsGrid');
    this.setDataService(this.SiownreqService);
    this.setServiceCode("RETAILSCHOAT");
  }

}
