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
  FpxModal,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
// import { WalletregistrationService } from '../walletregistration-service/walletregistration.service';
// import { Walletregistration } from '../basicDetails-service/walletregistration.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { formatDate } from "@angular/common";
import { BasicDetails } from "../basicDetails-service/basicDetails.model";
//import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';
export class BasicDetailsFormFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  dob: any = {
    minDate: "",
    maxDate: "",
  }
  createdOn: any = {
    minDate: "",
    maxDate: "",
  }
  authOn: any = {
    minDate: "",
    maxDate: "",
  }
  modifiedOn: any = {
    minDate: "",
    maxDate: "",
  }

  customerDetails: any = {
    firstName: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    countryDetails: "",
    stateDetails: "",
    pinCode: "",
    email: "",
    mobileNumber: ""
  }
  accordionToggle: boolean = false;
  empInfoaccordionToggle: boolean = false;
  onBillSubmit: boolean = false;
  otherLoanEMI: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: true
  }
  monthlyExpenses: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: true
  }
  annualPropertyTax: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: true
  }
  monthlyCondominiumFees: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    initCurrency: this._appConfig.baseCurrency,
    amountInWords: true
  }
}


@Injectable()
export class BasicDetailsFormHelper extends BaseFpxFormHelper<BasicDetailsFormFormState> {
  addressinfo!: FormGroup;
  ShowAccordin: boolean = true;
  accordionOpen: boolean = true;
  loanSegments: any;
  loanSeg: boolean = false;

  constructor(private _httpProvider: HttpProviderService, private _router: Router,
    private userService: CustomerService, private _appConfig: AppConfigService
  ) {
    super(new BasicDetailsFormFormState());
  }

  override doPreInit(): void {
    // this.setServiceCode("RETAILWALLETREG");
    this.loanSegments = this._appConfig.getData("loanSegments");
  }

  personalInfoToggleAccordion() {
    this.state.accordionToggle = !this.state.accordionToggle;
  }

  empInfoToggleAccordion() {
    this.state.empInfoaccordionToggle = !this.state.empInfoaccordionToggle;
  }



  public handleFormOnLoad() {
    this.userService
      .fetchCustomer(sessionStorage.getItem('customerCode'))
      .subscribe((res) => {
        if (res) {
          this.setValue('firstName', res.firstName);
          this.setValue('dob', res.dob);

          this.setValue('lastName', res.lastName);
          this.setValue('email', res.emailId);
          this.setValue('mobileNumber', res.mobileNumber);

          this.setValue('addressLine1', res.addresses[0].address1);
          this.setValue('addressLine2', res.addresses[0].address2);
          this.setValue('state', res.addresses[0].stateName);
          this.setValue('city', res.addresses[0].city);
          this.setValue('zipcode', res.addresses[0].pincode);


          this.setValue('monthlyIncome', { amount: res.empInfo[0].empIncome });
          this.setValue('empPosition', res.empInfo[0].empOccupation);
          this.setValue('empName', res.empInfo[0].empName);
          this.setValue('empstatus', res.empInfo[0].empStatus == "Salaried" ? "1" : "2");
          this.setValue('mobileNumber', res.mobileNumber);


          this.setValue('empaddressLine1', res.empInfo[0].addressLine1);
          this.setValue('empaddressLine2', res.empInfo[0].addressLine2);
          this.setValue('empstate', res.empInfo[0].stateName);
          this.setValue('empcity', res.empInfo[0].city);
          this.setValue('empzipcode', res.empInfo[0].pincode);

        }
      })

    this.setReadonly('lastName', true);
    this.setReadonly('postalCode', true);
    this.setReadonly('dob', true);
  }

  public override doPostInit(): void {
    if (this.loanSegments == "H") {
      this.loanSeg = false;
    }
    else {
      this.loanSeg = true;
    }
    this.handleFormOnLoad();
    this.addressinfo = this.formGroup.get("addressinfo") as FormGroup;
    this.personalInfoToggleAccordion();
    this.empInfoToggleAccordion();

    this.setReadonly("firstName", true);
    this.setReadonly("lastName", true);
    this.setReadonly("mobileNumber", true);
    this.setReadonly("email", true);
    this.setReadonly("dob", true);
    this.setReadonly("city", true);
    this.setReadonly("state", true);
    this.setReadonly("zipcode", true);
    this.setReadonly("addressLine1", true);
    this.setReadonly("addressLine2", true);
    if (this.loanSegments != "P") {
      this.setReadonly("empstatus", true);
      this.setReadonly("addressinfo", true);
      this.setReadonly("empName", true);
      this.setReadonly("monthlyIncome", true);
      this.setReadonly("empPosition", true);
      this.setReadonly("empcity", true);
      this.setReadonly("empstate", true);
      this.setReadonly("empzipcode", true);
      this.setReadonly("empaddressLine1", true);
      this.setReadonly("empaddressLine2", true);
    }
    else {
      this.setHidden("empPosition", true);
    }

  }

  public override preSubmitInterceptor(payload: BasicDetails): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: BasicDetails) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.walletregistration.tenantId.inventoryNumber,
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


