import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APPCONSTANTS } from '@dep/constants';
import { FileOpenerService } from '@dep/native';
import { DeviceDetectorService } from '../../class/device-detector.service';

@Component({
  selector: 'app-dep-app-version-update',
  templateUrl: './dep-app-version-update.component.html',
  styleUrls: ['./dep-app-version-update.component.scss']
})
export class DepAppVersionUpdateComponent implements OnInit {
  protected title: string = "";
  protected description: string = "";
  protected mandatory: string="";
  protected updateAvailable:string=""
  forceUpdate:boolean = false;
  updateLaterOn:boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _fileOpenerService: FileOpenerService,
    private _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    if(this._dialogData?.title) this.title = this._dialogData.title;
    if(this._dialogData?.description) this.description = this._dialogData.description;
    if(this._dialogData?.mandatory) this.mandatory = this._dialogData.mandatory;
    if(this._dialogData?.updateAvailable) this.updateAvailable = this._dialogData.updateAvailable;
    if(this.updateAvailable == '1' && this.mandatory == '1'){
      this.forceUpdate = true;
    }
    else if(this.updateAvailable == '1' && this.mandatory == '0'){
      this.updateLaterOn = true;
    }
  }

  updateNow() {
    let link: string = this._device.getDeviceInfo().os.toLowerCase();
    this._fileOpenerService.openLink(APPCONSTANTS.storeURLs[link]);
    // this._dialogRef.close();
  }
  
  updateLater(){
    this._dialogRef.close();
  }

}
