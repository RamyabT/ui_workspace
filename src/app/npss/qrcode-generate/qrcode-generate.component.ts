import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { QrcodeGenerateHelper, QrcodeGenerateState } from './qrcode-generate.helper';

@Component({
  selector: 'app-qrcode-generate',
  templateUrl: './qrcode-generate.component.html',
  styleUrls: ['./qrcode-generate.component.scss'],
  providers: [QrcodeGenerateHelper]
})
export class QrcodeGenerateComponent extends BaseFpxFormComponent<QrcodeGenerateHelper, QrcodeGenerateState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _qrcodeGenerateService: QrcodeGenerateHelper,
  ) { 
    super(formBuilder, router,controlContainer, _qrcodeGenerateService);
  }

}
