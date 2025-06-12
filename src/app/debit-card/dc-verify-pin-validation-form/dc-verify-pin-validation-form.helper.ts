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
  FpxSubmitHandler,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DcpinrequestService } from "../dcpinrequest-service/dcpinrequest.service";
import { Dcpinrequest } from "../dcpinrequest-service/dcpinrequest.model";
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Debitcard } from "../debitcard-details-service/debitcard-details.model";
export class DCVerifyPinValidationFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  confirmPin: any = {
    visibilityChange: false,
    autoComplete: false,
  };
  cardData!: Debitcard;
}

@Injectable()
export class DCVerifyPinValidationFormHelper extends BaseFpxFormHelper<DCVerifyPinValidationFormState> {
  constructor(
    private activateddc: ActivateDCValidationService,
    private dCVerifyPinValidationFormService: DcpinrequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new DCVerifyPinValidationFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("DCCURRENTPINVALIDATION");
    // this.setValue("cardReference", this.getRoutingParam("cardReference"));
    this.state.cardData = this._appConfig.getData('debitCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber)
    this.addResetHandler("reset", this._reset);
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setValue("cardReference", this.getRoutingParam("cardReference"));
  };

  public override doPostInit(): void {
    this.addValueChangeHandler(
      "confirmPin",
      this.handleConfirmPinOnvalueChange
    );
    this.addSubmitHandler('submit', this.customSubmitHandler);
  }
  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this._router.navigate(
      [
        "cards-space",
        "display-shell",
        "debit-card",
        "retail-debitcard-flash-details-form",
      ],
      {
        queryParams: {
          cardRefNumber: this.state.cardData?.cardRefNumber,
        },
      }
    );
    return {
      success: () => {
        console.log("on submit");
      },
      error: () => {
        console.log("error");
      }
    }
  }

  public handleConfirmPinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && status == "VALID") {
      let cardRefnumber = this.getRoutingParam("cardReference");
      let payload = {
        dcPinVerify: {
          pin: value,
        },
      };

      this.activateddc
        .dcPinValidator(payload, cardRefnumber)
        ?.subscribe((error) => {
          let errorMsg = error?.errorCode;
          if (error) {
            this.setErrors("confirmPin", errorMsg);
          }
        });
    }
  };

  public override preSubmitInterceptor(payload: Dcpinrequest): any {
    // WRITE CODE HERE TO HANDLE
    payload.cardRefNumber = this.getRoutingParam("cardReference");
    return payload;
  }

  public override postDataFetchInterceptor(payload: Dcpinrequest) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.dcpinrequest,
        transRef: response.success?.body?.dcpinrequest,
        status: "success",
      });
      // setTimeout(() => {
      //   this._router.navigate(
      //     [
      //       "cards-space",
      //       "display-shell",
      //       "debit-card",
      //       "retail-debitcard-flash-details-form",
      //     ],
      //     {
      //       queryParams: {
      //         cardRefNumber: this.state.cardData?.cardRefNumber,
      //       },
      //     }
      //   );
      // });

    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
