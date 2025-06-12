import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { RetailBillSplitTypeHelper, RetailBillSplitTypeState } from './retail-bill-split-type.helper';
import { SplitbillrtpreqService } from '../splitbillrtpreq-service/splitbillrtpreq.service';

 
 
@Component({
 selector: 'app-retail-bill-split-type',
  templateUrl: './retail-bill-split-type.component.html',
  styleUrls: ['./retail-bill-split-type.component.scss'],
  providers : [ RetailBillSplitTypeHelper]
  })

export class RetailBillSplitTypeComponent extends  BaseFpxFormComponent<RetailBillSplitTypeHelper, RetailBillSplitTypeState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailBillSplitTypeHelper: RetailBillSplitTypeHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    private validatorService: ValidatorService,
    private splitbillrtpreqService:SplitbillrtpreqService
    
  ) {
    super(formBuilder, router,controlContainer, retailBillSplitTypeHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionAmount', '',  [Validators.required]  ,[],'blur',1,false,0);	
    this.addFormControl('splitTypeControl','',  [Validators.required]  ,[],'change',1,false,0);
    this.addFormControl('balanceAmount', '',  [Validators.min(0),Validators.max(0)],[],'change',1,false,0);			   		 
    this.setServiceCode("RETAILNPSSSPLITBILLRTP");
    this.addElement('billSplitType');

    this.setDataService(this.splitbillrtpreqService);
  }
  

  protected override doPostInit(): void {
   
  }
  
}
