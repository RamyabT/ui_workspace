import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailOpenNewCasaFormHelper,RetailOpenNewCasaFormState} from './retail-open-new-casa-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { OpennewcasaService } from '../opennewcasa-service/opennewcasa.service';
import { Opennewcasa } from '../opennewcasa-service/opennewcasa.model';

 
 
@Component({
 selector: 'app-retail-open-new-casa-form',
  templateUrl: './retail-open-new-casa-form.component.html',
  styleUrls: ['./retail-open-new-casa-form.component.scss'],
  providers : [ RetailOpenNewCasaFormHelper]
  })

export class RetailOpenNewCasaFormComponent extends  BaseFpxFormComponent<RetailOpenNewCasaFormHelper, RetailOpenNewCasaFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailOpenNewCasaFormHelper: RetailOpenNewCasaFormHelper,
    public opennewcasaService: OpennewcasaService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailOpenNewCasaFormHelper);
  }
  protected readonly remarks_maxLength: any = 100;
   protected override doPreInit(): void {
     this.addFormControl('accountType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('productCode', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountName', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('openingBranch', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountCurrency', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 		   		 
     this.addFormControl('debitAccountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('initialDepositAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);
     this.addFormControl('availableBalance', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('ischequebookreq', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 			   		 
     this.addFormControl('chargesAmount', '',  []    ,[],'change',1,false,0);	
     this.addFormControl('deliveryBranch', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.maxLength(this.remarks_maxLength)]    ,[],'change',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('addressInfo', '',  []    ,[],'blur',1,false,0);			   		 
   this.addFormControl('baseRate', '', [], [], 'blur', 1, false, 0);
   this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false, 0);
   this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);
   this.addFormControl('addressInformation', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('productDescription','',[],[],'blur',1,false,0);
 this.addElement('exchangeDetails');
   this.addElement('infoNote');
	this.setDataService(this.opennewcasaService);
	this.setServiceCode("RETAILOPENNEWCASA");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
