import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { RetailSplitBillsQrcodeHelper, RetailSplitBillsQrcodeState } from './retail-split-bills-qrcode.helper';

 
 
@Component({
 selector: 'app-split-bills-qrcode',
  templateUrl: './retail-split-bills-qrcode.component.html',
  styleUrls: ['./retail-split-bills-qrcode.component.scss'],
  providers : [ RetailSplitBillsQrcodeHelper]
  })

export class RetailSplitBillsQrcodeComponent extends  BaseFpxFormComponent<RetailSplitBillsQrcodeHelper, RetailSplitBillsQrcodeState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSplitBillsQrcodeHelper: RetailSplitBillsQrcodeHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailSplitBillsQrcodeHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionAmount', '',  [Validators.required]  ,[],'blur',1,false,0);	
    this.addFormControl('remarks', '',  []  ,[],'blur',1,false,0);	
    this.addFormControl('personCount','',[Validators.required],[],'blur',1,false,0);
    this.addElement('personCountElement');
    this.setServiceCode("RETAILSPLITQRCODE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
