import { inject, Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable, Subject } from "rxjs";
import { FPXAuthService, HttpRequest, IHttpSuccessPayload } from "@fpx/core";
import { JSEncrypt } from 'jsencrypt';
import { APPCONSTANTS } from "@dep/constants";
import { DepHttpConfig } from "../DepHttpConfig.service";

@Injectable({
  providedIn: "root",
})
export class UserAuthService extends FPXAuthService {

  guestName: string = "";
  userId: string = "";
  customerId: string = "";
  username: string = "";
  private cifAccounts!:CIFAccount[];

  accessDenied: boolean = false;

  private _profilePicture:string = '';
  userDetails: any;
  organizationName: any;
  customerDetails: any;

  override get getAuthDetails(): any {
    return this.getToken
  }
  getToken(): string {
    return this.token;
  }
  authDetails: any;
  private _loginUserInfo: any;
  userInfoSub$: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);
  userInfo$: Observable<UserInfo | null> = this.userInfoSub$.asObservable();
  private _authorizationDetails: any;
  private _userAdditionalDetails: any;

  get token(): string {
    return sessionStorage.getItem("token") ?? "";
  }

  getUserDetails(): UserDetails {
    return this.userDetails ?? "{}";
  }

  constructor(
    private _router: Router,
    private _depHttpConfig: DepHttpConfig
  ) {
    super();
    let token: string = "undefined";
    if(sessionStorage.getItem('isOktaLogin') == "true") {
      if(this._depHttpConfig.commonHeaderParam.get('accesstoken') && this._depHttpConfig.commonHeaderParam.get('accesstoken') != 'undefined'){
        token = this._depHttpConfig.commonHeaderParam.get('accesstoken') as string;
      }
    } else {
      if(this._depHttpConfig.commonHeaderParam.get('token') && this._depHttpConfig.commonHeaderParam.get('token') != 'undefined'){
        token = this._depHttpConfig.commonHeaderParam.get('token') as string;
      }
    }
    if(token && token != 'undefined'){
      this.decodeJwt(token);
    }
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
  get isLogoShow():boolean{
    return true
  }

  setCustomerDetails(res: any) {
    this.customerDetails = res;
    this.customerDetails.fullName = res.firstName + ' ' + res.lastName;
    this.customerDetails.photo = this.customerDetails.fullName?.split(' ')?.[0]?.charAt(0)?.toUpperCase()+this.customerDetails.fullName?.split(' ')?.[this.customerDetails.fullName?.split(' ').length-1]?.charAt(0)?.toUpperCase();
    this.setProfilePicture(this.customerDetails?.photo);
  }

  getCustomerDetails() {
    return this.customerDetails;
  }

  public encryptPassword(password: string): string {
    try {
      let salt =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA32rpoAO6Obi/4kydkyqHTd5Co5vfXatm/hTBlUVy66hlHpINiyHWcQUlRpPka0YLB4oEReccCzfJT37+CJ6riJ48wefEslNf2wNFuuBMbykSk4dp6XF+RvbL2Lo6aGhr+ZvSKRDx63OgCp2tarFbbo6WEXQx1HTGTl0A3i8mX02VlHpZMK9m3xSg5XYnEpRUMuGUHJQuhafrRAybPkoAQBrH88Y27os2F+M1cp8OYWUeEo+SRlkVSaWPgauZ6IXwmX5lL6J2dQHQZowHqy6IiYk0bCXsHHCcYBLHeW25wlCqKvstUN/Fud1B/IYBp845rh8bGOZEz4oXjpCm1S09oQIDAQAB";
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(salt);
      let enc = encrypt.encrypt(password);
      return enc as string;
    } catch (error) {
      console.error("Password invalid");
      return "";
    }
  }

  public setUserDetails(loginauth: any) {
    if(sessionStorage.getItem('isOktaLogin') == 'true') {
      this.userDetails = loginauth;
      this.decodeJwt(loginauth.idToken);
    } else {
      sessionStorage.setItem("token", loginauth.authToken);
      this.userDetails = loginauth;
      this.decodeJwt(loginauth.authToken);
    }
  }

  public setUserAdditionalDetails(userAdditionalDetails: any) {
    this._userAdditionalDetails = userAdditionalDetails;
    if(APPCONSTANTS.mainHeader.showUserAvator) {
      // showing default avator if no photo
      if(!userAdditionalDetails?.photo || userAdditionalDetails?.photo === '' || !/(.png)|(.jpg)|(.jpeg)|(.svg)/gi.test(userAdditionalDetails?.photo)){
        // userAdditionalDetails.photo = './assets/images/avatar.svg';
        this.setProfilePicture(userAdditionalDetails.photo);
      }
    }
    else { 
      // showing default first char and second char
      //userAdditionalDetails.photo = userAdditionalDetails.fullName?.split(' ')?.[0]?.charAt(0)?.toUpperCase()+userAdditionalDetails.fullName?.split(' ')?.[1]?.charAt(0)?.toUpperCase();
      // this.customerDetails.photo = userAdditionalDetails.photo;
    }
  
  }

  public getUserAdditionalDetails() {
  return this._userAdditionalDetails;
  }

  public setProfilePicture(profilePicture:string){
    this._profilePicture=profilePicture;
  }
  public getProfilePicture(){
    return this._profilePicture;
  }
  
  public clearUserAdditionalDetails() {
     this._userAdditionalDetails = undefined;
  }

  public logout(navToLogin: boolean = true) {
    // sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.clearUserAdditionalDetails();
    if(navToLogin) {
      this._router.navigate(["welcome"]);
    }
  }

  decodeJwt(token: string) {
    if (token && token != "") {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      this._loginUserInfo = JSON.parse(jsonPayload);
      this.userInfoSub$.next(this._loginUserInfo);
      if(sessionStorage.getItem('isOktaLogin') == 'true') {
        this._authorizationDetails = this._loginUserInfo;
        // this.guestName = this._loginUserInfo.fname + ' ' + this._loginUserInfo.lname;
        this.username = this._loginUserInfo?.currentAuthPAN;
        sessionStorage.setItem("username", this.username);
        this.userId = this.getAuthorizationAttr('currentAuthPAN');
      } else {
        this._authorizationDetails = (this._loginUserInfo?.authorization_details)? this._loginUserInfo.authorization_details[0] : {};
        this.guestName = this._loginUserInfo.fname + ' ' + this._loginUserInfo.lname;
        this.username = this._loginUserInfo?.sub;
        sessionStorage.setItem("username", this.username);
        this.userId = this.getAuthorizationAttr('UserId');
      }
      
      return this._loginUserInfo;
    }
    return;
  }

  public getLoginUserInfo(): UserInfo {
    return this._loginUserInfo;
  }

  public getPermissions(): any {
    return this.getAuthorizationAttr("Permissions");
  }

  public getAuthorizationAttr(attribute: string): any {
    return this._authorizationDetails[attribute];
  }

  public getFirstName(){
    return this._loginUserInfo.fname;
  }

  public setCIFAccounts(cifAccounts:CIFAccount[] ){
      this.cifAccounts = cifAccounts;
  }

  get getCIFAccounts():CIFAccount[]{
    return this.cifAccounts || [];
  }
  
}

