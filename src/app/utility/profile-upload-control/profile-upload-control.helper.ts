import { Injectable, Input } from "@angular/core";
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
  FpxModalAfterClosed,
} from "@fpx/core";
import { RetailProfilePicUploadFormComponent } from "@app/utility";
import { UserAuthService } from "@dep/services";

export class ProfileUploadControlState extends BaseFpxComponentState {
  format_base64:boolean=true;
  fileuploadevent:any
}

@Injectable()
export class ProfileUploadControlHelper extends BaseFpxFormHelper<ProfileUploadControlState> {
  tempGridLoad: boolean | undefined = false;
  constructor(
     public userAuth: UserAuthService,
  ) {
    super(new ProfileUploadControlState());
  }
  override doPreInit(): void {
  }

  updatePhoto() {
    let modal = new FpxModal();
    modal.setComponent(RetailProfilePicUploadFormComponent);
    modal.setPanelClass("dep-info-popup");
    modal.setDisableClose(false);
    modal.setData({
      title: "USERPROFILE.uploadPhoto",
      format_base64:this.state.format_base64
    });
    modal.setAfterClosed(this.profileUploadFormAfterClose);
    this.openModal(modal);
  }

  profileUploadFormAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
      this.state.fileuploadevent.emit(payload)
    }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
  }
  public override doPostInit(): void {
    
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

    return response;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n


  handleProfileDocGridEvent(payload:any){
   
  }

}
