import { Component, inject, OnInit, Optional } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { NoAccessHelper, NoAccessState } from './no-access.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss'],
  providers: [NoAccessHelper]

})
export class NoAccessComponent extends BaseFpxFormComponent<NoAccessHelper, NoAccessState> {

  protected _device: DeviceDetectorService = inject(DeviceDetectorService);
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _noAccessHelper: NoAccessHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _noAccessHelper);


  }

  override doPreInit() {
  }


}
