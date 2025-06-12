import { Injectable, inject } from "@angular/core";
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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import moment from "moment";
import { BalanceConfirmationReq } from "../balanceConfirmationReq-service/BalanceConfirmationReq.model";
import { BalanceConfirmationReqService } from "../balanceConfirmationReq-service/BalanceConfirmationReq.service";
export class BalanceConfirmationReqState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  date: any = {
    minDate: "",
    maxDate: "",
  };
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
  };
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [
      { id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency },
    ],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  };
  acknowledgement: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  customerEmail: String = "";
}

@Injectable()
export class BalanceConfirmationReqHelper extends BaseFpxFormHelper<BalanceConfirmationReqState> {
  addressInfo!: FormGroup;
  constructor(
    private balanceConfirmationReqService: BalanceConfirmationReqService,
    private appConfigService: AppConfigService,

    private userService: CustomerService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new BalanceConfirmationReqState());
  }

  public handleFormOnLoad() {
    let mode = this.getRoutingParam("mode");
    if (mode != "V") {
      this.setValue("letterFor", "1");
      this.setValue("deliveryOption", "1");
      this.setHidden("emailId", false);
      this.setDisabled("emailId", true);
      this.setHidden("addressInfo", true);
      this.setHidden("branch", true);
      this.setHidden("chargesAmount", true);
      this.setReadonly("chargesAmount", true);
      this.setValue("acknowledgement", null);

      this.setAmountCurrencyList("chargesAmount", [
        {
          id: this.appConfigService.baseCurrency,
          text: this.appConfigService.baseCurrency,
        },
      ]);
      this.userService
        .fetchCustomer(sessionStorage.getItem("customerCode"))
        .subscribe((res) => {
          if (res.emailId) {
            this.setValue("emailId", res.emailId);
            this.state.customerEmail = res.emailId;
          }
          if (
            !res.emailId ||
            res.emailId == "" ||
            res.emailId == undefined ||
            res.emailId == null
          ) {
            this.setErrors("emailId", "Email_Error");
          }
        });

      let currentDate = moment().format("YYYY-MM-DD");
      this.state.date.maxDate = currentDate;
      this.state.date.minDate = currentDate;
      this.setValue("date", currentDate);
      this.setReadonly("date", true);
    } else {
      this.setValue(
        "balanceConfirmationDetails",
        this.getValue("balanceConfirmationDetails")
      );
      if (this.getValue("deliveryOption") == "1") {
        this.setHidden("addressInfo", true);
        this.setHidden("emailId", false);
        this.setDisabled("emailId", true);
        this.setReadonly("emailId", true);
        this.setHidden("branch", true);
        this.setHidden("chargesAmount", true);
        this.userService
          .fetchCustomer(sessionStorage.getItem("customerCode"))
          .subscribe((res) => {
            if (res.emailId) {
              this.setValue("emailId", res.emailId);
              this.state.customerEmail = res.emailId;
            }
            if (
              !res.emailId ||
              res.emailId == "" ||
              res.emailId == undefined ||
              res.emailId == null
            ) {
              this.setErrors("emailId", "Email_Error");
            }
          });
      } else if (this.getValue("deliveryOption") == "2") {
        this.setHidden("addressInfo", false);
        // this.setReadonly('addressInfo', true);
        this.setHidden("emailId", true);
        this.setHidden("branch", true);
        this.setHidden("chargesAmount", true);
        if (
          !this.state.addressInfo ||
          (this.state.addressInfo.buildingDetails &&
            this.state.addressInfo.cityDetails &&
            this.state.addressInfo.pinCode &&
            this.state.addressInfo.stateDetails) == ""
        ) {
          this.formGroup.get("deliveryOption")?.markAsTouched();
        }
      } else {
        this.setHidden("addressInfo", true);
        this.setHidden("emailId", true);
        this.setHidden("branch", false);
        this.setHidden("chargesAmount", false);
        this.setValue("chargesAmount",{amount:5,currencyCode:this.appConfigService.baseCurrency});
        this.setValue("branch", this.getValue("branch")?.branchCode);
        this.setDisabled("branch", true);
      }
    }
  }
    private _reset: FpxResetHandler = (payload: any) => {
      this.formGroup.reset();
      this.handleFormOnLoad();
    
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSRVREQBALCONFIRM");
 this.addResetHandler('reset', this._reset);
    this.addValueChangeHandler("letterFor", this.handleLetterForOnvalueChange);
    this.addValueChangeHandler(
      "deliveryOption",
      this.handleDeliveryOptionOnvalueChange
    );
    this.addControlEventHandler(
      "onCustomerDetailsDataReceived",
      this.handleCustomerDetailsDataReceived
    );
    this.addValueChangeHandler(
      "acknowledgement",
      this.handleAcknowledgementOnvalueChange
    );
    this.addValueChangeHandler(
      "balanceConfirmationDetails",
      this.handlebalanceConfirmationDetailsOnvalueChange
    );
    this.addControlEventHandler(
      "balanceConfirmationDetails_onFileSelect",
      this.onuploadFileReceived
    )
  }
  public onuploadFileReceived: BaseFpxControlEventHandler = (payload: any) => {
    console.log('value for error',payload);
    if (
      this.formGroup.controls["balanceConfirmationDetails"].status == "INVALID"
    ) {
      this.formGroup.get("balanceConfirmationDetails")?.setErrors(null);
    }
  }
  public handlebalanceConfirmationDetailsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (
      this.formGroup.controls["balanceConfirmationDetails"].status == "INVALID"
    ) {
      this.formGroup.get("balanceConfirmationDetails")?.setErrors(null);
    }
  };
  public handleAcknowledgementOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == "N") {
        this.setValue("acknowledgement", null);
      }
      if (
        this.formGroup.controls["balanceConfirmationDetails"].status ==
        "INVALID"
      ) {
        // this.reset('balanceConfirmationDetails',true);
        this.formGroup.get("balanceConfirmationDetails")?.setErrors(null);
      }
    }
  };

  public handleLetterForOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      let currentDate = moment().format("YYYY-MM-DD");
      this.state.date.maxDate = currentDate;
      this.state.date.minDate = currentDate;
      this.setValue("date", currentDate);
      this.setReadonly("date", true);
    }
    if (value == "2") {
      let currentDate = moment().format("YYYY-MM-DD");
      this.state.date.maxDate = currentDate;

      let previousDate = moment().subtract(365, "days");
      this.state.date.minDate = previousDate;
      this.setValue("date", currentDate);
      this.setReadonly("date", false);
    }
  };

  public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == "1") {
      this.setHidden("addressInfo", true);
      this.setHidden("emailId", false);
      this.setReadonly("emailId", true);
      this.setHidden("branch", true);
      this.setHidden("chargesAmount", true);
      this.userService
        .fetchCustomer(sessionStorage.getItem("customerCode"))
        .subscribe((res) => {
          if (res.emailId) {
            this.setValue("emailId", res.emailId);
            this.state.customerEmail = res.emailId;
          }
          if (
            !res.emailId ||
            res.emailId == "" ||
            res.emailId == undefined ||
            res.emailId == null
          ) {
            this.setErrors("emailId", "Email_Error");
          }
        });
    }
    if (value == "2") {
      this.setHidden("addressInfo", false);
      this.setReadonly("addressInfo", true);
      this.setHidden("emailId", true);
      this.setHidden("branch", true);
      this.setHidden("chargesAmount", true);
      if (
        !this.state.addressInfo ||
        (this.state.addressInfo.buildingDetails &&
          this.state.addressInfo.cityDetails &&
          this.state.addressInfo.pinCode &&
          this.state.addressInfo.stateDetails) == ""
      ) {
        this.formGroup.get("deliveryOption")?.markAsTouched();
      }
    }
    if (value == "3") {
      this.setHidden("addressInfo", true);
      this.setHidden("emailId", true);
      this.setHidden("branch", false);
      this.setValue("chargesAmount",{amount:5,currencyCode:this.appConfigService.baseCurrency});
      this.setHidden("chargesAmount", false);
      this.setReadonly("chargesAmount",true);
    }
  };
  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (payload) {
      this.state.addressInfo.buildingDetails = payload.buildingName;
      this.state.addressInfo.cityDetails = payload.city;
      this.state.addressInfo.stateDetails = payload.stateName;
      this.state.addressInfo.countryDetails = payload.countryName;
      this.state.addressInfo.pinCode = payload.pincode;
      this.setValue("emailId", payload.emailId);
    }
  };

  public override doPostInit(): void {
    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;

    this.handleFormOnLoad();
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (payload.deliveryOption == "1") {
      payload.emailId = this.state.customerEmail;
    }
    if (payload.deliveryOption == "2") {
      let address =
        this.state.addressInfo.buildingDetails +
        "," +
        this.state.addressInfo.cityDetails +
        "," +
        this.state.addressInfo.stateDetails +
        "," +
        this.state.addressInfo.countryDetails +
        "," +
        this.state.addressInfo.pinCode;
      payload.addressInfo = address;
    }
    if (payload.deliveryOption == "3") {
      payload.chargesAmount = 5.0;
    }
    if (payload.balanceConfirmationDetails) {
      let i = 0;
      for (i; i < payload.balanceConfirmationDetails.length; i++) {
        payload.balanceConfirmationDetails[i].serialNo = i.toString();
      }
    } else {
      payload.balanceConfirmationDetails = [];
    }
    // payload.chargesAmount = 0.0;
  }

  public override preSubmitInterceptor(payload: BalanceConfirmationReq): any {
    // WRITE CODE HERE TO HANDLE
    console.log("payload", payload);
    this.handleFormOnPresubmit(payload);
    return payload;
  }

  public override postDataFetchInterceptor(payload: BalanceConfirmationReq) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.BalanceConfirmationReq;
      routingInfo.setQueryParams({
        response: res,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value,
      });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
