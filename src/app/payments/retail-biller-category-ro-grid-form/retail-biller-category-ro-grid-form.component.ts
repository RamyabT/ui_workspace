import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import {  RetailBillerCategoryRoGriFormHelper, RetailBillerCategoryRoGriFormState} from './retail-biller-list-ro-grid-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BillerService } from '../biller-service/biller.service';
import { Biller } from '../biller-service/biller.model';
import { RetailBillerListRoGriFormHelper } from '../retail-biller-list-ro-grid-form/retail-biller-list-ro-grid-form.helper';

 
 
@Component({
 selector: 'app-retail-biller-category-ro-grid-form',
  templateUrl: './retail-biller-category-ro-grid-form.component.html',
  styleUrls: ['./retail-biller-category-ro-grid-form.component.scss'],
  providers : [ RetailBillerCategoryRoGriFormHelper]
  })

export class RetailBillerCategoryRoGriFormComponent extends  BaseFpxFormComponent<RetailBillerCategoryRoGriFormHelper, RetailBillerCategoryRoGriFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public billerListRoGriFormHelper: RetailBillerCategoryRoGriFormHelper,
    public billerService: BillerService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, billerListRoGriFormHelper);
  }
   protected override doPreInit(): void {

    this.addElement('billersCategoryGrid');


    this.addFormControl('searchText', '', [], [], 'change');
	this.setDataService(this.billerService);
	this.setServiceCode("BILLERLISTROGRIDFORM");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
