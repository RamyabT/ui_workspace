import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';
import { AppConfigService, UserAuthService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { BehaviorSubject } from 'rxjs';
import { LogoutFeedBackFormComponent } from 'src/app/foundation/logout-feedback-form/logout-feedback-form.component';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;

  settingsMenu: any = []
  protected moduleHeaderTop: number = 0;
  protected moduleHeaderHeight: number = 0;

  constructor(
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService,
    private _nativeStorageMgr: NativeStorageManager,
    private _userService: UserAuthService
  ) { 
      super();
    }

  ngOnInit(): void {
    this._activeSpaceInfoService.setOrginSpace('settings-space');

    this.settingsMenu = [
      {
        serviceCode: "RETAILMANAGEALERTS"
      },
      {
        serviceCode: "RETAILSTNGCHANGEPASSWORD"
      },
      {
        serviceCode: "RETAILVIEWMYPROFILE"
      },
      {
        serviceCode: "MANAGEAUTHDEVICE"
      },
      {
        serviceCode: "RETAILVIEWFXRATES"
      },
      {
        serviceCode: "RETAILMANAGELIMITS"
      }
    ]
    
    if(this._device.isHybrid()){
      this._nativeStorageMgr.loadData("deviceAuthInfo").then(
        (result:any) => {
          let data = JSON.parse(atob(result));
          if(data.userId == this._userService.userId){
            this.settingsMenu.push(
              ...APPCONSTANTS.settingsHybridMenus
            );
          }
        }
      )
    }

    let settingsActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('settingsActionPublisher$', {
      "observable": settingsActionPublisher$.asObservable(),
      "subject": settingsActionPublisher$
    });
  }

  ngAfterViewInit() {
    if (this._device.isMobile()) {
      setTimeout(() => {
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }

  }

  ngOnDestroy(){
   
  }

  openLink(item: any) {
    // if(item?.serviceCode==='RETAILLOGOUTANDFEEDBACK'){
    //   this.openLogoutPopup()
    //   return;
    // }
    let service = this._appConfig.getServiceDetails(item?.serviceCode);
    this._router.navigate(service.servicePath, {
      queryParams: {
        serviceCode: item?.serviceCode 
      }
    }); 
   }

  //  openLogoutPopup(){
  //   let modal = new FpxModal();
  //   modal.setComponent(LogoutFeedBackFormComponent);
  //   modal.setPanelClass('logout-feedback-popup');
  //   modal.setBackDropClass('dep-popup-back-drop');
  //   modal.setDisableClose(false);
  //   modal.setData({
  //     title: "Logout"
  //   });
  //   modal.setAfterClosed(this.contextmenuModelAfterClose);
  //   this.openModal(modal);
  //  }

  //  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  //   console.log("model closed...", payload);
  //   if (payload == 1) {
  //   }
  // }

}
