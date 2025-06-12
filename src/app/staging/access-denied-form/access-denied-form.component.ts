import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-access-denied-form',
  templateUrl: './access-denied-form.component.html',
  styleUrls: ['./access-denied-form.component.scss']
})
export class AccessDeniedFormComponent implements OnInit {

  message: string = "";
  description: string = "";
  statusCode: any;
  skip: boolean = false;
  close: boolean = false;
  update: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.statusCode = this._dialogData?.statusCode;
    this.skip = this._dialogData?.skip || false;
    this.update = this._dialogData?.update || false;
    this.close = !this.skip && !this.update;
  }

  closeRequest(){
    this._dialogRef.close({action: 'CLOSE'});
  }

  skipRequest(){
    this._dialogRef.close({action: 'SKIP'});
  }

  updateRequest(){
    this._dialogRef.close({action: 'UPDATE'});
  }

}
