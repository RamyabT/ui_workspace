import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFXRatesFormHelper,RetailFXRatesFormState} from './retail-fx-rates-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FxratesService } from '../fxrates-service/fxrates.service';
import { Fxrates } from '../fxrates-service/fxrates.model';

 
 
@Component({
 selector: 'app-retail-fx-rates-form',
  templateUrl: './retail-fx-rates-form.component.html',
  styleUrls: ['./retail-fx-rates-form.component.scss'],
  providers : [ RetailFXRatesFormHelper]
  })

export class RetailFXRatesFormComponent extends  BaseFpxFormComponent<RetailFXRatesFormHelper, RetailFXRatesFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFXRatesFormHelper: RetailFXRatesFormHelper,
    public fxratesService: FxratesService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFXRatesFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.fxratesService);
	this.setServiceCode("RETAILFXRATESFORM");

  }
  

  protected override doPostInit(): void {

   
  }
  
}
