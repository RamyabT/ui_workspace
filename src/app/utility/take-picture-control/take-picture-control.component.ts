import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CameraService } from "@smart-device";

@Component({
  selector: 'app-take-picture-control',
  templateUrl: './take-picture-control.component.html',
  styleUrls: ['./take-picture-control.component.scss'],
  providers: []
})
export class TakePictureControlComponent implements OnInit {

  constructor(
    private _cameraService:CameraService,
  ) { }

  @Input() placeholder: any;
  @Input() uploadedLabel: any;
  @Input() toolTip: any;
  @Input() startIcon: any;
  @Input() manualCameraTrigger = false;
  @Input() takePictureBtnIcon = './assets/images/upload-file.svg';
  @Input() captureBtnIcon = './assets/images/quick-links/cheque-book.svg';
  
  @Output() onTriggerTakePicture:EventEmitter<TakePictureControlComponent> = new EventEmitter();
  @Output() onTakePicture:EventEmitter<any> = new EventEmitter();
  @Output() onPictureReset:EventEmitter<any> = new EventEmitter();
  value:any
  // legend: any = "Picture";
  resultImg: any = "";
  ngOnInit(): void {
  }
  takePictureButtonClick() {
    this.onTriggerTakePicture.emit(this);
    if (!this.manualCameraTrigger) {
      this.startTakePic();
    }
  }
  startTakePic(){
    this._cameraService.skipStartFrame = true;
    this._cameraService.skipImageConfirmation = true;
    this._cameraService.startCameraWithFrame(this.toolTip,this.startIcon,(imgData:any)=>{
      this.resultImg = true;
      this.value = imgData;
      this.onTakePicture.emit(imgData);
    })
  }
  resetCapture(){
    this.value = "";
    this.resultImg = "";
    this.onPictureReset.emit();
  }
  // setValue(imgData){
  //   this.value = imgData;
  //   this.captured = true;
  // }
  // getFieldValue(){
  //   return this.imageData;
  // }
  // reset(){
  //   this.value = "";
  //   this.captured = false;
  // }
  // setReadOnly(readOnly){
  //   this.isReadOnly = readOnly;
  // }
}
