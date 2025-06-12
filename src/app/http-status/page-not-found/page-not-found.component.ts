import { Component, inject, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PageNotFoundHelper, PageNotFoundState } from './page-not-found.helper';
import { MainHeaderComponent } from 'src/app/layout/components/main-header/main-header.component';
import { DeviceDetectorService } from 'src/app/dep/core/class/device-detector.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  providers: [ PageNotFoundHelper ]
})

export class PageNotFoundComponent extends BaseFpxFormComponent<PageNotFoundHelper, PageNotFoundState> {
  protected _device: DeviceDetectorService = inject(DeviceDetectorService);
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _pageNotFoundHelper: PageNotFoundHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _pageNotFoundHelper);

  
  }

  override doPreInit(){
  }

}
