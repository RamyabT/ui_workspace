import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
 import { FormControlStatus, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { wallet } from "../wallet-summary-service/walletsummary.model";
import { WalletSpaceManager } from "src/app/wallet-space/wallet-space.manager";
 
export class WalletNavigationFormState extends BaseFpxComponentState {
  walletAccounts: wallet[] = [];
  walletAccountNumber: string = '';
  resetActiveMenu: boolean = false;
}

@Injectable()
export class WalletNavigationFormHelper extends BaseFpxFormHelper<WalletNavigationFormState>{

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,  private _walletSpaceMgr: WalletSpaceManager,
  ){
    super(new WalletNavigationFormState() )
  }

  override doPreInit(){

  }

  override doPostInit(){
    if(!this._device.isMobile()){
    //   this._appConfig.getData('moduleRefresh$').observable.subscribe(
    //     (res:any) => {
    //       if(res?.event == 'onFormClose'){
    //         this.state.resetActiveMenu = true;
    //         setTimeout(()=>{
    //           this.state.resetActiveMenu = false;
    //         });
    //       }
    //     }
    //   );
    }

         console.log("this._walletSpaceMgr",this._walletSpaceMgr)

        this.state.walletAccounts = this._walletSpaceMgr.getwalletAccountsList();
        let walletAccountNumber:string = this._activeSpaceInfoService.getAccountNumber();
        if(!walletAccountNumber){
            walletAccountNumber = this.state.walletAccounts[0].walletAccountNumber;
        }
    
        this.state.walletAccountNumber = walletAccountNumber;
        this.setValue('walletAccountNumber', this.state.walletAccountNumber);
        this._activeSpaceInfoService.setAccountNumber(this.state.walletAccountNumber);
    

    this.addValueChangeHandler('walletAccountNumber', this.handleAccountNumberOnChange);
  }

  public handleAccountNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const walletAccountNumber = value;
    this.state.walletAccountNumber = walletAccountNumber;
    this._activeSpaceInfoService.setAccountNumber(this.state.walletAccountNumber);
    if(this.getRoutingParam().routeFrom != 'otherModule') {
      let rid:number = Math.floor(Math.random() * 99999999);
      this._angularRouter.navigate(['wallet-space','wallet'],
        {
          queryParams: {
            rid: rid
          }
        }
      );
    }
  }
}
