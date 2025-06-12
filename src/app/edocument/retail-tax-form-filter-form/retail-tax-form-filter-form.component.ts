import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailTaxFormFilterFormHelper,RetailTaxFormFilterFormState} from './retail-tax-form-filter-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailtaxformfilterformService } from '../retailtaxformfilterform-service/retailtaxformfilterform.service';
import { Retailtaxformfilterform } from '../retailtaxformfilterform-service/retailtaxformfilterform.model';

 
 
@Component({
 selector: 'app-retail-tax-form-filter-form',
  templateUrl: './retail-tax-form-filter-form.component.html',
  styleUrls: ['./retail-tax-form-filter-form.component.scss'],
  providers : [ RetailTaxFormFilterFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailTaxFormFilterFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailTaxFormFilterFormComponent)
  }]
  })

export class RetailTaxFormFilterFormComponent extends  BaseFpxFormComponent<RetailTaxFormFilterFormHelper, RetailTaxFormFilterFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailTaxFormFilterFormHelper: RetailTaxFormFilterFormHelper,
    public retailtaxformfilterformService: RetailtaxformfilterformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailTaxFormFilterFormHelper);
    this.setServiceCode("RETAILGETTAXFORMS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.retailtaxformfilterformService);
      this.addFormControl('dateFrom', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('dateTo', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.addElement('reset');
	this.addElement('filter');
	this.setServiceCode("RETAILGETTAXFORMS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

