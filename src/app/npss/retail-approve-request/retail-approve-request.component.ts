import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { RetailApproveRequestHelper, RetailApproveRequestState } from './retail-approve-request.helper';

 
 
@Component({
 selector: 'app-retail-approve-request',
  templateUrl: './retail-approve-request.component.html',
  styleUrls: ['./retail-approve-request.component.scss'],
  providers : [ RetailApproveRequestHelper]
  })

export class RetailApproveRequestComponent extends  BaseFpxFormComponent<RetailApproveRequestHelper, RetailApproveRequestState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailApproveRequestHelper: RetailApproveRequestHelper,
    public npsssendmoneyService: NpsssendmoneyService,
    
  ) {
    super(formBuilder, router,controlContainer, retailApproveRequestHelper);
  }
   protected override doPreInit(): void {
        this.setServiceCode("RETAILAPPROVEREQ");
        this.addFormControl('transactionAmount', '', [], [], 'blur', 1, false, 0);

  }
  

  protected override doPostInit(): void {
   
  }
  
}
