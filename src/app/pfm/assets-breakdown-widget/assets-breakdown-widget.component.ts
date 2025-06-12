import { Component, EventEmitter, inject, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { AssetsBreakdownWidgetHelper, AssetsBreakdownWidgetState } from './assets-breakdown-widget.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-assets-breakdown-widget',
  templateUrl: './assets-breakdown-widget.component.html',
  providers: [AssetsBreakdownWidgetHelper]
})
export class AssetsBreakdownWidgetComponent extends BaseFpxFormComponent<AssetsBreakdownWidgetHelper, AssetsBreakdownWidgetState> {
 
  appConfig: AppConfigService = inject(AppConfigService);
  
  constructor(
    _formBuilder: FormBuilder, 
    _route: Router, 
    @Optional() _controlContainer: ControlContainer,
    _AssetsBreakdownWidgetHelper: AssetsBreakdownWidgetHelper
  ) { 
    super(_formBuilder, _route, _controlContainer, _AssetsBreakdownWidgetHelper);
  }

  protected override doPreInit(): void {

  }


}
