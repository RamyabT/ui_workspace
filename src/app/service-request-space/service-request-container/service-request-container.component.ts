import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { CriteriaQuery } from '@fpx/core';
import { BehaviorSubject } from 'rxjs';
import { ServicerequestHomeComponent } from 'src/app/service-request/service-request-home/service-request-home.component';
import { Servicerequestlog } from 'src/app/service-request/servicerequestlog-service/servicerequestlog.model';
import { ServicerequestlogService } from 'src/app/service-request/servicerequestlog-service/servicerequestlog.service';

@Component({
  selector: 'app-service-request-container',
  templateUrl: './service-request-container.component.html',
  styleUrls: ['./service-request-container.component.scss']
})
export class ServiceRequestContainerComponent implements OnInit {
  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  protected moduleHeaderTop: number = 0;
  protected summary: any;
  protected appConstant: any = APPCONSTANTS;
  protected moduleHeaderHeight: number = 0;
  protected accountNavigator: string = '';
  protected activeTabIndex: number = 0;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
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
  servicerequestlog: Servicerequestlog[] | undefined;
  showTemplate =  false;
  highlightMenu: string = '';
  constructor(
    protected activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService,
    private _servicerequestlogService: ServicerequestlogService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.activeSpaceInfoService.setOrginSpace('service-request-space');
    if(!this._device.isMobile()){
      let moduleRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    let notificationData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('notificationData$', {
      "observable": notificationData$.asObservable(),
      "subject": notificationData$
    });

    let mailBoxOffersData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('mailBoxOffersData$', {
      "observable": mailBoxOffersData$.asObservable(),
      "subject": mailBoxOffersData$
    });

    this.checkServiceRequestData();
    let activeModule = this._activeSpaceInfoService.getActiveModule();
    if(this._device.isMobile()) activeModule = this._activeSpaceInfoService.getModule();
    let space = this._activeSpaceInfoService.getActiveSpace();

    if(!activeModule || activeModule == 'home'){
      if(space == 'service-request-space') activeModule = 'service-request';
    }
    this._activeSpaceInfoService.setActiveModule(activeModule as string);
    this.accountNavigator = activeModule as string;

  }
  checkServiceRequestData() {
    this.servicerequestlog = undefined;
    this.showTemplate = false;
    let criteriaQuery = new CriteriaQuery();
    this._servicerequestlogService.findAll(criteriaQuery)().subscribe(
      (res)=> {
        if(res?.data) {
          this.servicerequestlog = res?.data;
        }
      }
    );
  }

  ngAfterViewInit(){
    if(this._device.isMobile()){
      setTimeout(()=>{
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
        this.moduleHeaderHeight = 160;
      });
    }
  }

  onCreate() {
    this.highlightMenu = 'create-request';
    this.showTemplate = true;
    this._router.navigate(['service-request-space','entry-shell','service-request','create-service-request'],{
      queryParams:{
        routeFrom: 'otherModule',
        title:'Create Service Request'
      }
    });
  }

  goBack(){
    this._router.navigate(['home']);
  }

  onActivate(component: ServicerequestHomeComponent) {
    // if(component.chartData && this.showTemplate) this.checkServiceRequestData();
  }
  

}
