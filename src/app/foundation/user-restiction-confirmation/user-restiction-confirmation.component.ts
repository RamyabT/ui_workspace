import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-restiction-confirmation',
  templateUrl: './user-restiction-confirmation.component.html',
  styleUrls: ['./user-restiction-confirmation.component.scss']
})
export class UserRestictionConfirmationComponent implements OnInit {

  protected title: string = "";
  protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";
  protected isAccepted:boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
  ) { }

  ngOnInit(): void {
    if(this._dialogData?.title) this.title = this._dialogData.title;
    if(this._dialogData?.message) this.message = this._dialogData.message;
    this.okBtnLbl = this._dialogData?.okBtnLbl || "DEFAULT.DIALOG.CONFIRM.okBtnLbl";
    this.cancelBtnLbl = this._dialogData?.cancelBtnLbl || "DEFAULT.DIALOG.CONFIRM.cancelBtnLbl";
  }

  onAccept() {
    this._dialogRef.close(1);
  }

  onDecline(){
    this._dialogRef.close(0);
  }

  toggleSelection(event:any){
    if(event?.checked){
      this.isAccepted = true;
    }else{
      this.isAccepted = false;
    }
  }

}
