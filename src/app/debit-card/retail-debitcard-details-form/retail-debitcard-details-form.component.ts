import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retaildebitcardformHelper,retaildebitcardformState} from './retail-debitcard-details-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DebitcardService } from '../debitcard-service/debitcard.service';
import { Debitcard } from '../debitcard-service/debitcard.model';
import { DcpinrequestService } from '../dcpinrequest-service/dcpinrequest.service';
import { DebitcardDetailsService } from '../debitcard-details-service/debitcard-details.service';

 
 
@Component({
 selector: 'app-retail-debitcard-details-form',
  templateUrl: './retail-debitcard-details-form.component.html',
  styleUrls: ['./retail-debitcard-details-form.component.scss'],
  providers : [ retaildebitcardformHelper]
  })

export class retaildebitcardformComponent extends  BaseFpxFormComponent<retaildebitcardformHelper, retaildebitcardformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retaildebitcardformHelper: retaildebitcardformHelper,
    public debitcardService: DebitcardService,
    public _debitcardDetailsService: DebitcardDetailsService,
    private validatorService: ValidatorService,
  ) {
    super(formBuilder, router,controlContainer, retaildebitcardformHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('cardRefNumber', '',  [Validators.required ]   ,
    [
      // this.validatorService.dataAvailabilityCheck(
      //   this.embadedFormMode,
      //   'cardReference',
      //   this.debitcardService,
      //   this.dataAvailable$
      // ),
    ],'blur',0,false,0);			  
    // this.addFormControl('cardNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    // this.addFormControl('cardType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    // this.addFormControl('status', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    // this.addFormControl('validThru', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branchDesc', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('issueDate', '',  [ ]    ,[],'blur',1,false,0);			   		   
      // this.setDataService(this.debitcardService);
     this.addFormControl('validFrom', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('accountNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('cardHolderName', '',  [ ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('actualBalance', '',  [ ]    ,[],'blur',1,false,0);			   		 
         this.addFormControl('accountType', '',  []    ,[],'blur',1,false,0);			   		 
         this.addFormControl('avlBalance', '',  [ ]    ,[],'blur',1,false,0);
	this.setServiceCode("RETAILFLASHDEBITCARD");
	this.setDataService(this._debitcardDetailsService);

  }
  

  protected override doPostInit(): void {
   
  }

  submitForm() {
    this.submit();
  }
  
}
