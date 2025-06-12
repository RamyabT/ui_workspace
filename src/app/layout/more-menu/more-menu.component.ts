import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss']
})
export class MoreMenuComponent implements OnInit {
  moreActions:any = [];
  title: string = 'More';
  

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    protected _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.moreActions =  this._dialogData.moreActionsList;
  }

  openLink(menu:any){
    console.log("MORE ACTION: ", menu);
    this._dialogRef.close(menu);
  }
  closeContextMenu() {
    this._dialogRef.close();
  }

}
