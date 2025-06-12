import { Injectable } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import {
  BaseFpxDataService,
  HttpProviderService,
  ILookUpData,
  FindByKeyFn,
  FindAllFn,
  CreateFn,
  ModifyFn,
  LookUpFn,
  IHttpSuccessPayload,
  ILookupResponse,
  HttpRequest
} from '@fpx/core';
import { IFpxMenuChild } from '@fpx/layout';
import { of, map, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomMenuService implements BaseFpxDataService<any> {
  public menuList: any[] | undefined;
  public treeMenuReceived$:BehaviorSubject<any> = new BehaviorSubject(null);
  public allowedServicesReceived$:BehaviorSubject<any> = new BehaviorSubject(null);
  public allowedServices:any = null;

  constructor(private _httpProvider: HttpProviderService, private _device: DeviceDetectorService) { }

  findByKey(key: ILookUpData): FindByKeyFn<IFpxMenuChild[]> {
    throw new Error('Method not implemented.');
  }
  findAll(): FindAllFn<IFpxMenuChild[]> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/menu/tree');
      
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          let menus = res.body?.menus;
          this.menuList = menus;
          this.allowedServices = res.body?.services;
          this.allowedServicesReceived$.next({allowedServicesList:this.allowedServices }) ;
          this.treeMenuReceived$.next({serviceList: this.menuList});
          return menus;
        })
      );
    };
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  lookup(key: any): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/menulist');
      httpRequest.addQueryParameter('lookup', 1);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }

  fetchQuickActions(key: string = 'default'): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/quickactions');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.quickactions;
      })
    );
  }

  patchQuickActions(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
      httpRequest.setResource('/quickactions/{userid}');
       httpRequest.addPathParameter('userid', payload.userId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"quickactions":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body;
        })
      );
  }

  filterMenuByMenuCode(menus:IFpxMenuChild[], menuCode: string){
    let _menus:any;

    menus?.forEach((item) => {
      if(_menus) return _menus;
      if(item.menuCode == menuCode){
        _menus = item.menus;
        return;
      } else {
        _menus = this.filterMenuByMenuCode(item.menus as IFpxMenuChild[], menuCode);
      }
    });

    return _menus;
  }

  getMenuList(menuCode: string):IFpxMenuChild[] {
    let _menus;
    _menus = this.filterMenuByMenuCode(this.menuList as IFpxMenuChild[], menuCode);
    return _menus;
  }

  getTreeMenuReceived$(){
    return this.treeMenuReceived$.asObservable();
  }

  getAllowedServicesReceived$(){
    return this.allowedServicesReceived$.asObservable();
  }

  getAccountsMenuCodeByAccountType(accountType: string){
    let menuCode = '';
    if(this._device.isMobile()) {
      menuCode = accountType == 'CA' ? 'MOBCASAMENU' : 'MOBCASAQUICKSA';
    } else {
      menuCode = accountType == 'CA' ? 'CASAMENU' : 'CASAQUICKSA';
    }
    return menuCode;
  }
}