import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest, combineLatestWith, from, map, mergeMap, of } from 'rxjs';
import { Device } from '@ionic-native/device/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';
import { SmartDeviceInfo } from './smartdevice.model';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { APPCONSTANTS } from '@dep/constants';

declare let IRoot:any;
declare let navigator:any;
declare let window:any;

@Injectable({
  providedIn: 'root'
})
export class SmartDeviceService {
  enableSSLPinning:boolean = APPCONSTANTS.enableSSLPinning;
  deviceInfo!:SmartDeviceInfo;

  constructor(
    private device:Device,
    private dialogs:Dialogs,
    private appVersion:AppVersion,
    private udid:UniqueDeviceID,
    private secureHTTP: HTTP,
  ) { }
  validateDevice():Observable<boolean[]>{
    let deviceVirtualCheck$ = of(this.device.isVirtual || this.device.serial == "android");
    let rootCheck$:Subject<boolean> = new Subject();
    let verify$ = combineLatest([deviceVirtualCheck$, rootCheck$]);
    this.rootedDeviceCheck(rootCheck$);
    return verify$;
  }
  isHybrid():boolean{
    return (window['cordova']) ? true : false;
  }

  private rootedDeviceCheck(rootCheck$:Subject<boolean>){
    IRoot.isRooted((result: boolean) => {
      if (this.device.platform.toLowerCase() == 'ios') {
        rootCheck$.next(result);
      } else {
        return IRoot.isRootedWithBusyBox((res: boolean) => {
          rootCheck$.next(res);
        }, () => {
          rootCheck$.next(true);
        });
      }
    }, () => {
      rootCheck$.next(true);
    });
  }

  trustSSL(){
    if(this.enableSSLPinning && this.isHybrid()){
        this.secureHTTP.setServerTrustMode("pinned").then(
            (res:any) => console.log("SSL pinned success"),
            (err:any) => console.log("SSL pinned error")
        )
    }
  }

  collectDeviceInfo():Observable<SmartDeviceInfo>{
    const packageName$ = from(this.appVersion.getPackageName());
    const versionNumber$ = from(this.appVersion.getVersionNumber());
    const buildNumber$ = from(this.appVersion.getVersionCode());
    const udid$ = from(this.udid.get());

    return combineLatest([udid$, packageName$, versionNumber$, buildNumber$]).pipe(
      mergeMap(([udid, packageName, versionNumber, buildNumber])=>{
        const deviceInfo:SmartDeviceInfo = {
          os: this.device.platform,
          osVersion: this.device.version,
          udid: udid,
          appVersion: versionNumber,
          buildVersion: buildNumber,
          packageName: packageName,
          deviceId: this.device.uuid,
          modelName: this.device.manufacturer +' '+ this.device.model
        }
        return of(deviceInfo);
      })
    );
  }

  foundRootedDevice(){
    this.dialogs.alert("The deive is not compatable for the application!", "Alert", "Exit")
    .then((value)=> this.exitApp())
    .catch(()=>console.log('no action taken'))
  }

  exitApp(){
    navigator['app'].exitApp();
  }

}
