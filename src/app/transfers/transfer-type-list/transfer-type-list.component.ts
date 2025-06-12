import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';


@Component({
  selector: 'app-transfer-type-list',
  templateUrl: './transfer-type-list.component.html',
  styleUrls: ['./transfer-type-list.component.scss']
})
export class TransferTypeListComponent extends BaseFpxFunctionality implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);


  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  protected transferTypeList: any[] = [
    {
      title: "Between my accounts",
      icon: "own-account",
      serviceCode: "RETAILTRANOAT"
    },
    {
      title: "Transfer to other account",
      icon: "other-account",
      serviceCode: "RETAILTRANINTBT"
    }
  ];

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = this._dialogData.title;
  }

  close() {
    let payload = {
      action: 0
    }
    this._dialogRef.close(payload);
  }

  goToTransferForm(transferType: any) {
    console.log("transferType is ", transferType);
    this._dialogRef.close(transferType.serviceCode);
  }

}
