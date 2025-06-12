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
  CriteriaQuery,
  FpxModalAfterClosed,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, UserAuthService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { RetailProfilePicUploadFormComponent } from "@app/utility";

export class RetailProfilePicPreviewFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" },
  };
  activeTabIndex: number = 0;
  imageData: any;
  profileDetails: any;
  profileName: string = "";
  profileSummary: string = "";
  language: string = "";
}

@Injectable()
export class RetailProfilePicPreviewFormHelper extends BaseFpxFormHelper<RetailProfilePicPreviewFormState> {
  constructor(
    protected userAuth: UserAuthService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _customerService: CustomerService
  ) {
    super(new RetailProfilePicPreviewFormState());
  }

  override doPreInit(): void {
    this.addShellButton("Update", "UPDATE", "primary", "DISPLAY", "button");
    this.setShellBtnMethod("UPDATE", this.updatePhoto.bind(this));
    this.state.imageData = this._appConfig.getData("profilePicture");
    this.state.profileName = this._appConfig.getData("profileName");
    this.state.profileSummary = this._appConfig.getData("profileSummary");
    this.state.language = this._appConfig.getData("language");
  }

  changePhoto() {
    let modal = new FpxModal();
    modal.setComponent(RetailProfilePicUploadFormComponent);
    modal.setPanelClass("dep-info-popup");
    modal.setDisableClose(false);
    modal.setData({
      title: "USERPROFILE.uploadPhoto",
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (
    payload: any,
    addtionalData: any
  ) => {
    this.state.imageData = payload.imageData;
  };

  removePhoto() {
    let payload: any;
    payload = {
      photo: "`",
      profileName: this.state.profileName,
      profileSummary: this.state.profileSummary,
      language: this.state.language,
    };
    this.updateProfilePicture(payload);
  }

  updatePhoto() {
    let payload: any;
    payload = {
      photo: this.state.imageData,
      profileName: this.state.profileName,
      profileSummary: this.state.profileSummary,
      language: this.state.language,
    };
    this.updateProfilePicture(payload);
  }
  updateProfilePicture(payload: any) {
    this.showSpinner();
    this._customerService.updateUserProfile(payload).subscribe((res: any) => {
      let serviceCode = "RETAILVIEWMYPROFILE";
      let additionalUserDetail = this.userAuth.getUserAdditionalDetails();
      additionalUserDetail.photo = payload.photo == "`" ? undefined : this.state.imageData;
      this.userAuth.setUserAdditionalDetails(additionalUserDetail);
      let service = this._appConfig.getServiceDetails(serviceCode);
      this.hideSpinner();
      this._router.navigate(service.servicePath, {
        queryParams: {
          serviceCode: serviceCode,
        },
      });
    });
  }
  public handleFormOnLoad() {}

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
  }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE

    return payload;
  }

  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.beneaedreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        },
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
