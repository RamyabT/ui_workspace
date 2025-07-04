import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-dep-tooltip',
  templateUrl: './dep-tooltip.component.html',
  styleUrls: ['./dep-tooltip.component.scss']
})
export class DepTooltipComponent implements OnInit {
  protected title: string = "";
  protected message: string = "";
  protected okBtnLbl: string = "";
  protected alertIcon:string = "";
  protected additionalInfo: any;
  protected baseCurrency: string= "$";
  protected serviceCode: any;
  protected link: any;
  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    protected _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    if(this._dialogData?.title) this.title = this._dialogData.title;
    if(this._dialogData?.message) this.message = this._dialogData.message;
    if(this._dialogData?.alertIcon) this.alertIcon = this._dialogData.alertIcon || "";
    if(this._dialogData?.okBtnLbl) this.okBtnLbl = this._dialogData?.okBtnLbl || "DEFAULT.DIALOG.ALERT.okBtnLbl";
    if(this._dialogData?.additionalInfo) this.additionalInfo = this._dialogData.additionalInfo;
    if(this._dialogData?.serviceCode) this.serviceCode = this._dialogData.serviceCode;
    if(this._dialogData?.link) this.link = this._dialogData.link;
  }
  closeContextMenu() {
    this._dialogRef.close();
  }

}
