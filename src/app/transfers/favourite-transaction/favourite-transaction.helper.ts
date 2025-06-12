import { ChangeDetectorRef, Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  CriteriaQuery,
} from "@fpx/core";
import { FavpaymentsService } from "../favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";

export class FavouriteTransactionComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class FavouriteTransactionComponentHelper extends BaseFpxFormHelper<FavouriteTransactionComponentState>{
  showFavTransaction: boolean = false;
  public totalRecordCount: number = -1;
  public favTransfersApiReceived: boolean = false;

  constructor(private _favpaymentsService: FavpaymentsService,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _appConfig: AppConfigService) {
    super(new FavouriteTransactionComponentState());
  }

  override doPreInit(): void {
    this._favpaymentsService.isFavTransferAvailable.subscribe({
      next: (res) => {
        this.showFavTransaction = res;
      }
    });
  }

  public override doPostInit(): void {
  }

  onClick() {
    this._router.navigate(['transfers-space', 'display-shell', 'transfers', 'select-bene-type']);
  }

  viewAllFav() {
    this._router.navigate(['transfers-space', 'display-shell', 'transfers', 'view-all-favrourite'],{
      queryParams: {
        routeFrom: 'otherModule',
      }
    });
  }

  favTransferRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.favTransfersApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }
  }

  initiateNewTransaction(){
    this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers'],{
      queryParams: {
        routeFrom: 'otherModule',
      }
    });
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}