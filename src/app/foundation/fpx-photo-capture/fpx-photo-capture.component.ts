import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { CameraService, CBXCameraOption } from '@smart-device';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'fpx-photo-capture',
  templateUrl: './fpx-photo-capture.component.html',
  styleUrls: ['./fpx-photo-capture.component.scss'],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => FpxPhotoCaptureComponent),
      multi : true
    }
  ],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class FpxPhotoCaptureComponent extends BaseFpxControlComponent {

  @ViewChild('cameraView')
  cameraView!: ElementRef;
  @Input()
  startCamera!: Subject<any>;
  @Input()
  stopCamera!: Subject<boolean>;
  @Input()
  takePhoto!: Subject<boolean>;
  @Output()
  onCapture!: EventEmitter<any>;
  @Output() onReady: EventEmitter<any> = new EventEmitter();
  @Output() onTakePicture: EventEmitter<any> = new EventEmitter();

  IMAGE_DATA: any = "";
  cameraPreviewRect: any;
  private startCameraSubscription: Subscription = new Subscription;
  private stopCameraSubscription: Subscription = new Subscription;
  private takePhotoSubscription: Subscription = new Subscription;
  
  constructor(
    _controlContainer : ControlContainer,
    changeDetectorRef:ChangeDetectorRef,
    private _changeDetectorRef:ChangeDetectorRef,
    private _camera:CameraService,
  ) {
    super(_controlContainer,changeDetectorRef);
    this._changeDetectorRef = changeDetectorRef;
  }

  protected override doPreInit(): void {
    this.startCameraSubscription = this.startCamera.subscribe(
      (options:CBXCameraOption) => {
        this._startCamera(options);
      }
    );

    this.stopCameraSubscription = this.stopCamera.subscribe(
      (res) => {
        this._stopCamera();
      }
    );

    this.takePhotoSubscription = this.takePhoto.subscribe(
      (res) => {
        this._takePhoto();
      }
    );
  }

  protected override doPostInit(): void {
    setTimeout(()=>{
      this.cameraPreviewRect = this.cameraView.nativeElement.getBoundingClientRect();
      this.onReady.emit();
    });
  }

  protected override doDestroy(): void {
    this.startCameraSubscription.unsubscribe();
    this.stopCameraSubscription.unsubscribe();
    this.takePhotoSubscription.unsubscribe();
  }

  private _startCamera(options:CBXCameraOption) {
    this.IMAGE_DATA = null;
    this.formControl.setValue(null, {
      emitEvent:false
    });

    options = {
      x: this.cameraPreviewRect.x + 2,
      y: this.cameraPreviewRect.y + 2,
      width: this.cameraPreviewRect.width - 4,
      height: this.cameraPreviewRect.height - 4,
      toBack: false,
      previewDrag: false,
      tapPhoto: false,
      storeToFile: false,
      camera: 'rear'
    }
    
    this._camera.startCameraAbove(options);
  }

  private _stopCamera() {
    this._camera.stopCamera();
  }

  private _base64ToArrayBuffer(base64:string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private _takePhoto() {
    this._camera.takePicture({}).then((imageData: any) => {
      this._camera.stopCamera();
      this._camera.cropImage(imageData, this.cameraPreviewRect.width, this.cameraPreviewRect.height, (cropedImgData: any) => {
        this.IMAGE_DATA = cropedImgData;
        this.formControl.setValue(cropedImgData);
        this.onTakePicture.emit(cropedImgData);
        this._changeDetectorRef.markForCheck();
      });
    }, (err: any) => {
      this._camera.stopCamera();
      console.log(err);
    });
  }

}
