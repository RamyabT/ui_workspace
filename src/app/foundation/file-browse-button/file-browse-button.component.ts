import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DeviceDetectorService } from '@dep/core';
import { FpxToastService } from '@fpx/core';
import { CameraService } from 'src/app/dep/smart-device/camera/camera.service';

@Component({
  selector: 'app-file-browse-button',
  templateUrl: './file-browse-button.component.html',
  styleUrls: ['./file-browse-button.component.scss'],
  providers: [
    CameraService
  ]
})
export class FileBrowseButtonComponent implements OnInit {

  @Input () acceptFiles:string = "image/*,.pdf";
  @Input () label:string = "Choose";
  @Input () destinationType: 'file' | 'base64' = 'file';
  @Output () fileSelect:EventEmitter<any> = new EventEmitter();

  id:string = '';
  constructor(
    private _fpxToastService: FpxToastService,
    private _cameraService:CameraService,
    protected _deviceDetector: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.id = 'fileBrowse' + new Date().getTime();
  }

  async onFileSelect($event:any){
    let result;
    let fileList:FileList = $event?.target?.files;
  
    let file: File = fileList[0];
    if(file.size>2000000){
      this._fpxToastService.showWarningAlert('Alert', 'File should be less than 2MB');
      return
    }
    if(this.destinationType == 'file'){
      result = file;
    } else if(this.destinationType == 'base64'){
      result = await this.getBase64(file);
    }
    this.fileSelect.emit(result);
  }

  getBase64(file: Blob):Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  openGallery(){
    let options:CameraOptions = {
      destinationType: 0
    }
    this._cameraService.getPicture(options).then(
      (imageData: string) => {
        this.fileSelect.emit("data:image/jpeg;base64," + imageData);
      }
    )
  }

}
