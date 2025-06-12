import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, UserAuthService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import moment from 'moment';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { LogoutFeedBackFormComponent } from 'src/app/foundation/logout-feedback-form/logout-feedback-form.component';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { MainFooterComponent } from '../components/main-footer/main-footer.component';
import { DepSessionAlertComponent } from 'src/app/dep/core/component/dep-session-alert/dep-session-alert.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseFpxFunctionality implements OnInit {
  protected _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  userFullName:string = "";
  lastLogin:string="";
  lastLoginDate:string="";
  lastLoginTime:string="";
  lastFailedLogin: any;
  protected appConstant: any = APPCONSTANTS;
  userName?: string;
  toggleValue : boolean = false;
  isProfilePicLoaded: boolean = false;
  hasProfilePicture: boolean = false;

  constructor(
    protected _customerService: CustomerService,
    protected userAuth: UserAuthService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _loginService: TestLoginService,
    public device: DeviceDetectorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.toggleValue = (localStorage.getItem('theme') == 'dark')? true:false;
    this.lastLogin = moment(this.userAuth.getUserDetails()?.lastLogin).format('DD MMM YYYY | hh:mm A');
    this.lastLoginDate = moment(this.userAuth.getUserDetails()?.lastLogin).format('DD MMM YYYY');
    this.lastLoginTime = moment(this.userAuth.getUserDetails()?.lastLogin).format('hh:mm A');

    this.lastFailedLogin = moment(this.userAuth.getUserDetails()?.lastLoginFailed).format('DD MMM YYYY | hh:mm A');
    if(APPCONSTANTS.showOrganizationName) {
      this.userFullName = this.userAuth.organizationName;
      this.userName = this.userAuth.organizationName?.split(' ')?.[0]?.charAt(0)?.toUpperCase()+this.userAuth.organizationName?.split(' ')?.[1]?.charAt(0)?.toUpperCase();
    }
    else {
      this.userFullName = this.userAuth.getCustomerDetails()?.fullName;
      this.userName = this.userAuth.getProfilePicture();
    }
  }

  getUserFullName(): string {
    if(APPCONSTANTS.showOrganizationName) {
      this.userFullName = this.userAuth.organizationName;
    }
    else {
      this.userFullName = this.userAuth.getCustomerDetails()?.fullName;
    }    
    return this.userFullName;
  }

  getUserName(): string {
    this.userName = this.userAuth.getProfilePicture();
    return this.userName;
  }
  
  getProfilePicType(): string {
    this.userName = this.userAuth.getProfilePicture();
    return !this.userName ? "avatar" : (/(.png)|(.jpg)|(.jpeg)|(.svg)/gi.test(this.userName) ? "pic" : "initial");
  }

  navtoModule(module: string) {
    this._customerService.showUserProfile = false;
    let serviceCode = module;
    if (module === "LOGOUT") {
      this.onLogout();
      return;
    }
    else if (module == "REACHUS") {
      if (this.device.isMobile()) {
        this.openReachUsPopup();
      }
    }

    let service = this._appConfig.getServiceDetails(serviceCode);
    // this._appConfig.activeMenuId = service.serviceCode;
    this._appConfig.setData("activeMenuId", service.serviceCode);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        serviceCode: serviceCode,
      },
    });
  }
  
  openReachUsPopup(){
      let modal = new FpxModal();
      modal.setComponent(MainFooterComponent);
      modal.setPanelClass('full-view-popup');
      modal.setBackDropClass(['contact-us-popup-drop']);
      modal.setDisableClose(false);
      // modal.setData({title: "Logout"});
      // modal.setAfterClosed(this.logoutModelAfterClose);
      this.openModal(modal);
  } 

  onLogout() {
    // need flag
    if (APPCONSTANTS.promptLogoutConfirmation) {
      let modal = new FpxModal();
      modal.setComponent(DepConfirmationComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'bottom-transparent-overlay']);
      modal.setDisableClose(false);
      modal.setData({
        message: 'LogoutPopup.message',
        confirmationIcon: 'logout',
        okBtnLbl: 'LogoutPopup.okBtnLbl',
        cancelBtnLbl: 'LogoutPopup.cancelBtnLbl'
      });
      modal.setAfterClosed(this.logoutModelAfterClose);
      this.openModal(modal)
    } else {
      if (APPCONSTANTS.requestLogoutFeedback) {
        this.requestLogoutFeedback();
      } else {
        this._loginService.logout();
      }
    }

    // let modal = new FpxModal();
    // modal.setComponent(DepSessionAlertComponent);
    // modal.setPanelClass("dep-alert-popup");
    // modal.setBackDropClass(["dep-popup-back-drop", "session-backdrop"]);
    // modal.setDisableClose(false);
    // modal.setData({
    //   message: "DepSessionAlert.message",
    //   sessionTimeout: true
    // });
    // modal.setDisableClose(true);
    // // modal.setAfterClosed(this.flashCardModelAfterClose);
    // this.openModal(modal);


    // let modal = new FpxModal();
    // modal.setComponent(DepSessionAlertComponent);
    // modal.setPanelClass("dep-alert-popup");
    // modal.setBackDropClass(["dep-popup-back-drop", "session-backdrop", 'bottom-transparent-overlay']);
    // modal.setDisableClose(false);
    // modal.setData({
    //   // title: "DepSessionAlert.title",
    //   message: "DepSessionAlert.message"
    // });
    // modal.setDisableClose(true);
    // // modal.setAfterClosed(this.flashCardModelAfterClose);
    // this.openModal(modal);
  }

  requestLogoutFeedback() {
    if (this.userAuth.getUserAdditionalDetails()?.logoutFeedbackRequired == '1') {
      let modal = new FpxModal();
      modal.setComponent(LogoutFeedBackFormComponent);
      modal.setPanelClass('logout-feedback-popup');
      modal.setBackDropClass('dep-popup-back-drop');
      modal.setDisableClose(false);
      modal.setData({ title: "Logout" });
      modal.setAfterClosed(this.logoutFeedbackModalAfterClose);
      this.openModal(modal);
    } else {
      this._loginService.logout();
    }
  } 

  logoutModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload === 1 && APPCONSTANTS.requestLogoutFeedback) {
      this.requestLogoutFeedback();
    } else if (payload === 1 && !APPCONSTANTS.requestLogoutFeedback) {
      this._loginService.logout();
    }
  }

  logoutFeedbackModalAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
     this._loginService.logout();
  }
  
  toggleTheme() {
    console.log('toggleTheme')
    this.toggleValue = !this.toggleValue;
    const currentTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentTheme ? 'dark' : 'light');
  }

}
