import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentHoldingsFormHelper,InvestmentHoldingsFormState} from './investment-holdings-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { InvestmentHoldingsService } from '../investmentHoldings-service/investmentHoldings.service';
import { InvestmentHoldings } from '../investmentHoldings-service/investmentHoldings.model';

 
 
@Component({
 selector: 'app-investment-holdings-form',
  templateUrl: './investment-holdings-form.component.html',
  styleUrls: ['./investment-holdings-form.component.scss'],
  providers : [ InvestmentHoldingsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => InvestmentHoldingsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => InvestmentHoldingsFormComponent)
  }]
  })

export class InvestmentHoldingsFormComponent extends  BaseFpxFormComponent<InvestmentHoldingsFormHelper, InvestmentHoldingsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public investmentHoldingsFormHelper: InvestmentHoldingsFormHelper,
    public investmentHoldingsService: InvestmentHoldingsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, investmentHoldingsFormHelper);
    this.setServiceCode("RETAILINVESTMENTHOLDINGS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.investmentHoldingsService);
      this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILINVESTMENTHOLDINGS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

