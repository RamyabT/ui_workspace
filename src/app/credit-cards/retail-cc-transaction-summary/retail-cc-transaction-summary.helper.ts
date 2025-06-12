import { ChangeDetectorRef, Injectable, inject } from "@angular/core";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { gsap } from "gsap";
import { CctransactionsummaryService } from '../cctransactionsummary-service/cctransactionsummary.service';
import { Cctransactionsummary } from '../cctransactionsummary-service/cctransactionsummary.model';
import { AppConfigService } from "@dep/services";
import { Creditcard } from "../creditcard-service/creditcard.model";
import { RetailCcTransactionFilterComponent } from "../retail-cc-transaction-filter/retail-cc-transaction-filter.component";
import { RetailCcTransactionDownloadFilterComponent } from "../retail-cc-transaction-download-filter/retail-cc-transaction-download-filter.component";
import { CreditcardService } from "../creditcard-service/creditcard.service";
export class cctransactionsummaryState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  valueDate: any = {
    minDate: "",
    maxDate: "",
  }
  transactionDate: any = {
    minDate: "",

    maxDate: "",
  }
  balance: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  cardData: Creditcard | undefined;
  formValues: any;
  isDataReceived: boolean = false;
  unBilledGridData: any;
  billedGridData: any;
}


@Injectable()
export class cctransactionsummaryHelper extends BaseFpxFormHelper<cctransactionsummaryState> {
  cctransactionsummary: any;
  activeTabIndex: number = 0;
  fromDate: any;
  toDate: any;
  isBuild: string = '0';
  showSuggestion: boolean = false;
  valueDate: any = {
    minDate: "",
    maxDate: "",
  }
  transactionDate: any = {
    minDate: "",

    maxDate: "",
  }
  balance: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  cardData: Creditcard | undefined;
  formValues: any;
  isDataReceived: boolean = false;
  unBilledGridData: any;
  billedGridData: any;

