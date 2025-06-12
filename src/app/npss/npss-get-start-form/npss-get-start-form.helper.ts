import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseFpxComponentState, BaseFpxFormHelper, HttpProviderService, RoutingInfo } from "@fpx/core";
import { NpssCustomerStatus, NpssMainService } from "../npss-service/npss-main.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService } from "@dep/core";


export class NpssGetStartFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  currentNicknameVariable: any;
  npssDetails: any = undefined;
}

@Injectable()
export class NpssGetStartFormHelper extends BaseFpxFormHelper<NpssGetStartFormState>{
  
  constructor(
    private _npssMainService: NpssMainService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new NpssGetStartFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("NPSSGETSTART");
    this.state.npssDetails = this._appConfig.getData('npssDetails');
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE 
    this.removeShellBtn('BACK');
    this._activeSpaceInfoService.setOrginSpace('home');
  }
  
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public getStartNpss(){
    this._angularRouter.navigate(['npss-space', 'entry-shell', 'npss', 'npss-customer-enrollment']);
  }

  activateNpss(){
    let service = this._appConfig.getServiceDetails('RETAILCUSTOMERACTIVATION');
    this._angularRouter.navigate(service.servicePath);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


