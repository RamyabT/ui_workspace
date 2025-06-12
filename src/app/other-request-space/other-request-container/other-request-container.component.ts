import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-other-request-container',
  templateUrl: './other-request-container.component.html',
  styleUrls: ['./other-request-container.component.scss']
})
export class OtherRequestContainerComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;

  settingsMenu: any = []
  protected moduleHeaderTop: number = 0;
  protected moduleHeaderHeight: number = 0;


  constructor(
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService) { 
      super();
    }

  ngOnInit(): void {
    this._activeSpaceInfoService.setOrginSpace('other-request-space');

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
      this.settingsMenu.push({serviceCode: "RETAILENABLEBIOMETRIC"}, { serviceCode: "RETAILCHANGEMPIN"},)
    }
  }

  ngAfterViewInit() {
    if (this._device.isMobile()) {
      setTimeout(() => {
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }

    let settingsActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('settingsActionPublisher$', {
      "observable": settingsActionPublisher$.asObservable(),
      "subject": settingsActionPublisher$
    });
  }

  ngOnDestroy(){
   
  }

  openLink(item: any) {
    let service = this._appConfig.getServiceDetails(item?.serviceCode);
    this._router.navigate(service.servicePath, {
      queryParams: {
        serviceCode: item?.serviceCode 
      }
    }); 
   }

}
