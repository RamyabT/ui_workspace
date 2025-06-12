import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dep-confirmation',
  templateUrl: './dep-confirmation.component.html',
  styleUrls: ['./dep-confirmation.component.scss']
})
export class DepConfirmationComponent implements OnInit {

  protected title: string = "";
  protected message: string = "";
  protected description: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected confirmationIcon: string = "";
  protected serviceCode: string = "";
  protected hideOkBtn: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public _dialogData : any,
  ) { }

  ngOnInit(): void {
    if(this._dialogData?.title) this.title = this._dialogData.title;
    if(this._dialogData?.message) this.message = this._dialogData.message;
    if(this._dialogData?.description) this.description = this._dialogData.description;
    if(this._dialogData?.confirmationIcon) this.confirmationIcon = this._dialogData.confirmationIcon;
    if(this._dialogData?.serviceCode) this.serviceCode = this._dialogData.serviceCode;
    this.okBtnLbl = this._dialogData?.okBtnLbl || "DEFAULT.DIALOG.CONFIRM.okBtnLbl";
    this.hideOkBtn = this._dialogData?.hideOkBtn || false;
    this.cancelBtnLbl = this._dialogData?.cancelBtnLbl || "DEFAULT.DIALOG.CONFIRM.cancelBtnLbl";
  }

  onAccept() {
    this._dialogRef.close(1);
  }

  onDecline(){
    this._dialogRef.close(0);
  }

}
