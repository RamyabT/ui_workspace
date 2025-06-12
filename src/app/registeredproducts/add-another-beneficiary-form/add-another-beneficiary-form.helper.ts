import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus } from "@angular/forms";
import { AppConfigService } from "@dep/services";
import { BaseFpxGridComponentState, BaseFpxGridHelper } from "@fpx/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  BaseFpxGridChangeHandler,
  HttpRequest,
  SpinnerService,
} from "@fpx/core";
export class AddAnotherBeneficiaryFormState extends BaseFpxGridComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class AddAnotherBeneficiaryFormHelper extends BaseFpxGridHelper<AddAnotherBeneficiaryFormState> {
  beneficiaryAdded: number = 0;
  sumOfProportion: any;
  errorCode: string = "";

  constructor(
    private _appConfig: AppConfigService,
    // private _cOBTaxDetailsFormHelper:CobTaxDetailsFormHelper
  ) {
    super(new AddAnotherBeneficiaryFormState());
  }

  public getGridWidth(): number {
    return 100;
  }


  public getGridColumnWidth(): number[] {
    return [100, 50, 50, 50, 50];
  }
  override doPreInit(): void {
    
  }

  override doPostInit(): void {
    this.addRow();
    this.addValueChangeHandler("proportion", this.handleProportionChange);
    
  }  
  public handleProportionChange: BaseFpxGridChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormArray,
    index: number
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (value) {
      console.log(value);
      this.sumOfProportion = formArray.controls.reduce((acc, control) => {
        return acc + parseFloat(control.get('proportion')?.value || '0');
      }, 0);
      
      if(this.sumOfProportion == 100) {
        this.errorCode = "";
        this.parentForm.controls['beneInfoProportionFlag'].setErrors(null);
      } else {
        this.errorCode = "INVALID_PROPORTION";
        this.parentForm.controls['beneInfoProportionFlag'].setErrors({ 'INVALID_PROPORTION' : true });
      }
    }
  }
}
