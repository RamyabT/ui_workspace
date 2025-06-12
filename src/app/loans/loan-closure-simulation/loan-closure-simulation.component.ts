import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanClosureSimulationHelper,LoanClosureSimulationState} from './loan-closure-simulation.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanclosuresimulationService } from '../loanclosuresimulation-service/loanclosuresimulation.service';
import { Loanclosuresimulation } from '../loanclosuresimulation-service/loanclosuresimulation.model';

 
 
@Component({
 selector: 'app-loan-closure-simulation',
  templateUrl: './loan-closure-simulation.component.html',
  styleUrls: ['./loan-closure-simulation.component.scss'],
  providers : [ LoanClosureSimulationHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => LoanClosureSimulationComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => LoanClosureSimulationComponent)
  }]
  })

export class LoanClosureSimulationComponent extends  BaseFpxFormComponent<LoanClosureSimulationHelper, LoanClosureSimulationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loanClosureSimulationHelper: LoanClosureSimulationHelper,
    public loanclosuresimulationService: LoanclosuresimulationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, loanClosureSimulationHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.loanclosuresimulationService);
      this.addFormControl('loanAccountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('closureDate', '1',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILLOANCLOSURESIMULATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
