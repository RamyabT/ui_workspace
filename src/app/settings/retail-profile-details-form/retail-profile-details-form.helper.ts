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
  FpxResetHandler,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CustomerinfologService } from "../customerinfolog-service/customerinfolog.service";
import { Customerinfolog } from "../customerinfolog-service/customerinfolog.model";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
export class RetailProfileDetailsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  mobileNumber: string = "";
  email: string = "";
  resAddress: string = "";
  correspondenceAddress: string = "";
  customerinfologdetails: any = {
    minSize: "1024",
    maxSize: "20000024",
    extensions: ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpg,image/jpeg,image/png"
  }
  action: any;
}

@Injectable()
export class RetailProfileDetailsFormHelper extends BaseFpxFormHelper<RetailProfileDetailsFormState> {
  constructor(
    private retailProfileDetailsFormService: CustomerinfologService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _customerService: CustomerService
  ) {
    super(new RetailProfileDetailsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCUSTOMERINFOLOG");
    this.addResetHandler('reset',this.customResethandler);
    this.state.action = this.getRoutingParam('action')
  }

  public override doPostInit(): void {

    if(!this.getRoutingParam('inventoryNumber')){
      this.formGroup?.removeControl('inventoryNumber')
    }
    if(this.state.action !=='VIEW'){
      this._customerService
      .fetchCustomer(sessionStorage.getItem("customerCode"))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.state.email = res.emailId;
          this.state.mobileNumber = res.mobileNumber;
          res?.addresses.forEach((element: any) => {
            if (element.addressType == "1") {
              this.state.resAddress = this.constructAddress(element)
            } else if (element.addressType == "2") {
              this.state.correspondenceAddress = this.constructAddress(element)
            }
          });
          this.setValue("mobileNumber", this.state.mobileNumber);
          this.setValue("email", this.state.email);
          this.setValue('residentialAddress',this.state.resAddress);
          this.setValue('correspondenceAddress',this.state.correspondenceAddress);
        },
      });
    }else{
      this.setReadonly("profileDetails.customerinfologdetails", true);
    }
  }
  private customResethandler: FpxResetHandler = (payload: any) => {
    this.setValue("mobileNumber", this.state.mobileNumber);
          this.setValue("email", this.state.email);
          this.setValue('residentialAddress',this.state.resAddress);
          this.setValue('correspondenceAddress',this.state.correspondenceAddress);
  }


  constructAddress(response: any): string {
    return (response?.buildingId != "" ? response.buildingId + ", " : '') +
      (response?.buildingName != "" ? response.buildingName + ", " : '') +
        (response?.city != "" ? response.city + ", " : "") +
          (response.stateName != "" ? response.stateName + ", " : "") +
            (response.countryName != "" ? response.countryName + (response.pincode != '' ? ", " : '') : "") +
              (response.pincode != '' ? response.pincode : '');
  }


  public override preSubmitInterceptor(payload: Customerinfolog): any {
    // WRITE CODE HERE TO HANDLE
    payload.prooftype = "PDF";
    payload.proffInventory = "string";
    return payload;
  }

  public override postDataFetchInterceptor(payload: Customerinfolog) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.customerinfolog,
        // status: "success",
      });
    } else if (response.error) {
      let error = response?.error?.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode?.value
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
