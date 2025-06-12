import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAddBillerFormHelper,RetailAddBillerFormState} from './retail-add-biller-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BilleraccountreqService } from '../billeraccountreq-service/billeraccountreq.service';
import { Billeraccountreq } from '../billeraccountreq-service/billeraccountreq.model';

 
 
@Component({
 selector: 'app-retail-add-biller-form',
  templateUrl: './retail-add-biller-form.component.html',
  styleUrls: ['./retail-add-biller-form.component.scss'],
  providers : [ RetailAddBillerFormHelper]
  })

export class RetailAddBillerFormComponent extends  BaseFpxFormComponent<RetailAddBillerFormHelper, RetailAddBillerFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAddBillerFormHelper: RetailAddBillerFormHelper,
    public billeraccountreqService: BilleraccountreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailAddBillerFormHelper);
  }
  protected readonly nickName_maxLength: any = 35;
  dynamicFormName : string = "RetailAddBillerForm";

  protected override doPreInit(): void {
    this.addFormControl('inventoryNumber', '', [],
      [
        this.validatorService.dataAvailabilityCheck(
          this.embadedFormMode,
          'inventoryNumber',
          this.billeraccountreqService,
          this.dataAvailable$
        ),
      ], 'blur', 0, true, 0);

    this.addFormControl('debitAccount', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('billerId', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('creditCardAccounts', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('accountType', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('nickName', '', [Validators.maxLength(this.nickName_maxLength)], [], 'blur', 1, false, 0);
    this.addFormControl('smartPay', '', [], [], 'change', 1, false, 0);
    this.addFormControl('termsFlag', '',  [Validators.required ]   ,[],'change',1,false,0);			   		 
    this.addFormControl('billeraccountparamreq', '', [Validators.required], [], 'change', 1, false, 0);
    // this.addFormControl('remarks', '',  [Validators.required]   ,[],'change',1,false,0);			   		 
    this.addElement('smartPayDisclaimer');
    this.addElement('accountDetailAccordion');
    this.addFormControl('operationMode', '', [Validators.required], []);
    this.addFormControl('formUpdated', '', [Validators.required, Validators.min(1), Validators.max(1)], []);
    this.addFormControl('dynamicFormValid', '', [Validators.required, Validators.min(1), Validators.max(1)], []);
    // this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);	
    this.setDataService(this.billeraccountreqService);
    //  this.setServiceCode("RETAILBILLERACCOUNT");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
