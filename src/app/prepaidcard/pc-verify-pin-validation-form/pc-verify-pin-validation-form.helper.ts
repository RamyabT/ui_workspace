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
import { PcpinvalidationService } from "../pcpinvalidation-service/pcpinvalidation.service";
import { Pcpinrequest } from "../pcpinvalidation-service/pcpinvalidation.model";
import { ActivatePCValidationService } from "src/app/foundation/validator-service/activatepc-validation.service";
export class PCVerifyPinValidationFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  confirmPin: any = {
    visibilityChange: false,
    autoComplete: false,
  };
}

@Injectable()
export class PCVerifyPinValidationFormHelper extends BaseFpxFormHelper<PCVerifyPinValidationFormState> {
  constructor(
    private activatedPc: ActivatePCValidationService,
    private pcVerifyPinValidationFormService: PcpinvalidationService,
    private _httpProvider: HttpProviderService,
    private _router: Router
  ) {
    super(new PCVerifyPinValidationFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("PCCURRENTPINVALIDATION");
    this.setValue("cardReference", this.getRoutingParam("cardReference"));
    this.addResetHandler("reset", this._reset);
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.setValue("cardReference", this.getRoutingParam("cardReference"));
  };

  public override doPostInit(): void {
    this.addValueChangeHandler(
      "pin",
      this.handleConfirmPinOnvalueChange
    );
    this.addSubmitHandler('submit', this.customSubmitHandler);
  }

  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this._router.navigate(
            [
              "cards-space",
              "display-shell",
              "prepaidcard",
              "retail-pc-flash-details-form",
            ],
            {
              queryParams: {
                cardReference: this.getRoutingParam("cardReference"),
                inventoryNumber: this.getRoutingParam("inventoryNumber")
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
        pcPinVerify: {
          pin: value,
        },
      };

      this.activatedPc
        .pcPinValidator(payload, cardRefnumber)
        ?.subscribe((error) => {
          let errorMsg = error?.errorCode;
          if (error) {
            this.setErrors("pin", errorMsg);
          }
        });
    }
  };

  public override preSubmitInterceptor(payload: Pcpinrequest): any {
    // WRITE CODE HERE TO HANDLE
    payload.cardRefNumber = this.getRoutingParam("cardReference");
    return payload;
  }

  public override postDataFetchInterceptor(payload: Pcpinrequest) {
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
