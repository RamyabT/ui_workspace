import { Component, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { BaseFpxTemplateProjection } from '@fpx/core';

@Component({
  selector: 'file-upload-template',
  templateUrl: './file-upload-template.component.html'
})
export class FileUploadTemplateComponent extends BaseFpxTemplateProjection {
  constructor(
    private _deviceDetectorService : DeviceDetectorService,
    private _fileOpenerService : FileOpenerService
  ) { 
    super();
  }

  override doPreInit(): void {
    this.setTemplateType('fileUpload');
    this.registerActionPublisher('fileUploadTmplt');
  }

  downloadFile(file: any, e : Event){
    e.preventDefault();
    e.stopPropagation();
    let customDownload = this._deviceDetectorService.isHybrid();
    this.previewFile('fileUploadTmplt', file.value, customDownload);
  }

  override invokePreviewFileMethod = (res:any)=>{
    this._fileOpenerService.openPDF(res);
  }

}
