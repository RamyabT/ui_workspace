import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasatransactiondtlsService } from '../casatransactiondtls-service/casatransactiondtls.service';
import { RetailViewCasaTranDtlsFormComponentHelper, RetailViewCasaTranDtlsFormComponentState } from './retail-view-casa-tran-dtls-form.helper';
import { APPCONSTANTS } from '@dep/constants';
import { CustomDatePipe } from 'src/app/common/pipe/custom-date/custom-date.pipe';
import moment from 'moment';

@Component({
  selector: 'app-retail-view-casa-tran-dtls-form',
  templateUrl: './retail-view-casa-tran-dtls-form.component.html',
  styleUrls: ['./retail-view-casa-tran-dtls-form.component.scss'],
  providers: [
    RetailViewCasaTranDtlsFormComponentHelper,
    CasatransactiondtlsService,
    CustomDatePipe
  ]
})
export class RetailViewCasaTranDtlsFormComponent extends BaseFpxFormComponent<RetailViewCasaTranDtlsFormComponentHelper, RetailViewCasaTranDtlsFormComponentState> {
  public appConsatance:any = APPCONSTANTS;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
     private customDatePipe: CustomDatePipe,
    public _retailViewCasaTranDtlsFormHelper: RetailViewCasaTranDtlsFormComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _retailViewCasaTranDtlsFormHelper);
  }

  override doPreInit(){
    this.addFormControl('transactionDate', this.customDatePipe.transform(moment(), 'YYYY-MM-DD'),[ ]   ,[],'blur',1,false);
      this.addFormControl('transactionDescription', '',[ ]   ,[],'blur',1,false); 
      this.addFormControl('transactionReference', '',[ ]   ,[],'blur',1,false); 
      this.addFormControl('balance', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('transactionType', '',[ ]   ,[],'blur',1,false);
  }

  getXChangeCurrancy(transactionCurrency:string):string{
    return APPCONSTANTS.getExchangeCurrency(transactionCurrency);
  }

}
