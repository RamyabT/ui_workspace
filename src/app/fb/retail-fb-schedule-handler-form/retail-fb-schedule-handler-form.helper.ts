import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  FpxNotifyDependencyChangeHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { PymtsService } from "src/app/transfers/pymts-service/pymts.service";
import { Pymts } from "src/app/transfers/pymts-service/pymts.model";
export class RetailFbScheduleTransferHandlerState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  endDate: any = {
    minDate: "",
    maxDate: "",
  }
  paymentDate: any;

}


@Injectable()
export class RetailFbScheduleTransferHandlerHelper extends BaseFpxFormHelper<RetailFbScheduleTransferHandlerState>{

  constructor(private retailScheduleTransferHandlerService: PymtsService, private _httpProvider: HttpProviderService, private _router: Router, private commonService: CommonService, private momentService: MomentService) {
    super(new RetailFbScheduleTransferHandlerState());
  }

  override doPreInit(): void {
    // this.setServiceCode("pymts");
    this.addNotifyDependencyChangeHandler('paymentDate', this._nameDependencyChange);
  }
  private _nameDependencyChange: FpxNotifyDependencyChangeHandler = (payload: any, dependencyControl: string) => {
    this.state.paymentDate = payload;
    console.log('Notified about change in payment date', payload);
    let installment: any = this.getValue('numberOfPayments');
    let frequency: any = this.getValue('paymentFrequency');
    let endDateVar: any = this.commonService.caculateEndDate(this.state.paymentDate, frequency, installment);
    if (endDateVar) {
      this.setValue('endDate', endDateVar);
      this.setReadonly('endDate', true);
    }
    else {
      this.setHidden('endDate', true);
    }
  }
  public handleFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let installment: any = this.getValue('numberOfPayments');
    let Date: any = this.momentService.getInstance();
    let futureMaxDate: any = Date.add(100, "Year").format("YYYY-MM-DD");
    this.setHidden('endDate', true);
    this.setDisabled('endDate', false);
    this.setValue('endDate', futureMaxDate)
    console.log('formGroup')
    if (value && status == 'VALID' && installment != null && installment != "") {
      this.setHidden('numberOfPaymentsNote', true);
      let endDateVar: any = this.commonService.caculateEndDate(this.state.paymentDate, value, installment);
      console.log(endDateVar);
      if (endDateVar) {
        this.setHidden('endDate', false);
        this.setValue('endDate', endDateVar);
        this.setReadonly('endDate', true);

      }
      else {
        this.setHidden('endDate', true);
      }
    }
  }

  public handleNoOfInstallmentOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let Date: any = this.momentService.getInstance();
    let futureMaxDate: any = Date.add(100, "Year").format("YYYY-MM-DD");
    if (value) {
      if (value > 1 && status == 'VALID' && this.getValue('paymentFrequency') != null && this.getValue('paymentFrequency') != "") {
        let paymentFrequency: any = this.getValue('paymentFrequency');
        this.setHidden('endDate', false);
        this.setHidden('numberOfPaymentsNote', true);
        let endDateVar: any = this.commonService.caculateEndDate(this.state.paymentDate, paymentFrequency, value);
        if (endDateVar) {
          this.setHidden('endDate', false);
          this.setValue('endDate', endDateVar);
          this.setReadonly('endDate', true);

        }
        else {

          this.setHidden('endDate', true);
        }
      }
      else {
        if (this.getValue('paymentFrequency') == null || this.getValue('paymentFrequency') == "") {
          this.setErrors('paymentFrequency', 'frequencyError');
          this.setHidden('endDate', true);
        }
        if (value == 1) {
          this.setErrors('numberOfPayments', 'installmentError');
          this.setHidden('endDate', true);
        }

      }
    }
    else {

      this.setHidden('numberOfPaymentsNote', false);
      this.setHidden('endDate', true);
      this.setDisabled('endDate', false);
      this.setValue('endDate', futureMaxDate)
    }
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("numberOfPayments", this.handleNoOfInstallmentOnvalueChange);
    this.addValueChangeHandler("paymentFrequency", this.handleFrequencyOnvalueChange);
  }

  public override preSubmitInterceptor(payload: Pymts): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postDataFetchInterceptor(payload: Pymts) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.pymts.paymentId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


