import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
  selector: 'app-profile-doc-upload-control',
  templateUrl: './profile-doc-upload-control.component.html',
  styleUrls: ['./profile-doc-upload-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileDocUploadControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDocUploadControlComponent extends BaseFpxControlComponent {
  @Input('extensions') extensions: string = '';
  @Input('maxSize') maxSize: string = '20000024';

  
  
  constructor(
    private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  override doPreInit() {
    this.setMultiFileUpload(false);
  }

}
