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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DocumentchecklistService } from '../documentchecklist-service/documentchecklist.service';
import { Documentchecklist } from '../documentchecklist-service/documentchecklist.model';
export class documentChecklistState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  Document_Checklist_Image: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.jpeg,.png"
  }
  FieldId_4: any = {
    text: " <span>Hey there! Before we begin the process, let's make sure you have all the particulars required. </span>"
  }
}

@Injectable()
export class documentChecklistHelper extends BaseFpxFormHelper<documentChecklistState> {
  constructor(private documentChecklistService: DocumentchecklistService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new documentChecklistState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILDOCUMENTCHECKLIST");
    this.removeShellBtn('RESET');
    this.addSubmitHandler('submit', this.customSubmitHandler);
  }


  public override doPostInit(): void {
    
  }


  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "cob-applicant-form"], {
      queryParams: {
        "productId": this.getRoutingParam('productId'),

      }
    });
    return;
  }


  public override postDataFetchInterceptor(payload: Documentchecklist) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    return {
      success: this.postSubmitInterceptor,
      error: this.postSubmitInterceptor
    }
  }
  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("prelogin-space/entry-shell/onboarding/cob-applicant-form");
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}