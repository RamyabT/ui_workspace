import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailKillPreviousSessionHelper,RetailKillPreviousSessionState} from './retail-kill-previous-session.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { KillprevioussessionService } from '../killprevioussession-service/killprevioussession.service';

 
 
@Component({
 selector: 'app-retail-kill-previous-session',
  templateUrl: './retail-kill-previous-session.component.html',
  styleUrls: ['./retail-kill-previous-session.component.scss'],
  providers : [ RetailKillPreviousSessionHelper,KillprevioussessionService]
  })

export class RetailKillPreviousSessionComponent extends  BaseFpxFormComponent<RetailKillPreviousSessionHelper, RetailKillPreviousSessionState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailKillPreviousSessionHelper: RetailKillPreviousSessionHelper,
    public killprevioussessionService: KillprevioussessionService,
    private validatorService: ValidatorService,
  ) {
    super(formBuilder, router,controlContainer, retailKillPreviousSessionHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.killprevioussessionService);
	this.setServiceCode("RETAILKILLPREVSESSION");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
