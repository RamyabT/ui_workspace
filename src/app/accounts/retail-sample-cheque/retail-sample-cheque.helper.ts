import { Inject, Injectable, inject } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
 
} from "@fpx/core";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";

export class RetailSampleChequeState extends BaseFpxComponentState {
 
}


@Injectable()
export class RetailSampleChequeHelper extends BaseFpxFormHelper<RetailSampleChequeState>{

  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public deviceDetectorService: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {
    super(new RetailSampleChequeState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    
  }
  close() {
    this._dialogRef.close(0);
  }


  public override doPostInit(): void {
  }

 

   
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


