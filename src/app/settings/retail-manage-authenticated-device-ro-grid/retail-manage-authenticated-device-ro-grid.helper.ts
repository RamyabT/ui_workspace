import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
} from "@fpx/core";
import { Userdevice } from '../userdevice-service/userdevice.model';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';

@Injectable()
export class RetailManageAuthenticatedDeviceRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _deviceDetectorService: DeviceDetectorService,
    private _appConfig: AppConfigService,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailManageAuthenticatedDeviceRoGridView);
    this.addHandleActions('modify', this.retailManageAuthenticatedDeviceRoGridModify);
    this.addHandleActions('add', this.retailManageAuthenticatedDeviceRoGridEntry);
  }
   
  public getGridColumnWidth(): number[] {
    return  [3,];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailManageAuthenticatedDeviceRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Userdevice
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailManageAuthenticatedDeviceRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Userdevice
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailManageAuthenticatedDeviceRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Userdevice
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
  this.setNgTemplateClass('manage-authenticated-device-tmpl');
    this.setNgTemplateName('manageAuthenticatedDeviceTmpl');
  }
  
  
 override doPostInit(): void {

  if (this._appConfig.hasData('settingsActionPublisher$')) {
    this._appConfig.getData('settingsActionPublisher$').observable.subscribe(
      (res: any) => {
        console.log("refresh manage my device... 1");
        if(res?.action == "MANAGEMYDEVICEREFRESHGRID"){
          let criteriaQuery: CriteriaQuery = new CriteriaQuery();
          this.refreshGrid(criteriaQuery);
        }
      }
    );
  }
  }  

  override doDestroy(): void {
    // if(this._appConfig.hasData('settingsActionPublisher$')){
    //   this._appConfig.getData('settingsActionPublisher$').subject.unsubscribe();
    //   this._appConfig.removeData('settingsActionPublisher$');
    // }
  }

  override postFindallInterceptor = (payload: any) => {

    this.triggerGridOutputEvent('MANAGEMYDEVICEDDATAEMIT',payload)
    let tempPayload:any = [];
    if(payload?.data?.length>0){
      payload.data?.forEach((res:any)=>{
        let decodeDdeviceInfo;
        // if(res?.deviceInfo && atob(res?.deviceInfo)){
          // decodeDdeviceInfo = JSON.parse(atob(res?.deviceInfo))
        
        // }
        decodeDdeviceInfo = JSON.parse(res?.deviceInfo);
         tempPayload.push({...res,decodeDdeviceInfo:decodeDdeviceInfo})
      })

      let currentDeviceId = this._deviceDetectorService.getDeviceInfo()?.deviceId;
      let currentDeviceDetail = tempPayload.find((x:any)=>{return x.deviceId === currentDeviceId});
      let currentDeviceIndex = tempPayload.findIndex((x:any)=>{ return x.deviceId === currentDeviceId});
      let  newArray:any;
      if(currentDeviceDetail != null){
        // const index = tempPayload?.indexOf(currentDeviceIndex);
        // if (index > -1) { // only splice array when item is found
          tempPayload?.splice(currentDeviceIndex, 1); // 2nd parameter means remove one item only
        // }
        currentDeviceDetail.isCurrentDevice = true;
        newArray = [currentDeviceDetail].concat(tempPayload) 
      }
      return newArray?newArray:tempPayload;
    }
    return payload;
  }
 
 
}


 
 
