import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CustomMenuService, UserAuthService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';
import { Observable } from 'rxjs';
import { DepAlertComponent } from '../dep/core/component/dep-alert/dep-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceCodeAccessGuardService extends BaseFpxFunctionality implements CanActivateChild {

  constructor(
    private _menuService: CustomMenuService,
    private _userAuthService: UserAuthService
  ) { 
    super()
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let routeData:any = childRoute?.data;
    let serviceCodeAccess:boolean = true;
    if(routeData?.serviceCode){
      let serviceCode = routeData.serviceCode;
      serviceCodeAccess = this.canAccessService(serviceCode, true);
    }

    return serviceCodeAccess;
  }

  public canAccessService(serviceCode: string, notify:boolean = false){
    let allowed:boolean = true;
    let cifChangedFlag = this._userAuthService.getAuthorizationAttr("CIFChanged") == "1" ? true : false;
    allowed = cifChangedFlag ? this._menuService.allowedServices[serviceCode] || false : true;
    
    if(!allowed && notify){
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass('dep-popup-back-drop');
      modal.setDisableClose(false);
      modal.setData({
        title: "DEFAULT.accessDenied",
        message: 'DEFAULT.serviceAccessDenied',
      });
      this.openModal(modal);
    }

    return allowed;
  }
}
