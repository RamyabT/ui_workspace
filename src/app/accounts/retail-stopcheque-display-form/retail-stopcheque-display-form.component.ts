import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { RetailStopChequeDisplayFormComponentState,RetailStopChequeDisplayFormComponentHelper } from './retail-stopcheque-display-form.helper';
import { DeviceDetectorService } from '@dep/core';
import { StopchequeService } from '../stopcheque-service/stopcheque.service';

@Component({
  selector: 'app-retail-stopcheque-display-form',
  templateUrl: './retail-stopcheque-display-form.component.html',
  styleUrls: ['./retail-stopcheque-display-form.component.scss'],
  providers: [
    RetailStopChequeDisplayFormComponentHelper,
    StopchequeService
  ]
})
export class RetailStopChequeDisplayFormComponent extends BaseFpxFormComponent<RetailStopChequeDisplayFormComponentHelper,RetailStopChequeDisplayFormComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _RetailStopChequeDisplayFormComponentHelper: RetailStopChequeDisplayFormComponentHelper,
    public _device: DeviceDetectorService,
  ) { 
    super(formBuilder, router,controlContainer, _RetailStopChequeDisplayFormComponentHelper);
  }

  override doPreInit(){
    this.addFormControl('revokeEnable', 0, [Validators.required,Validators.min(1),Validators.max(1)]   ,[],'change',1,false);	
    this.addElement('scheduletransferdetailsGrid')
  }

}
