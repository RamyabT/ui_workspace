import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointService } from '@dep/core';
import { SmartDeviceInfo, SmartDeviceService } from '@smart-device';

declare let window:any;

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService implements OnDestroy {
  private deviceInfo!:DeviceInfo;
  private screen: 'large' | 'medium' | 'small' = 'large';
  private channel: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  private isPortrait: boolean = false;
  private smartDeviceInfo!:SmartDeviceInfo;
  private channelStyleClass:string = '';
  
  browserName: string = '';
  browserVersion: string = '';
  os: string = '';
  osVersion: string = '';

  constructor(
    private breakpointService:BreakpointService,
    private smartDevice:SmartDeviceService,
  ) { }
  
  async initialize(resolve:any, reject:any){
    if(this.isHybrid()){
      this.smartDevice.validateDevice().subscribe({
        next: ([isVirtual, isRooted]) => {
          if(isVirtual || isRooted){
            this.smartDevice.foundRootedDevice();
            reject();
          } else {
            this.smartDevice.trustSSL();
            this.smartDevice.collectDeviceInfo().subscribe({
              next: (deviceInfo) => {
                this.smartDeviceInfo = deviceInfo;
                this.prepareDeviceInfo(resolve, reject);
              }
            });
          }
        }
      });
    } else {
      this.prepareDeviceInfo(resolve, reject);
    }
  }

  prepareDeviceInfo(resolve:any, reject:any){
    this.breakpointService.registerChannelChange(this);
    this.breakpointService.registerOrientationChange(this);
    const agent = window.navigator.userAgent;
    this.setDeviceInfo(agent);
    resolve(true);
  }

  ngOnDestroy(): void {
    this.breakpointService.unregisterChannelChange(this);
    this.breakpointService.unregisterOrientationChange(this);
  }

  notifyScreenResize(){
    this.screen = (this.breakpointService.useMobileStyle) ? 'small' : (this.breakpointService.useTabletStyle ) ? 'medium' : 'large';
    this.channel = (this.breakpointService.useMobileStyle) ? 'mobile' : (this.breakpointService.useTabletStyle ) ? 'tablet' : 'desktop';
    this.applyChannelToRootDOM(this.screen);
  }

  notifyOrientationChange(isPortrait:boolean){
    this.isPortrait = isPortrait;
    this.applyOrientationToRootDOM();
  }

  setDeviceInfo(ua: string) {
    this.browserName = this.detectBrowserName(ua);
    this.browserVersion = this.detectBrowserVersion(ua);
    this.os = this.detectPlatform(ua);
    this.osVersion = this.detectPlatformVersion(ua, this.os);

    let deviceInfo: DeviceInfo = {
      browserName: this.browserName,
      browserVersion: this.browserVersion,
      os: this.os,
      osVersion: this.osVersion,
      userAgent: window.navigator.userAgent,
      isHybrid: this.isHybrid(),
      screen: this.screen,
      orientation: this.isPortrait ? 'portrait' : 'landscape',
      channel: this.channel
    }
    if(!this.isHybrid()){
      deviceInfo.deviceId = window["browserFingerprint"]
    }
    this.deviceInfo = deviceInfo;

    this.applyPlatformToRootDOM();
  }

  getDeviceInfo(): DeviceInfo {
    let deviceInfo = Object.assign(this.deviceInfo, this.smartDeviceInfo);
    return deviceInfo;
  }

  isDesktop():boolean{
    return this.screen == 'large';
  }
  isTablet():boolean{
    return this.screen == 'medium';
  }
  isMobile():boolean{
    return this.screen == 'small';
  }
  isPortraitOrientation():boolean{
    return this.isPortrait;
  }
  isHybrid():boolean{
    return (window['cordova']) ? true : false;
  }

  private detectBrowserName(ua:string):string {
    const agent = ua.toLocaleLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  private detectBrowserVersion(agent:string):string {
    var userAgent = agent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }

  private detectPlatform(agent:string):string {
    var os: string = 'unknown';
    var clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Chrome OS', r: /CrOS/ },
      { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(agent)) {
        os = cs.s;
        break;
      }
    }
    return os;
  }

  private detectPlatformVersion(agent:string, os:string):string {
    var osVersion: any = 'unknown';
    if (/Windows/.test(os)) {
      let _osVersion: any = /Windows (.*)/.exec(os);
      osVersion = _osVersion[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS':
      case 'Mac OS X':
      case 'Android':
        let _osVersion: any = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(agent)
        osVersion = _osVersion[1];
        break;
      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(agent);
        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
        break;
    }

    return osVersion;
  }

  applyChannelToRootDOM(channel:string){
    let htmlEl:any = document.getElementsByTagName('html')[0];
    let newStyleClassName:string = channel + '-screen';
    try{
      htmlEl.classList.remove(this.channelStyleClass + '-screen').add(newStyleClassName);
    }catch(error){
      htmlEl.classList.add(newStyleClassName);
    }
    this.channelStyleClass = channel;

    this.applyPlatformToRootDOM();
  }

  applyOrientationToRootDOM(){
    let htmlEl:any = document.getElementsByTagName('html')[0];
    try{
      if(this.isPortrait){
        htmlEl.classList.add('portrait-oriendation');
      } else {
        htmlEl.classList.remove('portrait-oriendation');
      }
    } catch(error){
      console.log('No action required');
    }
  }

  applyPlatformToRootDOM(){
    let htmlEl:any = document.getElementsByTagName('html')[0];
    htmlEl.setAttribute('os', this.os.toLowerCase());
    if(this.isHybrid()) htmlEl.setAttribute('hybrid', 'true');
    else htmlEl.removeAttribute('hybrid');
  }

}

export interface DeviceInfo {
  browserName: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  userAgent: string;
  isHybrid: boolean;
  screen: 'large' | 'medium' | 'small';
  orientation: 'portrait' | 'landscape';
  deviceId?: string;
  appVersion?: string;
  buildVersion?: string;
  packageName?: string;
  fcmToken?: string;
  modelName?:string;
  channel?: 'desktop' | 'tablet' | 'mobile'
}
