import { ChangeDetectorRef, Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  CriteriaQuery,
} from "@fpx/core";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { SkinManager } from "@dep/ui";
import { FavpaymentsService } from "../favpayments-service/favpayments.service";

export class InteracFavTransactionComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class InteracFavTransactionComponentHelper extends BaseFpxFormHelper<InteracFavTransactionComponentState>{
  public showFavTransaction: boolean = false;
  public totalRecordCount: number = -1;
  public favTransfersApiReceived: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _appConfig: AppConfigService,
    public skinManager: SkinManager,
    private _favpaymentsService: FavpaymentsService,
  ) {
    super(new InteracFavTransactionComponentState());
  }

  override doPreInit(): void {
    this.setServiceCode('RETAILETRANSFERFAVPAYMENTS');
    // this._favpaymentsService.isFavETransferAvailable.subscribe({
    //   next: (res) => {
    //     this.showFavTransaction = res;
    //   }
    // });
  }

  public override doPostInit(): void {
    // this.favTransfersApiReceived = true;
    // this.totalRecordCount = $event.payload || 0;
    // this.showFavTransaction=$event.payload || 0;
    // this.totalRecordCount = 0;
    // this.showFavTransaction = false;
  }

  onClick() {
    // this._router.navigate(['transfers-space', 'display-shell', 'transfers', 'select-bene-type']);
  }

  viewAllFav() {
    this._router.navigate(['etransfers-space', 'display-shell', 'etransfers', 'view-all-etransfer-favrourite']);
  }
  favETransferRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.favTransfersApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
      // this.showFavTransaction=$event.payload || 0;
      // this.totalRecordCount = 0;
      this.showFavTransaction = true;
    }
  }

  initiateNewTransaction(){
    // this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers'],{
    //   queryParams: {
    //     routeFrom: 'otherModule',
    //   }
    // });
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}