import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper } from "@fpx/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";

export class NpssNavigationFormState extends BaseFpxComponentState {
  casaAccounts: Casaaccount[] = [];
  accountNumber: string = '';
  resetActiveMenu: boolean = false;
  npssDisabled: boolean = false;
}

@Injectable()
export class NpssNavigationFormHelper extends BaseFpxFormHelper<NpssNavigationFormState>{

  constructor(
    private _activeSpace: ActiveSpaceInfoService,
    private _appConfig: AppConfigService,
    private _device: DeviceDetectorService
  ){
    super(new NpssNavigationFormState() )
  }

  override doPreInit(){
    if(!this._device.isMobile()){
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res:any) => {
          if(res.event == 'onFormClose'){
            this.state.resetActiveMenu = true;
            setTimeout(()=>{
              this.state.resetActiveMenu = false;
            });
          }
        }
      );
      this._appConfig.getData('npssModuleRefresh$').observable.subscribe(
        (res: any) => {
          if (res?.event == 'ENROLL') {
            this.state.npssDisabled = true;
            console.log("enrollment");
          }
          // else if (res?.event == 'MANAGE') {
          //   this.state.npssDisabled = true;
          //   console.log("manage");
          // }
          else if (res?.event == 'UNENOLL') {
            this.state.npssDisabled = true;
            console.log("unenroll");
          }
          else if (res?.event == 'PROXY') {
            this.state.npssDisabled = true;
            console.log("PROXY");
          }
          else if (res?.event == 'DEACTIVATE') {
            this.state.npssDisabled = true;
            console.log("deactivate");
          }
          else if(res?.event == "ENTROL_SUCCESS"){
            this.state.npssDisabled = false;
          }
        }
      );

    }
  }

  override doPostInit(){
    if(this.getRoutingParam().routeFrom != 'otherModule') {
      this._activeSpace.setActiveModule('npss');
      this._angularRouter.navigate(['npss-space', 'npss']);
    }
  }
}
