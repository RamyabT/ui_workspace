import { Component, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceUnavailableHelper, ServiceUnavailableState } from './service-unavailable.helper';
import { MainHeaderComponent } from 'src/app/layout/components/main-header/main-header.component';

@Component({
  selector: 'app-service-unavailable',
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.scss'],
  providers: [ ServiceUnavailableHelper ]
})

export class ServiceUnavailableComponent extends BaseFpxFormComponent<ServiceUnavailableHelper, ServiceUnavailableState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _serviceUnavailableHelper: ServiceUnavailableHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _serviceUnavailableHelper);

  
  }

  override doPreInit(){
  }

}
