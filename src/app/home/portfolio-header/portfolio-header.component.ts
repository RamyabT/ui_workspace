import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { APPCONSTANTS } from '@dep/constants';
import { Router } from '@angular/router';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { AccessScopePipe } from 'src/app/common/pipe/access-scope/access-scope.pipe';

@Component({
  selector: 'portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.scss'],
  providers:[AccessScopePipe]
})
export class PortfolioHeaderComponent implements OnInit {

  helloText: string = "";
  userFullName:string = "";
  appConstant: any;
  showSearchBar: boolean = false;
  public searchText: string = "";
  showSearchOptions: boolean = false;
  protected dataList: any;
  protected serviceList: any;
  public showNoResultsMessage: boolean = false;
  userPanNumber: string = '';
  name: any;
  userName: any;
  @ViewChild('loadMoreStart', { static: false, read: ElementRef }) loadMoreStart!: ElementRef;
  @ViewChild('loadMoreEnd', { static: false, read: ElementRef }) loadMoreEnd!: ElementRef;

  private observerStart: any;
  private observerEnd: any;
  stikcyStart: boolean = false;
  stikcyEnd: boolean = false;
  bannersList: any;
  showAds: boolean = false;
  serviceCode: string = "RETAILDASHBOARD";
  toggleMode: string = 'Dark Mode';
  showClosebtn: boolean = false;
  allowedServices:any;



  constructor(
    private _appConfig: AppConfigService,
    public userAuth: UserAuthService,
    protected device: DeviceDetectorService,
    protected _customerService: CustomerService,
    private _chnageDetectorRef: ChangeDetectorRef,
    private _menuService: CustomMenuService,
    private _router: Router,
    protected _activeSpaceInfoService: ActiveSpaceInfoService,
    private _bannerAdsService: BannerAdsService,
    private _accessScope:AccessScopePipe
  ) { }



  ngOnInit(): void {
    this.showAds = sessionStorage.getItem('portfolioShowAds')? true: false;
    this.serviceCode = this.device.isMobile() ? "RETAILMOBHEADER" : "RETAILDESKHEADER";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //     if(this.bannersList.length > 0) {
    //       this.showAds = true;
    //     }
    //   }
    // });

    this.appConstant = APPCONSTANTS;
    this. helloText = this._appConfig.helloText();
    if(!this.userAuth.getUserAdditionalDetails()){
      this._customerService.fetchUserProfile().subscribe((res:any)=>{
        this.userAuth.setUserAdditionalDetails(res);
        this.name = this.userAuth.getUserAdditionalDetails()?.fullName
        this.userFullName = this.appConstant.showOrganizationName?this.userAuth.organizationName: this.userAuth.getCustomerDetails()?.fullName;
        this.userPanNumber = "••••••••••••" + this.userAuth.getCustomerDetails()?.pan?.substring(this.userAuth.getCustomerDetails()?.pan?.length-4);

      },(err:any)=>{})
    }else{
      console.log('user additional data already available')
      this.userFullName = this.userAuth.getCustomerDetails()?.fullName;
      this.userPanNumber = "••••••••••••" + this.userAuth.getCustomerDetails()?.pan?.substring(this.userAuth.getCustomerDetails()?.pan?.length-4);
    } 
    
    
    this.serviceList = this.device.isMobile() ? 
        APPCONSTANTS.mobEnabledSearchServices : 
        APPCONSTANTS.enabledSearchServices;
    console.log('Available services:', this.serviceList);
    this._menuService.getAllowedServicesReceived$().subscribe((res: any) => {
      this.allowedServices=this._menuService.allowedServices;
      this.serviceList=this.serviceList.filter((item: any) => item.serviceCode in this.allowedServices);
      // this.dataList = this.serviceList;
    })
  }

  close() {
    sessionStorage.removeItem('portfolioShowAds');
    this.showAds = false;
  }
  getUserFullName(): string {
    this.userFullName = this.appConstant.showOrganizationName?this.userAuth.organizationName: this.userAuth.getCustomerDetails()?.fullName;
    return this.userFullName
  }

  getPanNumber(): string {
    this.userFullName = "••••" + this.userAuth.getCustomerDetails()?.pan?.substring(this.userAuth.getCustomerDetails()?.pan?.length-4);
    return this.userFullName
  }

