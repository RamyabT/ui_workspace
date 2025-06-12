import { Inject, Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { UserfeedbacklogService } from '../userfeedbacklog-service/userfeedbacklog.service';
import { Userfeedbacklog } from '../userfeedbacklog-service/userfeedbacklog.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
export class LogoutFeedBackFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  clickedRatingIndex: any = '';
  isResultMode: any;
}


@Injectable()
export class LogoutFeedBackFormHelper extends BaseFpxFormHelper<LogoutFeedBackFormState>{

  constructor(
    public deviceDedector: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any, private logoutFeedBackFormService: UserfeedbacklogService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new LogoutFeedBackFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILUSERFEEDBACK");
  }


  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Userfeedbacklog): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Userfeedbacklog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  reactionClick(rating: string) {
    this.state.clickedRatingIndex = rating
    this.formGroup.get('rating')?.patchValue(rating)
  }
  onAccept() {
    let channel;
    if (this.deviceDedector.isHybrid()) {
      channel = 'hybrid'
    } else if (this.deviceDedector.isMobile()) {
      channel = 'mobile'
    } else if (this.deviceDedector.isDesktop()) {
      channel = 'desktop'
    } else if (this.deviceDedector.isTablet()) {
      channel = 'tablet'
    }
    let formGroupValue = this.formGroup.value
    let payload: any = {
      "rating": formGroupValue?.rating,
      "feedBackComments": formGroupValue?.feedBackComments,
      "channel": channel
    }
    if (this.deviceDedector.isHybrid()) {
      payload.appVersion = '1.0'
    }
    // this.logoutFeedBackFormService.create(payload)().subscribe(res => {
    //   this.state.isResultMode = true;
    //   setTimeout(() => {
    //     this._dialogRef.close(1);
    //   }, 2000);
    // }, (err: any) => {
    //   this.state.isResultMode = true;
    // })

    this.showSpinner();
    this.logoutFeedBackFormService.create(payload)().subscribe({
      next: (res: any) => {
        this.hideSpinner();
        this.state.isResultMode = true;
        setTimeout(() => {
          this._dialogRef.close(1);
        }, 2000);
      },
      error: (err: any) => {
        this.hideSpinner();
        this.state.isResultMode = true;
      }
    });

  }

  onDecline() {
    this._dialogRef.close(0);
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.userfeedbacklog.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

  ratingImg = [
    '',
    'grinning-face-with-star-eyes.svg',
    'smiling-face-with-smiling-eyes.svg',
    'slightly-smiling-face.svg',
    'slightly-frowning-face.svg',
    'persevering-face.svg'
  ]
}