import { ChangeDetectorRef, Inject, Injectable, inject } from "@angular/core";
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
  FpxResetHandler,
} from "@fpx/core";
import { Observable, map, of, pairwise, startWith } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, CustomMenuService, UserAuthService } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { TranslateService } from "@ngx-translate/core";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export class CustomizeQuickActionState extends BaseFpxComponentState {
  
}

@Injectable()
export class CustomizeQuickActionHelper extends BaseFpxFormHelper<CustomizeQuickActionState> {
  addedQuickLinks: any = [];
  moreQuickLinks: any = [];
  

  constructor(protected translate: TranslateService,
    private _menuService: CustomMenuService,
    public _device: DeviceDetectorService,
    private _userService: UserAuthService,
    private _activeSPace: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>
  ) {
    super(new CustomizeQuickActionState());
  }

  override doPreInit(): void {
    this._activeSPace.setOrginSpace('home')
    this.removeShellBtn('BACK');
    this.removeShellBtn('SUBMIT');
    this.addShellButton('SAVE', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
    this.setShellBtnMethod('DOWNLOAD', this.save.bind(this));

    if(this._device.isMobile()) {
      this.addedQuickLinks = JSON.parse(this.getRoutingParam('quickActions'));
    }
    else {
      this.addedQuickLinks = JSON.parse(this._dialogData?.quickActions);
    }
    this.moreQuickLinks = this._menuService.getMenuList("RETAILSEARCH");
    if(this.moreQuickLinks.length > 0) {
      let tempArray: any = [];
      let obj: any = {};
      this.moreQuickLinks.forEach((element: any, index: number) => {
        obj = {};
        obj['dtlsl'] = index+1;
        obj['serviceCode'] = element.serviceCode;
        obj['serviceDesc'] = element.serviceDescription;
        tempArray.push(obj);
      });
      this.moreQuickLinks = tempArray;
    }
    this.moreQuickLinks = this.moreQuickLinks.filter((more: any) => !this.addedQuickLinks.find((added: any) => (added.serviceCode === more.serviceCode) ))
  }

  removeMenu(menu: any) {
    this.addedQuickLinks = this.addedQuickLinks.filter((added: any) => added.serviceCode != menu.serviceCode);
    this.moreQuickLinks.push(menu);
  }

  addMenu(menu: any) {
    if(this.addedQuickLinks.length >= 8) return;
    this.moreQuickLinks = this.moreQuickLinks.filter((added: any) => added.serviceCode != menu.serviceCode);
    this.addedQuickLinks.push(menu);
  }

  onBackClick() {
    this._dialogRef.close();
  }

  save(payload: any) {
    payload = {};
    if(this.addedQuickLinks.length > 0) {
      this.addedQuickLinks?.forEach((element: any, index: number) => {
        element.dtlsl = index+1;
      });
    }
    payload.quickactiondtls = this.addedQuickLinks;
    payload.userId = this._userService.userId;
    this._menuService.patchQuickActions(payload).subscribe(
      (res: any)=>{
        if(this._device.isMobile()) {
          this._angularRouter.navigate(['home'])
        }
        else {
          this._dialogRef.close();
        }
      }
    )
  }

  private _reset: FpxResetHandler = (payload: any) => {
  };

  public override doPostInit(): void {
    
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dclimitrequest;
      routingInfo.setQueryParams({
        response: res,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
      });
    }
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);

    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
