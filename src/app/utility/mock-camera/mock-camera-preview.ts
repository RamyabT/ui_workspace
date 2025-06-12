import { Injectable } from "@angular/core";
import { CameraPreview, CameraPreviewOptions } from "@awesome-cordova-plugins/camera-preview/ngx";
import { MockCameraData } from "./mock-camera-data";

@Injectable({
  providedIn: 'root'
})
export class MockCameraPreview extends CameraPreview {

  constructor(
    private mockCameraData: MockCameraData
  ) {
    super();
  }

  override startCamera(options: CameraPreviewOptions): Promise<any> {
    return Promise.resolve(true);
  }
  override stopCamera(): Promise<any> {
    return Promise.resolve(true)
  }
  override takePicture(options: any) {
    return this.mockCameraData.getBase64ImageData();
  }
}