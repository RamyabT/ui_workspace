import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailcasatrandtlsfilterformService } from '../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.service';
import { Retailcasatrandtlsfilterform } from '../retailcasatrandtlsfilterform-service/retailcasatrandtlsfilterform.model';
import { RetailSampleChequeHelper, RetailSampleChequeState } from './retail-sample-cheque.helper';

 
 
@Component({
 selector: 'app-retail-sample-cheque',
  templateUrl: './retail-sample-cheque.component.html',
  styleUrls: ['./retail-sample-cheque.component.scss'],
  providers : [ RetailSampleChequeHelper]
  })

export class RetailSampleChequeComponent extends  BaseFpxFormComponent<RetailSampleChequeHelper, RetailSampleChequeState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService,
    public retailSampleChequeHelper: RetailSampleChequeHelper,
    
  ) {
    super(formBuilder, router,controlContainer, retailSampleChequeHelper);
  }

   protected override doPreInit(): void {

  }
  

  protected override doPostInit(): void {
   
  }
  
}
