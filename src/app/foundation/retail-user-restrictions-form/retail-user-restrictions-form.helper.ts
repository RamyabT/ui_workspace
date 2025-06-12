import { Inject, Injectable } from "@angular/core";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { UserrestrictionsService } from '../userrestrictions-service/userrestrictions.service';
import { Userrestrictions } from '../userrestrictions-service/userrestrictions.model';
import { AppConfigService, CustomMenuService, UserAuthService } from "@dep/services";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserRestictionConfirmationComponent } from "../user-restiction-confirmation/user-restiction-confirmation.component";
import { CIFAccount, UserDetails } from "src/app/dep/services/user-auth/user-auth.service";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";

export class RetailUserRestrictionsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  userRestictionData: CIFAccount[] | undefined = [];
  userRestictionModelData: Userrestrictions[] | undefined = []
  customerCode: any;
  selectedData: Userrestrictions | undefined
}

@Injectable()
export class RetailUserRestrictionsFormHelper extends BaseFpxFormHelper<RetailUserRestrictionsFormState> {

  constructor(private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    private _testLoginService: TestLoginService,
    // @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private userAuthService: UserAuthService,
    private retailUserRestrictionsFormService: UserrestrictionsService,
    private _httpProvider: HttpProviderService,
    private _menuService: CustomMenuService,
    private _router: Router
  ) {
    super(new RetailUserRestrictionsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("USERRESTICTIONS");
  }


  public override doPostInit(): void {

    this.state.customerCode = this.userAuthService.getAuthorizationAttr('CustomerCode');
    let currentUserIndex = this.userAuthService.getCIFAccounts?.findIndex((x: CIFAccount) => x.customerCode == this.state.customerCode);
    let userRestictionData: CIFAccount[] = this.userAuthService.getCIFAccounts;
    // MOVE THE CURRENT LOGGED IN USER TO TOP
    let b = userRestictionData[0];
    userRestictionData[0] = userRestictionData[currentUserIndex];
    userRestictionData[currentUserIndex] = b;
    this.state.userRestictionData = userRestictionData;
  }

  selectCif(data: CIFAccount, index: number) {
    console.log(data, index)
    if (this.state.customerCode === data.customerCode) return;
    this.state.selectedData = data;
    let modal = new FpxModal();
    modal.setComponent(UserRestictionConfirmationComponent);
    modal.setDisableClose(false);
    modal.setPanelClass("user-restiction-popup");
    modal.setBackDropClass("dep-popup-back-drop");
    modal.setData({
      title: "RetailUserRestrictionsForm.importantNote",
      message: "RetailUserRestrictionsForm.customerSelectedMsg",
      okBtnLbl: "RetailUserRestrictionsForm.proceed",
      cancelBtnLbl: "RetailUserRestrictionsForm.cancel",
    });
    modal.setAfterClosed(this.confirmationModelAfterClose);
    this.openModal(modal);
  }

  confirmationModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef?.close()
    if (payload == 1) {
      this.showSpinner();
      this.switchcif({ customerCode: this.state.selectedData?.customerCode, customerName: this.state.selectedData?.customerName }).subscribe(
        {
          next: (res) => {
            this.hideSpinner();
            if (res?.authToken) {
              this._appConfig.setData("activeMenuId", "");
              this._menuService.menuList = undefined;
              this.userAuthService.setUserAdditionalDetails(undefined)
              //Set token and auth details for switched User 
              this._testLoginService.onAuthTokenReceived(res);
            }
            this._appConfig.setData('switchCIFData', res);

            this._router.navigate(["staging"], {
              queryParams: {
                serviceFlag: "SWITCHCIF"
              }
            });
          },
          error: (err: any) => {
            this.hideSpinner();
            this.openFailurePopUp()
            console.log('POST User Restiction Data ERROR', err)
          }
        }
      )

    } else {
      this._dialogRef?.close()
    }
  }

  switchcif(payload: Userrestrictions): Observable<UserDetails> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setContextPath('IAM');
    httpRequest.setResource('/switchcif');
    let bodyContent = {
      "switchcif": {
        "refreshToken": this.userAuthService.userDetails?.refreshToken,
        "username": this.userAuthService.username,
        "CustomerCode": payload.customerCode
      }
    };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body || [];
      })
    );;

  }

  openFailurePopUp() {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepAlertComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "RetailUserRestrictionsForm.importantNote",
      message: "RetailUserRestrictionsForm.privacyPolicyTermsAndCondition"
    });
    // fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }


  public override preSubmitInterceptor(payload: Userrestrictions): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Userrestrictions) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userrestrictions.customerCode.userId,
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