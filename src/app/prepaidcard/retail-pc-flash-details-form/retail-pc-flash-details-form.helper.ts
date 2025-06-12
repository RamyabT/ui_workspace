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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PpCardService } from '../ppCard-service/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { PrepaidcardDetailsService } from "../prepaidcard-details-service/prepaidcard-details.service";
import { CurrencyPipe } from "@angular/common";
export class RetailPCFlashDetailsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  validThru: any = {
    minDate: "",
    maxDate: "",
  }
  FieldId_9: any = {
    text: " <span>Linked Account&nbsp; Details</span>"
  }
  cardData!: Prepaidcard;
}


@Injectable()
export class RetailPCFlashDetailsFormHelper extends BaseFpxFormHelper<RetailPCFlashDetailsFormState> {

  constructor(private retailPCFlashDetailsFormService: PpCardService, private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    public currency: CurrencyPipe, private _prepaidcardDetailsService: PrepaidcardDetailsService) {
    super(new RetailPCFlashDetailsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILFLASHPREPAIDCARD");
    this.removeShellBtn("BACK");
    this.state.cardData = this._appConfig.getData('creditCardData');
    this.setValue('cardRefNumber', this.state.cardData?.cardRefNumber)

    let key: any = {
      inventoryNumber: this.getRoutingParam("inventoryNumber")
    }
    this._prepaidcardDetailsService.getFlashCardDetails(key).subscribe({
      next: (value) => {
        console.log(value);
        this.state.cardData = {
          ...this.state.cardData,
          ...value
        };
      },
      error: (value) => {

      },
    })
  }
  public handleFormOnLoad() {
    this.state.cardData = this._appConfig.getData('prepaidCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber);
    this.setValue('branchDesc', this.state.cardData?.branchDesc);
    this.setValue('issueDate', this.state.cardData?.issueDate);
    this.setValue('validFrom', this.state.cardData?.validThru);
    this.setValue('accountNumber', this.state.cardData?.primaryCardAccNo);
    this.setValue('cardHolderName', this.state.cardData?.cardHolderName);
    this.setValue('actualBalance', this.state.cardData?.lastTopupdate);
    this.setValue('accountType', this.state.cardData?.multiCurrencySupported);
    this.setValue('avlBalance', this.state.cardData?.avlBalance);
    let topupAmount = this.currency.transform(this.state.cardData?.lastRechargeAmount, this.state.cardData?.currency + ' ');
    this.setValue('productDesc', topupAmount);
  }

  public override doPostInit(): void {
    this.addControlEventHandler("cardReferenceDataReceived", this.onCardRefNumberDataReceived);
    this.handleFormOnLoad();
  }
  public onCardRefNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.setValue('cardNumber', payload.cardRefNumber);
      this.setValue('cardHolderName', payload.cardHolderName);
      this.setValue('cvv', payload.cvv);
      this.setValue('validThru', payload.validThru);
      this.setValue('validFrom', payload.issueDate);

    }
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      cardReference: payload.cardReference,
    };
    return payload;
  }


  public override postDataFetchInterceptor(payload: PpCard) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      if (this.state.cardData?.pinStatus == '0') {
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass('dep-popup-back-drop');
        modal.setDisableClose(false);
        modal.setData({
          message: "Please set your Card PIN to proceed",
        });
        modal.setAfterClosed(this.MenuClose);
        this.openModal(modal);
      }
      else {
        setTimeout(() => {
          this._router.navigate(["cards-space", "entry-shell", "prepaidcard", "cc-verify-pin-validation-form"], {
            queryParams: {
              "cardReference": this.state.cardData?.cardRefNumber,
              "inventoryNumber": response.success.body.flashcreditcardrequest.inventoryNumber
            }
          });
        });
      }
    }else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }

  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      setTimeout(() => {
        this._router.navigate(["cards-space", "entry-shell", "prepaidcard", "retail-dc-change-pin-request"], {
          queryParams: {
            "cardReference": this.state.cardData?.cardRefNumber
          }
        });
      });
    }
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


