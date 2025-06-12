import { ApplicationRef, ChangeDetectorRef, Injectable, inject } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  FpxModal,
  FpxModalAfterClosed,
  RoutingInfo,
} from "@fpx/core";

import { Router } from "@angular/router";
import { ProductSelectionService } from "../product-selection-service/product-selection.service";

import { ReadTermsAndConditionsComponent } from "src/app/foundation/read-terms-and-conditions/read-terms-and-conditions.component";

export class COBKeyFactsStatementsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formSubmitted: boolean = false;
  kfsFlag:any = {
    ckValues:{checked:1,unchecked:0}
  };
  
}

@Injectable()
export class COBKeyFactsStatementsFormHelper extends BaseFpxFormHelper<COBKeyFactsStatementsFormState> {
  invalid: boolean=true;
  
  
  constructor(
    private _router: Router,
    private _productSelectionService: ProductSelectionService
  ) {
    super(new COBKeyFactsStatementsFormState());
  }


  override doPreInit(): void {
    this.hideShellActions();
  }

  override doPostInit():void{
    
    // this.setDisabled("kfsFlag",true);
    this.setReadonly("kfsFlag",true);
    
  }

  public override doDestroy(): void {

  }
  onOpenClick() {
    this._router.navigate(["prelogin-space", "entry-shell", "onboarding","product-selection"])
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "document-checklist"], {
      queryParams: {
        "productId": this.getRoutingParam('productId'),
        "productSegment": this.getRoutingParam('productSegment'),
        "kfsFlag": payload.kfsFlag
      }
    });
    return;
    this.state.formSubmitted = true;
    payload = {
      ...payload,
      // "processId": this._processShellService.processId,
      "bpCode": "COB"
    };
    return payload;
  }

  public override postSubmitInterceptor(response: any): any {

    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success.status == 200){
      let path = ["process-shell", "rcob", "check-list"];
      this._router.navigate(path);
      // this._processShellService.triggerFormSubmittedCompleteStatus(true);
    } else {
      this.state.formSubmitted = false;
    }

    // WRITE CODE HERE TO HANDLE
    return;
  }

  onReadTermsCondition() {
    let modal = new FpxModal();
    modal.setComponent(ReadTermsAndConditionsComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      "title": "Self Declaration and Consents"
    });
    modal.setAfterClosed(this.termsAndConditionsCloseHandler);
    this.openModal(modal);
    // this.router.navigate(['prelogin-space','entry-shell','onboarding','read-terms-and-conditions']);
  }


  termsAndConditionsCloseHandler: FpxModalAfterClosed = (payload: any) => {
    // console.log("model closed...", payload);
    // this.setDisabled("kfsFlag",true);
    this.setReadonly("kfsFlag",true);
    

    if(payload.agree){
      this.setDisabled("kfsFlag",false);
      this.setValue("kfsFlag",1);
      this.formGroup.updateValueAndValidity();

    }
    else 
    this.setReadonly("kfsFlag",true);
      
      
 
    
    // alert("hi");
    // if (payload.agree) this.setValue("kfsFlag", 1);
    // else this.setValue("kfsFlag", 0);
    setTimeout(()=>{
    })
    
  }

  checkedon(){
    console.log("checked is working")
  }

  
}
