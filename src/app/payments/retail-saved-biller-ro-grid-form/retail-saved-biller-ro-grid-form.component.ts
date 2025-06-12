import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailSavedBillerRoGridFormHelper,RetailSavedBillerRoGridFormState} from './retail-saved-biller-ro-grid-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BilleraccountService } from '../billeraccount-service/billeraccount.service';
import { Billeraccount } from '../billeraccount-service/billeraccount.model';

 
 
@Component({
 selector: 'app-retail-saved-biller-ro-grid-form',
  templateUrl: './retail-saved-biller-ro-grid-form.component.html',
  styleUrls: ['./retail-saved-biller-ro-grid-form.component.scss'],
  providers : [ RetailSavedBillerRoGridFormHelper]
  })

export class RetailSavedBillerRoGridFormComponent extends  BaseFpxFormComponent<RetailSavedBillerRoGridFormHelper, RetailSavedBillerRoGridFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSavedBillerRoGridFormHelper: RetailSavedBillerRoGridFormHelper,
    public billeraccountService: BilleraccountService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailSavedBillerRoGridFormHelper);
  }
   protected override doPreInit(): void {
    this.addElement('savedBillersGridGroup');
    this.addElement('noSavedBillersGrid');
    this.addElement('searchTextGroup');
    this.addElement('savedBillersGrid');
    this.addElement('noFilteredData');


    this.addFormControl('searchText', '', [], [], 'change');

	this.setDataService(this.billeraccountService);
	this.setServiceCode("RETAILSAVEDBILLERROGRIDFORM");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
