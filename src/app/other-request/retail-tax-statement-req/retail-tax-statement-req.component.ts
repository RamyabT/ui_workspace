import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailTaxStatementReqHelper,RetailTaxStatementReqState} from './retail-tax-statement-req.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { TaxstatementreqService } from '../taxstatementreq-service/taxstatementreq.service';

 
 
@Component({
 selector: 'app-retail-tax-statement-req',
  templateUrl: './retail-tax-statement-req.component.html',
  styleUrls: ['./retail-tax-statement-req.component.scss'],
  providers : [ RetailTaxStatementReqHelper]
  })

export class RetailTaxStatementReqComponent extends  BaseFpxFormComponent<RetailTaxStatementReqHelper, RetailTaxStatementReqState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailTaxStatementReqHelper: RetailTaxStatementReqHelper,
    public taxstatementreqService: TaxstatementreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailTaxStatementReqHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('taxRegistrationNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('supportingDocuments', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('Month', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('year', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('terms', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);		   		 
	this.setDataService(this.taxstatementreqService);
	this.setServiceCode("RETAILTAXSTMT");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