export interface UserDetails {
  lastLoginFailed: any;
  lastLogin: string;
  inventoryNumber: string;
  twoFactor: TwoFactor;
  authToken: string;
  expires_in: string;
  userId: string;
  refreshToken: string;
  sub: string;
}

export interface CIFAccount {
  customerCode: string;
  customerName: string;
}
export interface TwoFactor {
  mobile: string;
  email: string;
}

export interface UserInfo {
  rolecode: string;
  ForcedPasswordChangeContext: boolean;
  role: string;
  CBD: string;
  PreTfaContext: boolean;
  dateFormat: string;
  user_name: string;
  iss: string;
  useragent: string;
  customerCode: string;
  lastLoginDate: string;
  P_BRANCH_NAME: string;
  baseCurrency: string;
  otpPrefernce: string;
  userTicket: string;
  P_USER_TFA_REQD: string;
  LoginContext: boolean;
  P_PWD_RESET: string;
  PreLoginContext: boolean;
  bouser: string;
  Entity_Type: string;
  userip: string;
  roletype: string;
  CC: string;
  loginDateTime: string;
  userId: string;
  customerName: string;
  branchCode: string;
  access_token: string;
  expiresin: string;
  fouser: string;
  customerPrefix: string;
  ENTITY_CODE: string;
  refreshToken: string;
  sub: string;
  name?: string;
  fname?: string;
  lname?: string;
}
