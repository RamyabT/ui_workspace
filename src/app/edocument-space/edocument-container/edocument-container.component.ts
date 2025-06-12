import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { defaultRoutes, mobileRoutes } from '../edocument-space-routing.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { eDocumentSpaceManager } from '../edocument-space.manager';
import { Deposits, DepositsSummary } from 'src/app/deposits/deposits-service/deposits.model';
import { AppConfigService } from '@dep/services';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CriteriaQuery } from '@fpx/core';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { APPCONSTANTS } from '@dep/constants';
import { LoansService } from 'src/app/loans/loans-service/loans.service';

@Component({
  selector: 'app-edocument-container',
  templateUrl: './edocument-container.component.html',
  styleUrls: ['./edocument-container.component.scss'],
  providers: [ eDocumentSpaceManager ]
})
export class eDocumentContainerComponent implements OnInit, OnDestroy {

  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected appConstant: any = APPCONSTANTS;

  protected accountNavigator: string = '';
  protected activeTabIndex: number = 0;
  protected moduleHeaderTop: number = 0;
  protected casaAccountsList!: Casaaccount[];
  protected isReceivedAccounts: any = undefined;
  protected noTemplate: boolean = false;

  private tabs = ['edocument', 'deposits', 'loans'];
  protected summary: any;
  highlightMenu: string = '';
  showTemplate: boolean = false;
  depositProducts: any;
  accountDetails: any;
  accountNickName: any;
  casaAccounts!: Casaaccount[];
  navTo: string = '';

  loanAccounts!: Loans[];
  total: string | number = 0;

  constructor( 
    private _router:Router, 
    private _accountSpaceMgr: eDocumentSpaceManager,
    private _appConfig: AppConfigService,
    private route: ActivatedRoute,
    protected activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    this.route.queryParams.subscribe(params => {
      let selecetedIndex: any = params['selecetedIndex'];
      if(selecetedIndex) this.activeTabIndex = selecetedIndex;
      this.navTo = params['navTo'];
      if(this.navTo == 'openNewCasa') {
      }
      if (params['routeFrom'] === 'otherModule') {
        this.checkToHighlightMenu(params);
      }
    });
  }

  private checkToHighlightMenu(params: Params) {
    if (params['serviceCode']) {
      this.highlightMenu = params['serviceCode'];
    }
  }

  onBackNav(){
    this.goBack();
  }

  goBack(){
    this._router.navigate(['home']);
  }
  
  ngOnInit(): void {
    this._appConfig.setData("activeMenuId", 'EDOCUMENTS');


    if(!APPCONSTANTS.requiredAccountsSpaceNavigation){
      APPCONSTANTS.headerNavBackRequired$.next({
        required: false,
        callback: this.onBackNav.bind(this)
      });
    }

    if(!this._device.isMobile()){
      let moduleRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    
    if(!this._device.isMobile()){
      let accountRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('accountRefresh$', {
        "observable": accountRefresh$.asObservable(),
        "subject": accountRefresh$
        
      });
    }


    if(!this._device.isMobile()){
      let deleteRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('deleteRefresh$', {
        "observable": deleteRefresh$.asObservable(),
        "subject": deleteRefresh$
        
      });
    }

    let activeModule = this._activeSpaceInfoService.getActiveModule();
    if(this._device.isMobile()) activeModule = this._activeSpaceInfoService.getModule();
    this.activeTabIndex = this.tabs.indexOf(activeModule as string);
    let space = this._activeSpaceInfoService.getActiveSpace();
    if(!activeModule || activeModule == 'home'){
      if(space == 'edocument-space') activeModule = 'edocument';
    }
    this._activeSpaceInfoService.setActiveModule(activeModule as string);
    this.accountNavigator = activeModule as string;

    
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
  }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
    APPCONSTANTS.headerNavBackRequired$.next({required:false});
    if(this._appConfig.hasData('moduleRefresh$')){
      this._appConfig.getData('moduleRefresh$').subject.unsubscribe();
      this._appConfig.removeData('moduleRefresh$');
    }
  }


  onActivate(component: any) {
    // if(component.checkDeposit && this.showTemplate) this.checkDepositData();
    // else if(component.chartData && this.showTemplate) this.checkAccountData();
  }

}
