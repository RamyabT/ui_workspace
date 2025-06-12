import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { AccessScopePipe } from 'src/app/common/pipe/access-scope/access-scope.pipe';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';


@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  providers:[AccessScopePipe]
})
export class MainHeaderComponent  implements OnInit {

  protected _device: DeviceDetectorService = inject(DeviceDetectorService);
  protected _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  protected _customerService: CustomerService = inject(CustomerService);
  protected appConstant: any = APPCONSTANTS;
  protected headerNavBackRequired:boolean = false;
  protected headerNavBackCallback:any;
  
  profileView: boolean = false;
  guestName: string = "";
  imageData: string = '';
  public searchText: string = "";
  showSearchOptions: boolean = false;
  showSearchOptionsList: boolean = false;
  private allowedServices:any;
  protected dataList:any;
  protected serviceList: any;
  public showNoResultsMessage: boolean = false;
  userName: string = '';
  toggleMode: string = 'Dark Mode';

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(protected userAuth: UserAuthService,
    private _chnageDetectorRef: ChangeDetectorRef,
    private _menuService: CustomMenuService,
    private _appConfig: AppConfigService,
    private _router: Router,
    private _accessScope: AccessScopePipe
  ) {
  }
  getUserName(): string {
    if (this.appConstant.showOrganizationName) {
      this.userName = this.userAuth.organizationName?.split(' ')?.[0]?.charAt(0)?.toUpperCase() + this.userAuth.organizationName?.split(' ')?.[1]?.charAt(0)?.toUpperCase();
    }
    else this.userName = this.userAuth.getProfilePicture();

    return this.userName;
  }

  ngOnInit(): void {
    APPCONSTANTS.headerNavBackRequired$.asObservable().subscribe({
      next: (res: any) => {
        this.headerNavBackRequired = res.required;
        this.headerNavBackCallback = res?.callback || undefined;
      }
    });

    this.serviceList = APPCONSTANTS.enabledSearchServices;
    // this.dataList = this.serviceList;
    
    this._menuService.getAllowedServicesReceived$().subscribe((res: any) => {
      this.allowedServices=this._menuService.allowedServices;
      this.serviceList=this.serviceList.filter((item: any) => item.serviceCode in this.allowedServices);
      this.dataList = this.serviceList;
    })
    this.guestName = this.userAuth.guestName;
    if(!this.userAuth.getUserAdditionalDetails()){
      this._customerService.fetchUserProfile().subscribe((res:any)=>{
        this.userAuth.setUserAdditionalDetails(res);
      },(err:any)=>{})
    }else{
      console.log('user additional data already available')
    }
    
  }

  getProfilePicType(): string {
    this.userName = this.userAuth.getProfilePicture();
    return !this.userName ? "avatar" : (/(.png)|(.jpg)|(.jpeg)|(.svg)/gi.test(this.userName) ? "pic" : "initial");
  }
  
  toggleProfile() {
    this._customerService.showUserProfile = !this._customerService.showUserProfile;
  }

  doServiceSearch($event: any) {
    this.searchText = $event.target.value;
    this.showSearchOptionsList = this.searchText.length > 0;
    this.dataList = this.serviceList.filter((item: any) => 
        item.serviceDescription.toLowerCase().match(this.searchText.toLowerCase())
    );
    this._chnageDetectorRef.detectChanges();
    this.showNoResultsMessage = this.dataList.length === 0 ? true : false;
  }

  onFocusSearchText() {
    // this.showNoResultsMessage = this.dataList.length === 0 ? true : false;
    this.showSearchOptions = true;
  }
  onBlurSearchText(){
    this.showSearchOptions = false;
  }
  handleTabOnInput(event: any){
    if (event.key === 'Tab' || event.key === 'Escape'){
      this.showSearchOptions = false;
      this.showSearchOptionsList=false;
      event.target.value='';
      event.target.blur();
    }
  }

  gotoService($event: any) {
    console.log($event)
    this.searchText = "";
    this._appConfig.setData("searchService", $event.serviceCode);
    this.dataList = this.serviceList;
    this._appConfig.removeData("activeTab");
    let service = this._appConfig.getServiceDetails($event.serviceCode);
    console.log(service)
    if (service.activeTab) {
      this._appConfig.setData("activeTab", service.activeTab);
    }

    let extras = {};
    if (service.queryParams) {
      extras = {
        queryParams: service.queryParams
      }
    }
     
    if ($event.serviceCode === "RETAILETRANSFERMANAGECONTACT" || $event.serviceCode === "RETAILMANAGEETRANSFERCONTACT" || $event.serviceCode === "RETAILMANAGEETRANSFERSENDMONEY"
      || $event.serviceCode === "RETAILMANAGEETRANSFERREQUESTMONEY" || $event.serviceCode === "ETRANSFERS"
      || $event.serviceCode === "GETETRFAUTODEPOSIT" || $event.serviceCode === "RETAILETRANSFERREGISTRATIONEDIT") {

      let queryParams: any = {
        serviceCode: $event.serviceCode,
        throughSearch: true
      }

      if ($event.serviceCode === "RETAILETRANSFERREGISTRATIONEDIT") {
        queryParams.mode = 'M'
      }
      
      this._router.navigate(service.servicePath, {
        queryParams: queryParams
      });

    } else {
      this._router.navigate(service.servicePath, extras);
    }

    this.showSearchOptions = false;
  }

  closeSearchWin() {
    this.searchText = '';
    this.dataList = this.serviceList;
    this.showSearchOptions = false;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.showSearchOptions) {
        this.searchInput.nativeElement.blur();
        this.showSearchOptions = false;
    }
  }

  navToMailBox(){
    this._router.navigate(['service-request-space']);
    this._appConfig.setData("activeMenuId", "HOME");
  }

  toggleTheme() {
    console.log('toggleTheme')
    const currentTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentTheme ? 'dark' : 'light');
    this.toggleMode = currentTheme ? 'Light Mode' : 'Dark Mode';
  }

  hasScope(serviceCode: string) {
    return this._accessScope.transform(serviceCode);
  }

}
