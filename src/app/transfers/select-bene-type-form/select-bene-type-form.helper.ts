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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";

export class SelectBeneTypeFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  cardData!: Casaaccount;
}


@Injectable()
export class SelectBeneTypeFormComponentHelper extends BaseFpxFormHelper<SelectBeneTypeFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,


  ) {
    super(new SelectBeneTypeFormComponentState());
  }

  override doPreInit(): void {
    this.removeShellBtn('BACK');
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let gridData:any = [
      {
        beneficiaryName: "retail-bene-internal-form",
        beneficiaryType: "within-bank-transfer",
        beneDescription: 'addBeneROGrid.internalBene.title',
        // description: 'Lorem Ipsum lorem ipsum lorem ipusmlorem'
      },
      {
        beneficiaryName: "retail-bene-dom-req",
        beneficiaryType: "domestic-transfer",
        beneDescription: 'addBeneROGrid.domBene.title',
        // description: 'Lorem Ipsum lorem ipsum lorem ipusmlorem'
      },
      {
        beneficiaryName: "retail-bene-International-req-form",
        beneficiaryType: "international-transfer",
        beneDescription: 'addBeneROGrid.internationalBene.title',
        // description: 'Lorem Ipsum lorem ipsum lorem ipusmlorem'
      },
      {
        beneficiaryName: "retail-bene-cc-req-form",
        beneficiaryType: "other-bank-credit-card",
        beneDescription: 'addBeneROGrid.otherCCBene.title',
        // description: 'Lorem Ipsum lorem ipsum lorem ipusmlorem'
      }
    ];

    this.setGridData('selectBeneTypeGrid', gridData);
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}