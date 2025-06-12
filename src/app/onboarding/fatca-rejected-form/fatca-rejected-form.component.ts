import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { FatcaRejectedHelper,FatcaRejectedState} from './fatca-rejected-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FatcaRejectedService } from '../fatcaRejected-service/fatcaRejected.service';
import { FatcaRejected } from '../fatcaRejected-service/fatcaRejected.model';

 
 
@Component({
 selector: 'app-fatca-rejected-form',
  templateUrl: './fatca-rejected-form.component.html',
  styleUrls: ['./fatca-rejected-form.component.scss'],
  providers : [ FatcaRejectedHelper]
  })

export class FatcaRejectedComponent extends  BaseFpxFormComponent<FatcaRejectedHelper, FatcaRejectedState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public fatcaRejectedHelper: FatcaRejectedHelper,
    public fatcaRejectedService: FatcaRejectedService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, fatcaRejectedHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.fatcaRejectedService);
	this.setServiceCode("fatcaRejected");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
