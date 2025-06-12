import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { ProfileUploadControlState, ProfileUploadControlHelper } from './profile-upload-control.helper';
import { BaseFpxFormComponent } from '@fpx/core'; 
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-upload-control',
  templateUrl: './profile-upload-control.component.html',
  styleUrls: ['./profile-upload-control.component.scss'],
  providers : [ ProfileUploadControlHelper]
})
export class ProfileUploadControlComponent extends  BaseFpxFormComponent<ProfileUploadControlHelper, ProfileUploadControlState>  {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public profileUploadControlHelper: ProfileUploadControlHelper,
  ) {
    super(formBuilder, router,controlContainer, profileUploadControlHelper);
  }
  @Input() format_base64:any;
  @Output() onFileUpload:EventEmitter<any> = new EventEmitter();
   protected override doPreInit(): void {
    this.state.format_base64=this.format_base64
    this.state.fileuploadevent=this.onFileUpload
  }
  

  protected override doPostInit(): void {
  }

}
