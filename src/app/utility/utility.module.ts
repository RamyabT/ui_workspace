import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetailProfilePicUploadFormComponent } from './retail-profile-pic-upload-form/retail-profile-pic-upload-form.component';
import { UtilityService } from './utility.service';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { FoundationModule } from '../foundation/foundation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../dep/core/material.module';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { LoginModule } from '../login/login.module';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { ProfileUploadControlComponent } from './profile-upload-control/profile-upload-control.component';
import { TakePictureControlComponent } from './take-picture-control/take-picture-control.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { DeviceDetectorService } from '@dep/core';
import { CameraPreview } from '@awesome-cordova-plugins/camera-preview/ngx';
import { CameraService } from '@smart-device';
import { MockCameraPreview } from './mock-camera/mock-camera-preview';
import { MockCameraData } from './mock-camera/mock-camera-data';

const components = [RetailProfilePicUploadFormComponent,ProfileUploadControlComponent,TakePictureControlComponent]

@NgModule({
  declarations: [
    ...components,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    DepCoreModule,
    
  ],
  providers: [
    MockCameraData,
    {
      provide: CameraPreview,
      useFactory: (_device: DeviceDetectorService, mockCameraData: MockCameraData) => {
        return _device.isHybrid() ? new CameraPreview() : new MockCameraPreview(mockCameraData);
      },
      deps: [DeviceDetectorService, MockCameraData]
    },
    { 
      provide: CameraService, 
      useClass: CameraService, 
      deps: [Camera, CameraPreview]
    }
  ],
  exports: [
    ...components
   ]
})
export class UtilityModule { }
