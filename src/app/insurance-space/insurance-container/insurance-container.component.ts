import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { APPCONSTANTS } from '@dep/constants';
import { InsuranceSpaceManager } from '../insurance-space.manager';
import { InsurancesummaryService } from 'src/app/insurance/insurance-summary-service/insurancesummary.service';
import { insurance } from 'src/app/insurance/insurance-summary-service/insurancesummary.model';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-insurance-container-space',
  templateUrl: './insurance-container.component.html',
  styleUrls: ['./insurance-container.component.scss'],
  providers: [InsuranceSpaceManager]
})
export class InsuranceContainerComponent implements OnInit {
  insuranceSummary: any = [];
  private tabs = ['newInsurance', 'activeInsurance'];
  protected summary: any;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected appConstant: any = APPCONSTANTS;
  protected accountNavigator: string = '';
  toggleActionsMap: { [index: number]: boolean } = {};
  toggledIndex: number | null = null;
  checkedIndex: number | null = null;
  showTemplate: boolean = false;
  insuranceStatus:string='';


  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  protected activeTabIndex: number = 0;

  protected moduleHeaderTop: number = 0;
  initialLoad: any = false;
  constructor(protected _device: DeviceDetectorService, private _appConfig: AppConfigService, private _router: Router, private _insurancesummary: InsurancesummaryService,
    private _insuranceSpaceMgr: InsuranceSpaceManager,
    private route: ActivatedRoute,
    private _commonService: CommonService) {
  }

  ngOnInit(): void {
    this.fetchInsuranceSummary();
    let insuranceActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('insuranceActionPublisher$', {
      "observable": insuranceActionPublisher$.asObservable(),
      "subject": insuranceActionPublisher$
    });
    if (!APPCONSTANTS.requiredInsuranceSpaceNavigation) {
      APPCONSTANTS.headerNavBackRequired$.next({
        required: true
      });
    }

    if (!this._device.isMobile()) {
      let moduleRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    let activeModule = this._activeSpaceInfoService.getActiveModule();
    if (this._device.isMobile()) activeModule = this._activeSpaceInfoService.getModule();
    this.activeTabIndex = this.tabs.indexOf("newInsurance");
    let space = this._activeSpaceInfoService.getActiveSpace();
    if (!activeModule || activeModule == 'insurance') {
      if (space == 'insurance-space') activeModule = 'insurance';
    }
    this._activeSpaceInfoService.setActiveModule(activeModule as string);
    this.accountNavigator = activeModule as string;
  }

  onActivate(component: any) { }

  insuranceRegistration() {

    sessionStorage.setItem('insurancelist', "true");
    this._router.navigate([
      "insurance-space",
      "entry-shell",
      "insurance",
      "insurance-registration-form"
    ]);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });

  }

  toggleContextActions(index: number): void {
    if (this.toggledIndex === index) {
      this.toggledIndex = null;
    } else {
      this.toggledIndex = index;
    }
  }

  checkedContextActions(index: number): void {
    if (this.checkedIndex === index) {
      this.checkedIndex = null;
    } else {
      this.checkedIndex = index;
    }
  }

  onTabChanged($event: any): void {
    this.activeTabIndex = $event.index;
    this.showTemplate = false;
    let module = this.tabs[$event.index];
    if (module == 'insurance') {
      this._activeSpaceInfoService.setAccountNumber('');
    }
    if (this._device.isMobile()) this._activeSpaceInfoService.setModule(module as any);
    else {
      this._activeSpaceInfoService.setActiveModule(module as string);
      this.accountNavigator = module;
      if(module == "activeInsurance"){
      let serviceCode = 'RETAILINSURANCEDETAILS';
        let servicePath: any = this._appConfig.getServiceDetails(serviceCode).servicePath;
        this._router.navigate(servicePath);
      }else{
      this._router.navigate([this._activeSpaceInfoService.getActiveSpace(), this.accountNavigator]);
      }
    }
  }

  fetchInsuranceSummary() {
    this._insurancesummary.fetchInsuranceSummary().subscribe({
      next: (res: any) => {
        this.insuranceSummary = res;
        this._appConfig.setData('insuranceId', this.insuranceSummary?.[0].insuranceId);
        this.insuranceStatus = this.insuranceSummary?.[0].status;
      },
      error: (error: any) => {

      }
    })
  }

}
