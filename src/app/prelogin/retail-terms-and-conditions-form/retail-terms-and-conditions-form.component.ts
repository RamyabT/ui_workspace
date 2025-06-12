import { Component,ElementRef,EventEmitter,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailTermsAndConditionsFormHelper,RetailTermsAndConditionsFormState} from './retail-terms-and-conditions-form.helper';
import { BaseFpxFormComponent,FpxDisplayTextComponent,ValidatorService } from '@fpx/core'; 
import { TermspublishService } from '../termspublish-service/termspublish.service';
import { Termspublish } from '../termspublish-service/termspublish.model';

 
 
@Component({
 selector: 'app-retail-terms-and-conditions-form',
  templateUrl: './retail-terms-and-conditions-form.component.html',
  styleUrls: ['./retail-terms-and-conditions-form.component.scss'],
  providers : [ RetailTermsAndConditionsFormHelper]
  })

export class RetailTermsAndConditionsFormComponent extends  BaseFpxFormComponent<RetailTermsAndConditionsFormHelper, RetailTermsAndConditionsFormState>  {
  @ViewChild('termsAndConditions',{read:ElementRef}) termsAndConditions!: ElementRef;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailTermsAndConditionsFormHelper: RetailTermsAndConditionsFormHelper,
    public termspublishService: TermspublishService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailTermsAndConditionsFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.termspublishService);
	this.setServiceCode("RETAILTERMSANDCONDITIONS");

  }
  

  protected override doPostInit(): void {
    this.state.contentHeight=this.termsAndConditions.nativeElement.offsetHeight;
   console.log('t&c height',this.state.contentHeight);
  }
  
}
