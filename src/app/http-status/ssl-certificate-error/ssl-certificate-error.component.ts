import { Component, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SslCertificateErrorComponentHelper, SslCertificateErrorComponentState } from './ssl-certificate-error.helper';

@Component({
  selector: 'app-ssl-certificate-error',
  templateUrl: './ssl-certificate-error.component.html',
  styleUrls: ['./ssl-certificate-error.component.scss'],
  providers: [ SslCertificateErrorComponentHelper ]
})

export class SslCertificateErrorComponent extends BaseFpxFormComponent<SslCertificateErrorComponentHelper, SslCertificateErrorComponentState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _sslCertificateErrorComponentHelper: SslCertificateErrorComponentHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _sslCertificateErrorComponentHelper);

  
  }

  override doPreInit(){
  }

}
