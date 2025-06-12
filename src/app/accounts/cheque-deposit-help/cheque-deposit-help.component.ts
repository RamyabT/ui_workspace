import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from '@dep/core';
import { TranslateService } from '@ngx-translate/core';
import { ChequeDepositHelpClosedResult, ChequeDepositHelpData, ChequeDepositHelpMode } from './interfaces';

@Component({
  selector: 'app-cheque-deposit-help',
  templateUrl: './cheque-deposit-help.component.html',
  styleUrls: ['./cheque-deposit-help.component.scss']
})
export class ChequeDepositHelpComponent implements OnInit {

  protected cancelButtonLabel!: string;
  protected nextButtonLabel!: string;
  protected hideMessageNextTime: boolean | undefined;
  protected modalIconClass!: string;
  protected modalIconImageSrc!: string;
  protected isFront!: boolean;
  protected isBack!: boolean;

  protected mode: ChequeDepositHelpMode | undefined;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: ChequeDepositHelpData,
    public _device: DeviceDetectorService,
    private _translate:TranslateService,
    private _changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.mode = this._dialogData.mode;
    this.isFront = this.mode === ChequeDepositHelpMode.FRONT;
    this.isBack = this.mode === ChequeDepositHelpMode.BACK;
    this.modalIconClass = this.isBack ? 'face-id-square' : 'face-id-circle';
    this.modalIconImageSrc = this.isFront ? './assets/images/icons/face-id-circle.svg' : './assets/images/icons/face-id-square.svg';
    this.cancelButtonLabel = "Cancel";
    this.nextButtonLabel = "Next";
    this._changeDetectionRef.detectChanges();
  }

  next() {
    this._dialogRef.close({
      action: 'next',
      hideMessageNextTime: this.hideMessageNextTime
    } as ChequeDepositHelpClosedResult);
  }

  cancel() {
    this._dialogRef.close({
      action: 'cancel'
    });
  }
}
