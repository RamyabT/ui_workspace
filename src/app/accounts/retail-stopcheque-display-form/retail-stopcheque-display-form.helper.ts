import { ChangeDetectorRef, Injectable } from "@angular/core";
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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed,
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TempScheduleRepService } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.service";
import { Stopcheque } from "../stopcheque-service/stopcheque.model";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { StopchequeService } from "../stopcheque-service/stopcheque.service";
import { gsap } from "gsap";
declare let $: any;
export class RetailStopChequeDisplayFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
  exceptionMessage: string = '';
  revokeData: any;
}


@Injectable()
export class RetailStopChequeDisplayFormComponentHelper extends BaseFpxFormHelper<RetailStopChequeDisplayFormComponentState> {
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showScheduleHistory: any;
  showExceptionMsg: boolean = false;
  stopchequeApiReceived: boolean = false;
  totalRowCount: number = -1;
  hideStopChequeLoader: boolean = false;

  stopChequeDetails: any;
  stoppedChequesTooltip: string = "These are your stopped cheques. You can expand each one to view details or revoke the stop cheque.";


  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _tempScheduleRepService: TempScheduleRepService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _stopChequeService: StopchequeService,
    private _appconfig: AppConfigService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private cd: ChangeDetectorRef
  ) {
    super(new RetailStopChequeDisplayFormComponentState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    if (this.deviceDetectorService.isDesktop()) {
      if (this._appconfig.hasData('showStopChequeDetails$')) {
        this._appconfig.getData('showStopChequeDetails$').subject.next({
          showStopChequeDetails: false
        });
      }
    }

  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    // if(this.deviceDetectorService.isMobile()){
      this.getStopChequeDetails();
    // }
  }

  public override doPostInit(): void {
    this.removeShellBtn("BACK");
    this.handleFormOnLoad();
    if (this.deviceDetectorService.isMobile()) {
      this._appConfig.setData('navBack', ['accounts-space']);
    }
    else {
      this._appConfig.setData('navBack', ['accounts-space', 'accounts']);
    }
  }

  getReason(selectedData: any) {
    let reasonText;
    switch (selectedData.reason) {
      case '1': reasonText = 'Lost/Stolen'; break;
      case '2': reasonText = 'Mailed to incorrect address'; break;
      case '3': reasonText = 'Alternate payment arrangements made'; break;
      case '4': reasonText = 'Cheque contains incorrect information'; break;
      case '5': reasonText = 'Do not want to pay'; break;
      case '6': reasonText = 'Other: '+ selectedData.otherReason ; break;
    }
    return reasonText;
  }
  revoke(selectedData: any) {
    this._appconfig.setData('setStopChequeData', selectedData);
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-revoke-stop-cheque'], {
      queryParams: {
        relatedReference: selectedData.relatedReference
      }
    });
  }
  getStopChequeDetails() {
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: this._activeSpaceInfoService.getAccountNumber()
    });
    criteriaQuery.addSortCriteria('stopDate', 'desc', 'Date');
    this._stopChequeService.findAll(criteriaQuery)().subscribe({
      next: (res: any) => {
        this.state.isDataReceived = true;
        this.stopChequeDetails = res.data;
        if(res.data.length=='0' || !res.data){
          this.hideStopChequeLoader = true;
        }
        setTimeout(() => {
          this.setupAccordionAnimation();
        }, 5);
      }
    });
  }

  getAccountDetails() {
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item: any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0]?.accountNickname || selectedAccount?.[0]?.productDesc;
  }

  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  count: number = 0;

  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.stopChequeDetails.forEach((element: any, i: any) => {
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
    setTimeout(() => {
      this.hideStopChequeLoader = true;
    }, 5);
  }

  toggleAccordion(index: number) {
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if (this.opnedAccordionIndex == index) {

    } else if (this.opnedAccordionIndex >= 0) {
      // if (this.deviceDetectorService.isMobile()) {
        animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
        animation.reverse();
      // }
    }
    animation = this.accountsAccordionIndexes[index];
    if (animation?.reversed()) {
      animation.play();
      this.stopChequeDetails[index].accordianOpened = true;
    }
    else {
      animation.reverse();
      this.stopChequeDetails[index].accordianOpened = false;
    }
    this.opnedAccordionIndex = index;
    this.cd.detectChanges();
  }


  initiateStopCheque() {
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stop-cheque-request'], {
      queryParams: {
        // accountNumber: this._activeSpaceInfoService.getAccountNumber()
      }
    });
  }

  StopCheque() {
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stop-cheque-request'], {
      queryParams: {
        // accountNumber: data.accountNumber
      }
    });
  };
  pendingCheques() {
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stopcheque-display-grid']);
  }

  handleStopChequeFormGridEvent($event: any) {

    // if (Object.keys($event.payload).length > 0) {
    //   if ($event.eventName == 'onSelectRowData') {
    //     console.log($event.payload)
    //     this.state.revokeData = $event.payload;
    //     if (this.state.revokeData.relatedReference) {
    //       this.setValue('revokeEnable', 1);
    //     }
    //     else {
    //       this.setValue('revokeEnable', 0);
    //     }
    //   }
    // } else {
    //   this.setValue('revokeEnable', 0);
    // }
    //for no Data
    if ($event.eventName == 'afterDataFetch') {
      this.stopchequeApiReceived = true;
      // this.totalRecordCount = $event.payload || 0;
      this.state.isDataReceived = true;
      this.totalRowCount = $event.payload?.length || 0;
    }

  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}