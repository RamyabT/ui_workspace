import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailNpssRequestMoneyHelper,RetailNpssRequestMoneyState} from './retail-npss-request-money.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpssrequestmoneyService } from '../npssrequestmoney-service/npssrequestmoney.service';
import { Npssrequestmoney } from '../npssrequestmoney-service/npssrequestmoney.model';

 
 
@Component({
 selector: 'app-retail-npss-request-money',
  templateUrl: './retail-npss-request-money.component.html',
  styleUrls: ['./retail-npss-request-money.component.scss'],
  providers : [ RetailNpssRequestMoneyHelper]
  })

export class RetailNpssRequestMoneyComponent extends  BaseFpxFormComponent<RetailNpssRequestMoneyHelper, RetailNpssRequestMoneyState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailNpssRequestMoneyHelper: RetailNpssRequestMoneyHelper,
    public npssrequestmoneyService: NpssrequestmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailNpssRequestMoneyHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('email', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('mobileNumber', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.npssrequestmoneyService);
	this.setServiceCode("RETAILREQUESTMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
