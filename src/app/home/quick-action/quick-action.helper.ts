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
  FpxModalAfterClosed,
} from "@fpx/core";
import { Observable, map, of, pairwise, startWith } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, CustomMenuService, UserAuthService } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { TranslateService } from "@ngx-translate/core";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomizeQuickActionComponent } from "../customize-quick-action/customize-quick-action.component";
export class QuickActionState extends BaseFpxComponentState {
  
}

@Injectable()
export class QuickActionHelper extends BaseFpxFormHelper<QuickActionState> {
  protected _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  public quickLinks: any;

  constructor(protected translate: TranslateService,
    private _menuService: CustomMenuService,
    private _device: DeviceDetectorService,
    private _appConfig:AppConfigService
  ) {
    super(new QuickActionState());
  }

  override doPreInit(): void {

  }


  private _reset: FpxResetHandler = (payload: any) => {
  };

  public override doPostInit(): void {
    this.getQuickActions();
  }

  getQuickActions() {
    this._menuService.fetchQuickActions().subscribe(
      (res:any)=> {
        console.log(res);
        this.quickLinks = res?.quickactiondtls?.slice(0,8);
        if(!this.quickLinks) {
          this._menuService.getTreeMenuReceived$().subscribe(
            (res:any) => {
              this.quickLinks = this._menuService.getMenuList("RETAILDASHBOARDQUICK");
              if(this.quickLinks && this.quickLinks.length > 0) {
                let tempArray: any = [];
                let obj: any = {};
                this.quickLinks.forEach((element: any, index: number) => {
                  obj = {};
                  obj['dtlsl'] = index+1;
                  obj['serviceCode'] = element.serviceCode;
                  obj['serviceDesc'] = element.serviceDescription;
                  tempArray.push(obj);
                });
                this.quickLinks = tempArray;
              }
              console.log("RETAILDASHBOARDQUICK: ", this.quickLinks);
            }
          );
        }
      }
    );
  }

  customizeQuickLinks() {
    if(this._device.isMobile()) {
      this._angularRouter.navigate(['display-shell','home','customize-quick-links'],{
        queryParams: {
          "quickActions": JSON.stringify(this.quickLinks)
        }
      });
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(CustomizeQuickActionComponent);
      modal.setPanelClass('dep-info-popup');
      modal.setDisableClose(false);
      modal.setData({
        title: "CUSTOMIZE_QUICK_LINKS.title",
        quickActions: JSON.stringify(this.quickLinks)
      });
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      this.openModal(modal);
    }
    
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this.getQuickActions();
  }

  openLink(quickLink:any){
    console.log("open list: ", quickLink.id);
    let service = this._appConfig.getServiceDetails(quickLink?.serviceCode);
    let orginSpace = service?.servicePath?.[0];
    if(this._device.isMobile()){
      orginSpace = "home";
    }
    this._activeSpaceInfoService.setOrginSpace(orginSpace);
    
    this._angularRouter.navigate(service.servicePath);
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
