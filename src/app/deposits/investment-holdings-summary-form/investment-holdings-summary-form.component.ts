import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { investmentHoldingsHelper,investmentHoldingsState} from './investment-holdings-summary-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { InvestmentHoldingsService } from '../investmentHoldings-service/investmentHoldings.service';
import { InvestmentHoldings } from '../investmentHoldings-service/investmentHoldings.model';

 
 
@Component({
 selector: 'app-investment-holdings-summary-form',
  templateUrl: './investment-holdings-summary-form.component.html',
  styleUrls: ['./investment-holdings-summary-form.component.scss'],
  providers : [ investmentHoldingsHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => investmentHoldingsComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => investmentHoldingsComponent)
  }]
  })

export class investmentHoldingsComponent extends  BaseFpxFormComponent<investmentHoldingsHelper, investmentHoldingsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public investmentHoldingsHelper: investmentHoldingsHelper,
    public investmentHoldingsService: InvestmentHoldingsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, investmentHoldingsHelper);
    this.setServiceCode("RETAILINVESTMENTHOLDINGS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.investmentHoldingsService);
  this.addElement('InvestmentHoldingsRoGrid');
     // this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILINVESTMENTHOLDINGS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

