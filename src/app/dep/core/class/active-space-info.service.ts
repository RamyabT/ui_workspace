import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { DeviceDetectorService } from '..';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { UserAuthService } from '../../services/user-auth/user-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { AppConstantHelper } from '../../constants/app-constant.helper';
import { APPCONSTANTS } from '@dep/constants';
import { DepositsSummary } from 'src/app/deposits/deposits-service/deposits.model';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ActiveSpaceInfoService {
    private _route: Router = inject(Router);
    private _device: DeviceDetectorService = inject(DeviceDetectorService);
    private _userAuth: UserAuthService = inject(UserAuthService);
    private _translateService: TranslateService = inject(TranslateService);
    private _loginService: TestLoginService = inject(TestLoginService);

    private _appConfig: AppConfigService = inject(AppConfigService);
    private _activeSpace: any = 'welcome'
    private _activeModule: any = 'home';
    private _activeAccount: string = '';
    private _depositAccountType: string = '';
    private depositSecurity: any;

    private _module: string = 'home';

    private _orginSpace: any = 'welcome'
    private _orginModule: any = 'home';

    private _currentModule: string = '';

    public headerRequired: boolean = false;
    public footerMenuRequired: boolean = false;
    public doShowMainMenu: boolean = false;

    public isOnboardingModule: boolean = false;

    private _activeService: string = "";
    private _formTitle: string = "";
    accountType: any;

    public notifySpaceChange$: BehaviorSubject<any> = new BehaviorSubject(null);
    public notifyModuleChange$: BehaviorSubject<any> = new BehaviorSubject(null);
    depositList!: DepositsSummary[];

    public serviceCode: any;

    public shellHeaderRequired: any = true;
    public shellFooterRequired: any = true;
    backServiceCode: any;

    constructor(private location: Location) {
        this._getRouterDetails();
    }

    setOrginSpace(space: string) {
        this._orginSpace = space;
    }

    setActiveSpace(space: string) {
        this._activeSpace = space;
    }
    getActiveSpace() {
        return this._activeSpace;
    }

    setActiveModule(module: string) {
        if (this._activeModule != module) {
            this._activeModule = module;
            this.notifyModuleChange$.next({
                module: module,
                space: this._activeSpace,
                service: this._activeService
            });
        }
    }
    getActiveModule() {
        return this._activeModule;
    }

    setModule(module: string) {
        this._module = module;
    }
    getModule() {
        return this._module;
    }

    setActiveService(service: string) {
        this._activeService = service;
    }
    getActiveService() {
        return this._activeService;
    }

    getActiveFormTitle() {
        return this._formTitle;
    }

    setAccountNumber(accountNumber: string) {
        this._activeAccount = accountNumber;
    }
    getAccountNumber() {
        return this._activeAccount;
    }
    setDepositAccountType(accountType: string) {
        this._depositAccountType = accountType;
    }
    getDepositAccountType() {
        return this._depositAccountType;
    }
    setDepositSecurity(depositSecurity: string) {
        this.depositSecurity = depositSecurity;
    }
    getDepositSecurity() {
        return this.depositSecurity;
    }

    private _getRouterDetails() {
        this._route.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe({
                next: (res) => {
                    let root = this._route.routerState.snapshot.root;
                    let componentData: { [k: string]: string } = {};
                    while (root) {
                        if (root.children && root.children.length) {
                            root = root.children[0];
                        } else if (root.data) {
                            componentData = root.data;
                            break;
                        } else {
                            break;
                        }
                    }

                    let space = componentData['space'] as any || undefined;
                    let module = componentData['module'] as any || undefined;
                    let service = componentData['serviceCode'] as any || undefined;
                    this.backServiceCode = componentData['backServiceCode'] as any || undefined;

                    this.shellHeaderRequired = componentData['shellHeaderRequired'] == undefined ? true : componentData['shellHeaderRequired'];
                    this.shellFooterRequired = componentData['shellFooterRequired'] == undefined ? true : componentData['shellFooterRequired'];
                    this.serviceCode = service;

                    if (this._device.isMobile()) {
                        let _hReq = (APPCONSTANTS?.checkHeaderRequired) ? APPCONSTANTS.checkHeaderRequired(space) : undefined;
                        if (_hReq == undefined) {
                            this.headerRequired = componentData['headerRequired'] as any || false;
                        } else {
                            this.headerRequired = _hReq;
                        }

                        this.footerMenuRequired = componentData['footerMenuRequired'] as any || false;
                        window.scrollTo(0, 0);
                    } else {
                        this.headerRequired = true;
                        this.footerMenuRequired = true;
                        let mainContainer: any = document.getElementById("mainContainer");
                        if (mainContainer) mainContainer.scroll(0, 0);
                        if (!componentData['scrollToBottom']) window.scrollTo(0, 0);
                        if (this._appConfig.hasData('closeContactForm$')) {
                            this._appConfig.getData('closeContactForm$').subject.next({
                                showContactForm: false,
                                showSendMoneyDetails: false,
                                showReceiveMoneyDetails: false,
                                showRequestMoneyDetails: false
                            });
                        }
                        // if (this._appConfig.hasData('showStopChequeDetails$')) {
                        //     this._appConfig.getData('showStopChequeDetails$').subject.next({
                        //         showStopChequeDetails: false
                        //     });
                        // }
                    }

                    if (module == "onboarding") {
                        this.isOnboardingModule = true;
                    } else {
                        this.isOnboardingModule = false;
                    }
                    this.setActiveSpace(space);
                    this.setActiveModule(module);
                },
                error: () => { },
                complete: () => { },
            });
    }

    doTakeSpaceAction() {
        if (this._activeModule == 'staging') {
            // when clicking close button, if it staging mode, we shoud logout application
            this._loginService.logout();
            return;
        }

        if (!this._device.isHybrid() && (this._device.isMobile() || this._activeModule == 'etransfers' || this._activeModule == 'accounts' || this._activeModule == 'transfers' || this._activeModule == 'credit-card')) { // mobile browser app
            this._currentModule = this._activeModule;
            if (this._appConfig.getData('navBack')) {
                this._route.navigate(this._appConfig.getData('navBack'));
                this._appConfig.removeData('navBack');
            } else {
                this.location.back();
            }
            return;
        } else {
            this._currentModule = this._activeModule;
            let queryParams = {};
            let rid = Math.floor(Math.random() * 99999999);

            if (this._activeAccount) {
                queryParams = {
                    rid: rid
                }
            }

            if (this._appConfig.hasData('moduleRefresh$')) {
                let sub = this._appConfig.getData('moduleRefresh$').subject;
                sub.next({ event: 'onFormClose' });
            }
            let path: any = [];
            if (this._orginSpace == this._activeSpace) {
                path = [this._activeSpace];
                if (this._device.isHybrid()) { // hybrid app
                    if (this._activeModule && this.backServiceCode) { // custom nav in same module for hybrid
                        let service = this._appConfig.getServiceDetails(this.backServiceCode);
                        let servicePath = service?.servicePath;
                        this._route.navigate(servicePath, {
                            queryParams: {
                                rid: rid,
                                serviceCode: this.backServiceCode, //RETAILETRANSFERMANAGECONTACT
                            }
                        });
                        this.backServiceCode = undefined;
                        return;
                    }
                    else if (this._activeModule) path = [...path];
                }
                else { // web browser
                    if (this._activeModule) path = [...path, this._activeModule];
                }
            }
            else { // not same space
                path = [this._orginSpace];
            }
            console.log("doTakeSpaceAction", path);


            if (this._activeModule == 'payments') {
                path = ['payments-space/entry-shell/payments/retail-saved-biller-list-ro-grid']
            } else if (this._orginSpace === 'MOBTRANSFERS') {
                path = ['transfers-space']
            }

            this._route.navigate(path, {
                queryParams: queryParams
            });
        }
    }

    public getSpaceHeaderText() {
        let space = this._activeSpace ? this._activeSpace.replace('-', '') : "";
        if (this._activeSpace === 'home') {
            let fullName = APPCONSTANTS.showOrganizationName ? this._userAuth.organizationName : this._userAuth.getCustomerDetails()?.fullName || "Guest";
            let welcomeMsg = this._translateService.instant(this._appConfig.helloText()) + ",";
            let welcomeMsgTag = "<span class=\"hello-txt\">" + welcomeMsg + "</span>";
            let name = APPCONSTANTS.showOrganizationName ? (this._userAuth.getUserAdditionalDetails()?.fullName || "Guest") : '';
            let nameTag = "<span class=\"name\">" + name + "</span>";
            if (APPCONSTANTS.showOrganizationName) {
                welcomeMsgTag = "<div class=\"hello-txt\">" + welcomeMsgTag + ' ' + nameTag + "</div>";;
            }
            let fullNameTag = "<span class=\"full-name\">" + fullName + '.' + "</span>";
            // let fullNameTag = "<span class=\"full-name\">" + fullName + "</span>";
            if (APPCONSTANTS.mainHeader.showPanNumber && this._userAuth.getCustomerDetails()?.pan) {
                welcomeMsg = welcomeMsgTag + fullNameTag + "<span class=\"individual-number\">••••" + this._userAuth.getCustomerDetails()?.pan?.substring(this._userAuth.getCustomerDetails()?.pan?.length - 4) + "</span>"
            }

            return welcomeMsg;
        } else if (this._activeSpace == 'accounts-space') {
            space = this._activeModule;
        }
        return 'SPACE_HEADER.' + space;
    }

    public get onModuleChange(): Observable<any> {
        return this.notifyModuleChange$.asObservable();
    }

    public get onSpaceChange(): Observable<any> {
        return this.notifySpaceChange$.asObservable();
    }
    setAccountType(accountType: any) {
        this.accountType = accountType;

    }
    getAccountType() {
        return this.accountType;

    }

    setdepositList(allDeposits: DepositsSummary[]) {
        this.depositList = allDeposits
    }

    getdepositList() {
        return this.depositList
    }

}

