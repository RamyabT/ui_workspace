import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFaqsFormHelper,RetailFaqsFormState} from './retail-faqs-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FaqpublishService } from '../faqpublish-service/faqpublish.service';
import { Faqpublish } from '../faqpublish-service/faqpublish.model';

 
 
@Component({
 selector: 'app-retail-faqs-form',
  templateUrl: './retail-faqs-form.component.html',
  styleUrls: ['./retail-faqs-form.component.scss'],
  providers : [ RetailFaqsFormHelper]
  })

export class RetailFaqsFormComponent extends  BaseFpxFormComponent<RetailFaqsFormHelper, RetailFaqsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFaqsFormHelper: RetailFaqsFormHelper,
    public faqpublishService: FaqpublishService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFaqsFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.faqpublishService);
	this.setServiceCode("RETAILFAQPUBLISH");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
