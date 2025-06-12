 



import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
 import { FbScheduleFormComponentHelper, FbScheduleFormComponentState } from './fb-schedule-form.helper';

@Component({
  selector: 'app-fb-schedule-form',
  templateUrl: './fb-schedule-form.component.html',
  styleUrls: ['./fb-schedule-form.component.scss'],
  providers: [
    FbScheduleFormComponentHelper,
    CasatransactiondtlsService
  ]
})
export class FbScheduleFormComponent extends BaseFpxFormComponent<FbScheduleFormComponentHelper,FbScheduleFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _scheduleFormComponentHelper: FbScheduleFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _scheduleFormComponentHelper);
  }

  override doPreInit(){
    this.addElement('scheduletransactiondetailsGrid','');
  }

}

