import { inject, Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PfmbudgetreqService } from '../pfmbudgetreq-service/pfmbudgetreq.service';
import { Pfmbudgetreq } from '../pfmbudgetreq-service/pfmbudgetreq.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { formatDate } from "@angular/common";
import moment from "moment";
export class RetailPfmBudgetReqFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  budgetAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  startDate1: any
  LogDate = new Date()
  startDate: any = {
    minDate: "",
    maxDate: "",
  }
  endDate: any = {
    minDate: "",
    maxDate: "",
  }

  mode:string = "";
}


@Injectable()
export class RetailPfmBudgetReqFormHelper extends BaseFpxFormHelper<RetailPfmBudgetReqFormState> {

  constructor(private PfmbudgetreqService: PfmbudgetreqService, private retailPfmBudgetReqFormService: PfmbudgetreqService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailPfmBudgetReqFormState());
  }

  override doPreInit(): void {
    this.addValueChangeHandler("budgetFrequency", this.handleBudgetFrequencyOnvalueChange);
    this.setServiceCode("RETAILPFMBUDGETREQ");
  }


  public override doPostInit(): void {
    this.state.mode = this.getRoutingParam("mode");
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    if (this.state.mode == "M") {
      let categoryCode: any = this.getRoutingParam('categoryCode');
      let key: any = {
        categoryCode: categoryCode
      }
      this.PfmbudgetreqService.findByKey(key)().subscribe((res: any) => {
        res = res.body.pfmbudget
        if (res) {
          this.setValue('budgetAmount', { amount: res?.budgetAmount });
          this.setValue('categoryCode', res?.categoryCode?.categoryCode);
          this.setValue('pfmSubCategory', res?.subCategoryCode);
          this.setValue('startDate', res?.startDate);
          this.setValue('endDate', res?.endDate);
          this.setValue('frequency', res?.budgetFrequency);
          this.setValue('currencyCode', res?.currencyCode)

        }
      },
      )
      this.setReadonly('categoryCode', true);
      this.setReadonly('pfmSubCategory', true);
      this.setReadonly('startDate', true);
      this.setReadonly('endDate', true);
      this.setReadonly('frequency', true);
      this.setReadonly('categoryCode', true);
      this.setReadonly('currencyCode', true)
    }
  }


  public override preSubmitInterceptor(payload: Pfmbudgetreq): any {
    // WRITE CODE HERE TO HANDLE 
    payload.budgetAmount = this.getValue('budgetAmount').amount;
    payload.operationMode = this.state.mode || "A";
    return payload;
  }


  public override postDataFetchInterceptor(payload: Pfmbudgetreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public handleBudgetFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == '1') {
        // One month
        let newDate = new Date();
        let date = newDate.getDate()
        let dateReset: any = new Date(newDate.setDate(newDate.getDate() - Number(date) + 1));
        let finalDate = dateReset.setMonth(dateReset.getMonth() + 1);
        this.state.startDate = formatDate(finalDate, 'yyyy-MM-dd', 'en-US');
        let lastDate = new Date(dateReset.getFullYear(), dateReset.getMonth() + 1, 0)
        this.state.endDate = formatDate(lastDate, 'yyyy-MM-dd', 'en-US');
      }
      else if (value == '2') {
        //3 Months
        let NewDate = new Date()
        this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
        let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() + 3))
        this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
      }
      else if (value == '3') {
        // 12 Months
        let NewDate = new Date()
        this.state.endDate = formatDate(NewDate, 'yyyy-MM-dd', 'en-US');
        let threeMonth = new Date(NewDate.setMonth(NewDate.getMonth() + 12))
        this.state.startDate = formatDate(threeMonth, 'yyyy-MM-dd', 'en-US');
      }
    }
    this.setValue('endDate', this.state.endDate);
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.pfmbudgetreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);

    return routingInfo;
  }

  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.pfmbudgetreq.tenantId.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


