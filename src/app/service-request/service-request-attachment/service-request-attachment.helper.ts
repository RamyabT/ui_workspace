import { ChangeDetectionStrategy, ChangeDetectorRef, Injectable } from "@angular/core";
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
import { ServicerequestattachmentService } from '../servicerequestattachment-service/servicerequestattachment.service';
import { Servicerequestattachment } from '../servicerequestattachment-service/servicerequestattachment.model';
import { AppConfigService, CustomFileUploadService } from "@dep/services";
import { RetailServiceRequestTrackerFormHelper } from "../retail-service-request-tracker-form/retail-service-request-tracker-form.helper";
import { FileOpenerService } from "@dep/native";
import { DeviceDetectorService } from "@dep/core";
export class ServiceRequestAttachmentFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  requestDetails: any;
  serviceRequestDetailsHistory: any;
  attachedFiles: any = '';
  fileUpload: any = {
    extensions: ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpg,image/jpeg,image/png"
  }
}


@Injectable()
export class ServiceRequestAttachmentFormHelper extends BaseFpxFormHelper<ServiceRequestAttachmentFormState> {

  isTrackerScreen: boolean = false;
  displayScreen: string = '';

  constructor(private serviceRequestAttachmentFormService: ServicerequestattachmentService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _requestTrackerFormHelper: RetailServiceRequestTrackerFormHelper,
    private _fileUploadService: CustomFileUploadService,
    public changeDetection: ChangeDetectorRef,
    private _fileOpenerService: FileOpenerService,
    public _device: DeviceDetectorService
  ) {
    super(new ServiceRequestAttachmentFormState());
  }

  override doPreInit(): void {
    this.displayScreen = this.getRoutingParam('screen');
    this.isTrackerScreen = (this.displayScreen === 'tracker') ? true : false;

    this.setServiceCode("servicerequestattachment");
    this.state.requestDetails = this._appConfig.getData('serviceRequestDetails');
    this.state.serviceRequestDetailsHistory = this._appConfig.getData('serviceRequestDetailsHistory');
  }


  public override doPostInit(): void {
    this.setValue('serviceRequestNumber', this.state.requestDetails.sourceReference);
    this.addValueChangeHandler('servicereqcommentsattachement', this.handleAttachmentsOnvalueChange);

  }
  downloadFile(file: any) {
    this._fileUploadService.download(file.docInvNumber).subscribe({
      next: (res: any) => {
        if (this._device.isHybrid()) this._fileOpenerService.openPDF(res);
      }
    });
  }
  removeSelectedFile(file: any) {
    let index = this.state.attachedFiles.findIndex((files: any) => files.serialNo === file.serialNo);
    this.state.attachedFiles.splice(index, 1);
    this.state.attachedFiles = this.state.attachedFiles;
    // this.formGroup.controls['servicereqcommentsattachement'].value.splice(index,1)
    this.setValue('servicereqcommentsattachement', this.state.attachedFiles);
    // this.formGroup.patchValue({
    //   "servicereqcommentsattachement": this.state.attachedFiles
    // });
  }

  public handleAttachmentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.state.attachedFiles = value;
  }




  public override preSubmitInterceptor(payload: Servicerequestattachment): any {

    // WRITE CODE HERE TO HANDLE 
    let i = 0;
    if (this.state.attachedFiles != '') {
      this.state.attachedFiles?.forEach((element: any) => {
        element.serialNo = i;
        i++;
      });
      payload.servicereqcommentsattachement = this.state.attachedFiles;
    }
    let historyLength = this.state.serviceRequestDetailsHistory?.length;
    if (this.isTrackerScreen) {
      payload.stage = this.state.serviceRequestDetailsHistory?.[historyLength - 1].action;
    } else payload.stage = "Initiated";

    return payload;
  }


  public override postDataFetchInterceptor(payload: Servicerequestattachment) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    this.state.attachedFiles = [];
    this.changeDetection.detectChanges();
    // this.formGroup.reset();
    this.reset('messageContent');
    this.reset('servicereqcommentsattachement');
    if (response.success) {
      this._requestTrackerFormHelper.fetchServiceRequestComments();
      routingInfo.setQueryParams({
        transRef: response.success?.body?.servicerequestattachment.serviceRequestNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