  panelData: any = [
    {
      type: "pending",
      accordianOpened: true,
      showPanel: true
    },
    {
      type: "posted",
      accordianOpened: true,
      showPanel: true
    },
  ]
  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  constructor(
    private cctransactionsummaryService: CctransactionsummaryService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private creditcardService: CreditcardService,
    private cd: ChangeDetectorRef) {
    super(new cctransactionsummaryState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCTRANSACTION");
    this.hideShellActions();
    this.removeShellBtn("BACK");
    this.state.cardData = this._appConfig.getData('creditCardData');



    this.creditcardService.onChangeCreditCard$.subscribe((creditcard: Creditcard) => {
      this.state.cardData = creditcard;
      this._appConfig.setData('creditCardData', creditcard);
      this.reloadGrid();
    });
  }

  public override doPostInit(): void {
    this.reloadGrid();
    this.setupAccordionAnimation();
    this.toggleAccordion(0);
    this.toggleAccordion(1);
  }

  reloadGrid() {
    this.state.cardData = this._appConfig.getData('creditCardData');
    const criteriaQuery = new CriteriaQuery();
    const cardRefNumber = this.state.cardData?.cardRefNumber;
    if (cardRefNumber !== undefined) {
      criteriaQuery.addFilterCritertia("cardRefNumber", "String", "equals", {
        searchText: cardRefNumber,
      });
      
      this.isBuild = '0';
      criteriaQuery.addFilterCritertia("isBuild", "String", "equals", {
        searchText: "0",
      });
      this.setGridCriteria('unBilledCcTransactionHistory', criteriaQuery);
      this.isBuild = '1';
      criteriaQuery.addFilterCritertia("isBuild", "String", "equals", {
        searchText: "1",
      });
      this.setGridCriteria('billedCcTransactionHistory', criteriaQuery);
      
}
  }

  billedCcTransactionRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.billedGridData = $event.payload;
    }
  }

  unBilledCcTransactionRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.unBilledGridData = $event.payload;
    }
  }
  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.panelData.forEach((element: any, i: any) => {
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".accordion-item-" + i;

      accordionAnimation.eventCallback("onStart", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onUpdate", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onComplete", () => {
        $(target)[0].classList.add('accordion-content-open');
      });

      accordionAnimation.eventCallback("onReverseComplete", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.fromTo(target + " .panel-body", {
        css: { height: 0 }
      }, {
        css: { height: 'auto' }
      }, 0);

      accordionAnimation.fromTo(target + " .btn-accordion-toggle", {
        css: { rotationZ: 0 }
      }, {
        css: { rotationZ: -180 }
      }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

    }, 0);
  }

  toggleAccordion(index: number) {

    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    animation = this.accountsAccordionIndexes[index];

    if (animation?.reversed()) {
      animation.play();
      this.panelData[index].accordianOpened = true;
    }
    else {
      animation?.reverse();
      this.panelData[index].accordianOpened = false;
    }
    this.opnedAccordionIndex = index;
    this.cd.detectChanges();
  }

  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailCcTransactionFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGrid.title",
      accountNumber: this.state.formValues?.accountNumber,
      minAmount: this.state.formValues?.minAmount,
      maximumAmount: this.state.formValues?.maximumAmount,
      cardRefNumber: this.state.cardData?.cardRefNumber,
      downloadFileFormat: this.state.formValues?.downloadFileFormat,
      transactionRangeType: this.state.formValues?.transactionRangeType,
      toDate: this.state.formValues?.toDate,
      fromDate: this.state.formValues?.fromDate,
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    this.fromDate = payload.fromDate;
    this.toDate = payload.toDate;

    // this.accountNumber = payload.debitAccountNumber;
    const criteriaQuery = new CriteriaQuery();

    // let cardRefNumber= this.getRoutingParam('cardRefNumber');
    criteriaQuery.addFilterCritertia('isBuild', 'String', 'equals', { searchText: this.isBuild });
    //  criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: payload.accountNumber });
    criteriaQuery.addFilterCritertia('cardRefNumber', 'String', 'equals', { searchText: payload.cardRefNumber });
    criteriaQuery.addFilterCritertia('transactionDate', 'Date', 'inRange', { dateFrom: this.fromDate, dateTo: this.toDate });

    if (payload.maximumAmount && payload.minAmount == '') {
      payload.minAmount = 0;
    }
    if ((payload.minAmount != "" || payload.minAmount == 0) && payload.maximumAmount != "") {
      criteriaQuery.addFilterCritertia('transactionAmount', 'Numeric', 'inRange', {
        fromValue: payload.minAmount,
        toValue: payload.maximumAmount
      })
    }
    this.state.formValues = {
      ...this.formGroup.value,
      transactionRangeType: payload.transactionRangeType,
      accountNumber: payload.accountNumber,
      cardRefNumber: payload.cardRefNumber,
      minAmount: payload.minAmount,
      maximumAmount: payload.maximumAmount,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      downloadFileFormat: payload.downloadFileFormat
    }
    criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
    if (this.isBuild == '0') {
      this.setGridCriteria('unBilledCcTransactionHistory', criteriaQuery);
    }
    else {
      this.setGridCriteria('billedCcTransactionHistory', criteriaQuery);
    }
  }
  public onDownloadClick: BaseFpxControlEventHandler = (payload: any) => {
    let modal = new FpxModal();
    modal.setComponent(RetailCcTransactionDownloadFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "DcTransactionHistoryGridDownload.title",
      accountNumber: this.state.formValues?.accountNumber,
      cardRefNumber: this.state.cardData?.cardRefNumber,
      isBuild: this.isBuild,
      transactionRangeType: this.state.formValues?.transactionRangeType,
      maximumAmount: this.state.formValues?.maximumAmount,
      minAmount: this.state.formValues?.minAmount,
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate,
      downloadFileFormat: this.state.formValues?.downloadFileFormat
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  public override preSubmitInterceptor(payload: Cctransactionsummary): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Cctransactionsummary) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.cctransactionsummary.transactionReference,
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
