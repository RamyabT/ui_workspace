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
  FpxSubmitHandler
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Deposits } from "../deposits-service/deposits.model";
import { DepositsService } from "../deposits-service/deposits.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { AppConfigService } from "@dep/services";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";

export class RetailDepositDetailsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  details: any;
  fields: string[] = ["accountNumber","asOf"];
  fieldsFormat: string[] = ["text", "date"];
}


@Injectable()
export class RetailDepositDetailsFormHelper extends BaseFpxFormHelper<RetailDepositDetailsFormState>{

  accountNumber: string = "";
  isAccountDetailsApiFailed: boolean = false;
  deposits: any;
  showInvestmentAccDetails: any;
  activeAccountNumber: any

  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private depositsService: DepositsService,
    // private _device: DeviceDetectorService,
    public _device: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private route: ActivatedRoute,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService,
    protected _accountSpaceMgr: AccountsSpaceManager,
  ) {
    super(new RetailDepositDetailsFormState());
    route.queryParams.subscribe((params:any) => {
      if(params && params?.rid) this.handleFormOnLoad();
    });
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.deposits = this._accountSpaceMgr.getDeposits();
    this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    if(this.activeAccountNumber){
      this.deposits=this.deposits.filter((item: any) => item.accountNumber==this.activeAccountNumber );
    }
    else{
      this.deposits=this.deposits.filter((item: any) => item.accountNumber==this.accountNumber);
    }
    // let res: any= this._appConfig.getDepositsSummary();
    // let keys: any = {
    //   accountNumber: this.accountNumber
    // }
    // this.depositsService.findByKey(keys)().subscribe({
    //   next: (res) => {
    //     this.state.details = res as Deposits;
    //   },
    //   error: (err) => {
    //     console.log("Deposit details fetch problem!");
    //   }
    // });

    this.state.details=this.deposits[0];
  }

  public override doPreInit() {
    this.removeShellBtn("BACK");
    this.addShellButton('RetailDepositDetailsForm.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
    this.setShellBtnMethod('DOWNLOAD', this.downloadAdvice.bind(this));
    let showInvestmentAccDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showInvestmentAccDetails$', {
      "observable": showInvestmentAccDetails$.asObservable(),
      "subject": showInvestmentAccDetails$
    });

    if (this._appConfig.hasData('showInvestmentAccDetails$')) {
      this._appConfig.getData('showInvestmentAccDetails$').observable.subscribe(
        (res: any) => {
          console.log("showInvestmentAccDetails", res);
          this.showInvestmentAccDetails = res?.showInvestmentAccDetails ? true : false;
          if (this.showInvestmentAccDetails) {
            this.activeAccountNumber= res.depositAccount
            this.handleFormOnLoad();
          }
        }
      );
    }
  }

  downloadAdvice(payload: any) {
    // let customerCode = this.getRoutingParam('customerCode');
    this.depositsService.downloadDetails(this.accountNumber).subscribe({
      next: (response: any) => {
        if (this._device.isHybrid()) {
          this._fileOpener.openPDF(response);
        } else {
          let documentURL = URL.createObjectURL(
            new Blob([response.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "accountDetails.pdf";
          downloadLink.download = fileName;
          // downloadLink.click();
        }
      }
    });
  }

  getAbsoluteValue(value: any | undefined): any {
    value = value?.toString().replaceAll(',', '');
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: any | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}