  getUserName(): string {
    if(this.appConstant.showOrganizationName) {
      this.userName = this.userAuth.organizationName?.split(' ')?.[0]?.charAt(0)+this.userAuth.organizationName?.split(' ')?.[1]?.charAt(0);
    }
    else this.userName = this.userAuth.getProfilePicture();

    return this.userName;
  }

  ngAfterViewInit(){
    this.observerStart = new IntersectionObserver(entries => {
      var entry = entries[0];
      if (entry.isIntersecting) {
        this.stikcyStart = false;
      }
      else {
        this.stikcyStart = true;
      }
    }, {
      rootMargin: '0px',
      threshold: 0.9
    });
  
    this.observerStart.observe(this.loadMoreStart.nativeElement);

    this.observerEnd = new IntersectionObserver(entries => {
      var entry = entries[0];
      if (entry.isIntersecting) {
        this.stikcyEnd = false;
      }
      else {
        this.stikcyEnd = true;
      }
    }, {
      rootMargin: '0px',
      threshold: 0.9
    });
  
    this.observerEnd.observe(this.loadMoreEnd.nativeElement);
  }

  gotoService($event: any) {
    this.searchText = "";
    this._appConfig.setData("searchService", $event.serviceCode);
    this.dataList = this.serviceList;
    this._appConfig.removeData("activeTab");
    let service = this._appConfig.getServiceDetails($event.serviceCode);
    if (service?.activeTab) {
      this._appConfig.setData("activeTab", service.activeTab);
    }

    let extras = {};
    if (service.queryParams) {
      extras = {
        queryParams: service.queryParams
      }
    }

    if ($event.serviceCode === "RETAILVIEWCASATRANSACTION" && this.device.isMobile()) {
      this._router.navigate(['accounts-space']);
    }
    else if ($event.serviceCode === "RETAILETRANSFERMANAGECONTACT" || $event.serviceCode === "RETAILMANAGEETRANSFERCONTACT" || $event.serviceCode === "RETAILMANAGEETRANSFERSENDMONEY"
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

    }

    else {
      this._router.navigate(service.servicePath, extras);
    }

    this.showSearchOptions = false;
  }

  toggleProfile() {
    this._customerService.showUserProfile = !this._customerService.showUserProfile;
  }

  closeProfile() {
    this._customerService.showUserProfile = false;
  }

  openSearchBar() {
    this.showSearchBar = true;
    setTimeout(() => {
      const input = document.getElementById("myInput");
      input?.focus();
    }, 0);
  }

  closeSearchWin() {
    this.searchText = "";
    this.showSearchBar = false;
    this.showSearchOptions = false;
    this.showNoResultsMessage = false;
  }

  doServiceSearch($event: any) {
    this.searchText = $event.target.value;
    console.log('Search text:', this.searchText);
    
    if (this.searchText.trim()) {
        this.showSearchOptions = true;
        if (this.serviceList && this.serviceList.length > 0) {
            this.dataList = this.serviceList.filter((item: any) => 
                item.serviceDescription?.toLowerCase().includes(this.searchText.toLowerCase())
            );
            console.log('Filtered results:', this.dataList);
        } else {
            this.dataList = [];
        }
        this.showNoResultsMessage = this.dataList.length === 0;
    } else {
        this.showSearchOptions = false;
        this.dataList = [];
        this.showNoResultsMessage = false;
    }
    this._chnageDetectorRef.detectChanges();
  }

  navToMailbox(){
    this._router.navigate(['service-request-space'])
  }
  
    toggleTheme() {
    console.log('toggleTheme')
    const currentTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentTheme ? 'dark' : 'light');
    this.toggleMode = currentTheme ? 'Light Mode' : 'Dark Mode';
  }

  receivedData($event: any) {
    console.log("RECIEVVED")
    this.showClosebtn = true;
  }

    getProfilePicType(): string {
    this.userName = this.userAuth.getProfilePicture();
    //return !this.userName ? "avatar" : (/(.png)|(.jpg)|(.jpeg)|(.svg)/gi.test(this.userName) ? "pic" : "initial");
    return !this.userName ? "avatar" :  "initial";

  }

  hasScope(serviceCode: string) {
    return this._accessScope.transform(serviceCode);
  }

}
