import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
  CriteriaQuery,
} from "@fpx/core";
import { Observable, every, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, UserAuthService } from "@dep/services";
import { RetailProfilePicUploadFormComponent } from "@app/utility";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import moment from "moment";
import { CustomerinfologService } from "../customerinfolog-service/customerinfolog.service";
import { DeviceDetectorService } from "@dep/core";
import { DocumentIdService } from "../controls/documentId-service/documentId.service";
import { SettingsService } from "src/app/foundation/validator-service/settings.service";

export class RetailMyProfileFormState extends BaseFpxComponentState {
  activeTabIndex: number = 0;
  profileName: string = "";
  lastLogin: string = "";
  failedLogin: string = "";
  profilePicture: string = "";
  update: boolean = false;
  profileDocumentData:any = []
  profileDocData: any[] = [];
}

@Injectable()
export class RetailMyProfileFormHelper extends BaseFpxFormHelper<RetailMyProfileFormState> {
  tempGridLoad: boolean | undefined = false;
  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private documentIdService: DocumentIdService,

    private _appConfig: AppConfigService,
    private _customerService: CustomerService,
    private _settingsService: SettingsService,
    private _customerinfologService: CustomerinfologService,
    public userAuth: UserAuthService,
    private device: DeviceDetectorService
  ) {
    super(new RetailMyProfileFormState());
  }

  override doPreInit(): void {

    let _login = this.userAuth.getUserDetails()?.lastLogin;
    this.state.lastLogin = _login ? moment(_login).format('DD MMM YY, HH:mm:ss') : "-";
    let failedLogin = this.userAuth.getUserDetails()?.lastLoginFailed;
    this.state.failedLogin = failedLogin ? moment(failedLogin).format('DD MMM YY, HH:mm:ss') : "-";

  // this.addShellButton('Edit', 'EDIT', 'primary', 'DISPLAY', 'button');
  // this.setShellBtnMethod('EDIT', this.editProfile.bind(this));
    this._customerService.fetchUserProfile().subscribe({
      next: (res: any) => {
        this.setHidden("profileDetails.customerinfologdetails", true);
        this.state.profileName = res.fullName;
        this._appConfig.setData('profileName',res.fullName);
        this._appConfig.setData('profileSummary',res.profileSummary);
        this._appConfig.setData('language',localStorage.getItem('lang') || "En");
        this.setDisabled("profileDetails.email", true);
        this.setDisabled("profileDetails.mobileNumber", true);
        this.setDisabled("profileDetails.workAddress", true);
        this.setDisabled("profileDetails.residentialAddress", true);
      },
    });
    // if(!this.device.isMobile()) {
      this.removeShellBtn('BACK');
    // }
  }
  backNav() {
    this._router.navigate(['settings-space']);
  }

  editProfile() {
    // this.state.update = true;
    // this.setDisabled("profileDetails.email", false);
    // this.setDisabled("profileDetails.mobileNumber", false);
    // this.setDisabled("profileDetails.workAddress", false);
    // this.setDisabled("profileDetails.residentialAddress", false);
    this._router.navigate(["settings-space",
    "entry-shell",
    "settings",
    "profile-details"]);
  }
  // updateProfile() {
    // this.state.update = false;
    // let payload: any = this.getValue("profileDetails");
    // payload.prooftype = "PDF";
    // payload.proffInventory = "string";
    // this._customerinfologService
    //   .create(payload)()
    //   .subscribe({
    //     next: (res: any) => {
    //       this.setValue("mobileNumber", payload.mobileNumber);
    //       this.setValue("email", payload.email);
    //       this.setValue("residentialAddress", payload.resAddress);
    //       this.setValue("workAddress", payload.workAddress);
    //       this.setDisabled("profileDetails.email", true);
    //       this.setDisabled("profileDetails.mobileNumber", true);
    //       this.setDisabled("profileDetails.workAddress", true);
    //       this.setDisabled("profileDetails.residentialAddress", true);
    //     },
    //   });
  // }

  updateProfileDetails() {}

  public handleFormOnLoad() {
    this.setHidden('profileDocGridGroup',false)
    this.setHidden('emptyProfileDocGroup',true);
    this.setHidden('uploadProfileDocGroup',true);
  }

  onTabChanged(event: any) {
    console.log(event);
    if(event.index == 0){
      this.setDisabled("profileDetails.email", true);
        this.setDisabled("profileDetails.mobileNumber", true);
        this.setDisabled("profileDetails.workAddress", true);
        this.setDisabled("profileDetails.residentialAddress", true);
        this.setHidden('footerButtonContainer',false)
        this.setHidden("profileDetails.customerinfologdetails", true);

    }else{
      this.setHidden('footerButtonContainer',true)
      // this.showSpinner()
      // setTimeout(() => {
      //   this.hideSpinner()
      //   if(!this.tempGridLoad){
      //     this.setHidden('profileDocGridGroup',true)
      //     this.setHidden('emptyProfileDocGroup',false);
      //     this.setHidden('uploadProfileDocGroup',false);
      //   }
      // }, 7000);

      // this.removeShellBtn( 'EDIT');
    }
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
  }
  public override doPostInit(): void {
    this.addControlEventHandler('PROFILEDOCEMITDATA', this.handleProfileDocEmitData,)
    this.handleFormOnLoad();
    
  }

  
  public handleProfileDocEmitData: any = (
    payload: any,
  ) => {
    this.tempGridLoad = true;
    if(payload?.data?.length>0){
      this.setHidden('emptyProfileDocGroup',true);
      this.setHidden('profileDocGridGroup',false);
      if(payload?.data?.length == 1){
        this.setHidden('uploadProfileDocGroup',false);
      }
      this.state.profileDocData = payload?.data
    
    }else{
      this.setHidden('profileDocGridGroup',true)
      this.setHidden('emptyProfileDocGroup',false);
      this.setHidden('uploadProfileDocGroup',false);
    }
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE

    return payload;
  }

  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.beneaedreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        },
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n


  handleProfileDocGridEvent(payload:any){
    this.state.profileDocumentData = payload?.payload?.data || [];
  }

  navToUploadDocScreen(){
    if(this.state.profileDocData?.length !== this._settingsService.totalProfileDocCount && this._settingsService.totalProfileDocCount==2){
      this.showSpinner();
    this.documentIdService.lookup('')().subscribe(docIdData=>{
      this.hideSpinner();
      var final = docIdData?.filter((item:any)=> {
         let temp = this.state.profileDocData?.find((gridData:any)=> {return item?.id == gridData?.id});
         return temp == null?true:false;
      })
      let id = final?.length == this._settingsService.totalProfileDocCount?undefined:final?.[0]?.id
      this.navTo(id);
    })
  }else{
    this.navTo(undefined)
  }
    
  }

  navTo(id:any){
    let sertvice = this._appConfig.getServiceDetails('RETAILUPDATEDOC');
    this._router.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILUPDATEDOC',
        id:id
      }
    })
  }

  updatePhoto(data:any){
    this._appConfig.setData('profilePicture',data.imageData);
    this._router.navigate(['settings-space','display-shell','settings','profile-pic-preview']);
  }
}
