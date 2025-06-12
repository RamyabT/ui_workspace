import { inject, Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed, RoutingInfo } from "@fpx/core";
import moment from 'moment';
import { AppConfigService, UserAuthService } from '@dep/services';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { Router } from "@angular/router";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { DeviceDetectorService } from '@dep/core';
import { APPCONSTANTS } from "@dep/constants";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { LogoutFeedBackFormComponent } from "src/app/foundation/logout-feedback-form/logout-feedback-form.component";
import { MainFooterComponent } from "../components/main-footer/main-footer.component";
import { SkinManager } from "src/app/dep/ui/skin.manager";
import { FormControlStatus, FormGroup } from "@angular/forms";

export class UserprofileFormState extends BaseFpxComponentState {
    userFullName:string = "";
    lastLogin:string = "";
    lastFailedLogin:string = "";
    isDarkmode:String = "";
    switchTheme:any = {
        ckValues:{checked:true,unchecked:false}
    }
}

@Injectable()
export class UserprofileFormHelper extends BaseFpxFormHelper<UserprofileFormState> {
    

    constructor(
            private _dialogRef: MatDialogRef<any>,
            @Inject(MAT_DIALOG_DATA) private _dialogData: any,
            protected _customerService: CustomerService,
            public userAuth: UserAuthService,
            private _router: Router,
            private _appConfig: AppConfigService,
            private _loginService: TestLoginService,
            public device: DeviceDetectorService,
            private skinManager:SkinManager = inject(SkinManager)
        ) {
            super(new UserprofileFormState());
        }

        override doPostInit(): void {
            this.state.userFullName = this.userAuth.getUserAdditionalDetails()?.fullName;
            this.state.lastLogin = moment(this.userAuth.getUserDetails()?.lastLogin).format('DD MMM YYYY | hh:mm A');
            this.state.lastFailedLogin = moment(this.userAuth.getUserDetails()?.lastLoginFailed).format('DD MMM YYYY | hh:mm A');
            this.addValueChangeHandler('switchTheme', this.handleSwitchThemeChange);
            this.setValue('switchTheme', this.skinManager.isDarkMode());
            // if(this.skinManager.isDarkMode()){
            //     this.setValue('switchTheme', true);
            // }
        }

        handleSwitchThemeChange: BaseFpxChangeHandler = (
            name: string,
            status: FormControlStatus,
            value: any,
            formGroup: FormGroup
          ) => {
                if(value == true){
                  this.state.isDarkmode = "dark";
                  this.skinManager.applyTheme(this.state.isDarkmode);
                }else if(value == false){
                  this.skinManager.resetTheme();
                }                                
          }

        navtoModule(module: string) {
            this._customerService.showUserProfile = false;
            let serviceCode = module;
            if (module === "LOGOUT") {
              this.onLogout();
              return;
            }
            else if(module == "REACHUS") {
              this.openReachUsPopup();
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
              modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop']);
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

}