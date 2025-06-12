import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';
import { NpssCustomerStatus, NpssMainService } from 'src/app/npss/npss-service/npss-main.service';

@Component({
  selector: 'app-npss-container',
  templateUrl: './npss-container.component.html',
  styleUrls: ['./npss-container.component.scss']
})
export class NpssContainerComponent implements OnInit, OnDestroy {

  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  protected moduleHeaderTop: number = 0;
  protected npssDetails: any = undefined;

  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'Quick, <br>Easy, <br>Sure and Digital'
    },
    { 
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg', 
      content: 'Reach financial freedom with tailored investment'
    }, 
    { 
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg', 
      content: '<h4 class="h4">Personal loan</h4> for any purpose'
    }
  ];
  hideCloseBtn: boolean = false;
  
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _npssMainService: NpssMainService,
    private route: ActivatedRoute
  ) { 
    route.queryParams.subscribe((params: any) => {
      if (params && params.nocatch) {
        this.handleFormOnLoad();
      }
  });
  }

  handleFormOnLoad(){
    if (this._appConfig.hasData('npssDetails')) this._appConfig.removeData('npssDetails');

    let npssModuleRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    if(!this._appConfig.hasData('npssModuleRefresh$')){
      this._appConfig.setData('npssModuleRefresh$', {
        "observable": npssModuleRefresh$.asObservable(),
        "subject": npssModuleRefresh$
      });
    }

    this._npssMainService.changeEmitted$.subscribe(text => {
      if (text == 'hide') this.hideCloseBtn = true;
      else this.hideCloseBtn = false;
    });

    this.getNPSSStatus();
  }

  ngOnInit(): void {
    if (!this._device.isMobile()) {
      let moduleRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    this.handleFormOnLoad();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
    });
    this._changeDetectorRef.detectChanges();

    this._appConfig.getData('npssModuleRefresh$').observable.subscribe(
      (res: any) => {
        if (res?.event == "ENTROL_SUCCESS") {
          this.getNPSSStatus();
        }
      });

  }

  getNPSSStatus() {
    this._npssMainService.fetchNpssUserStaus().subscribe({
      next: (res: NpssCustomerStatus) => {
        this.npssDetails = res;
        this._appConfig.setData('npssDetails', res);
        this._appConfig.setData('senderMobileNumber', this.npssDetails.customerDetails?.mobileNumber);
        if (res?.status == 'NR' || res?.status == 'I') {
          if (this._device.isMobile()) {
            this._router.navigate(['npss-space', 'display-shell', 'npss', 'npss-get-start']);
          }
          else {
            this._router.navigate(['npss-space', 'npss', 'npss-get-start']);
          }
        } 
        else if(res?.status == 'A' && this._device.isDesktop()) {
          this._router.navigate(['npss-space', 'entry-shell', 'npss', 'npss-manage-accounts']);
          if(this._appConfig.hasData('moduleRefresh$')) this._appConfig.getData('moduleRefresh$').subject.next({event:"onFormClose"});
        }
      },
      error: (err) => {
        console.log("Fetch npss user status error");
      }
    });
  }

  activateNpss(){
    let service = this._appConfig.getServiceDetails('RETAILCUSTOMERACTIVATION');
    this._router.navigate(service.servicePath);
  }

  ngOnDestroy(): void {
    this._appConfig.removeData('npssDisable');
    this._appConfig.removeData('moduleRefresh$');
  }

}

