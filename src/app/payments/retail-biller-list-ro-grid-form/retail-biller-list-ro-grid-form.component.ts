import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import {  RetailBillerListRoGriFormHelper, RetailBillerListRoGriFormState} from './retail-biller-list-ro-grid-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BillerService } from '../biller-service/biller.service';
import { Biller } from '../biller-service/biller.model';

 
 
@Component({
 selector: 'app-retail-biller-list-ro-grid-form',
  templateUrl: './retail-biller-list-ro-grid-form.component.html',
  styleUrls: ['./retail-biller-list-ro-grid-form.component.scss'],
  providers : [ RetailBillerListRoGriFormHelper]
  })

export class RetailBillerListRoGriFormComponent extends  BaseFpxFormComponent<RetailBillerListRoGriFormHelper, RetailBillerListRoGriFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public billerListRoGriFormHelper: RetailBillerListRoGriFormHelper,
    public billerService: BillerService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, billerListRoGriFormHelper);
  }
   protected override doPreInit(): void {

    this.addElement('billersGrid');


    this.addFormControl('searchText', '', [], [], 'change');
	this.setDataService(this.billerService);
	this.setServiceCode("BILLERLISTROGRIDFORM");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
