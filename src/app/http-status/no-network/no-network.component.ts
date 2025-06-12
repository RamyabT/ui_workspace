import { Component, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NoNetworkHelper, NoNetworkState } from './no-network.helper';

@Component({
  selector: 'app-no-network',
  templateUrl: './no-network.component.html',
  styleUrls: ['./no-network.component.scss'],
  providers: [ NoNetworkHelper ]
})

export class NoNetworkComponent extends BaseFpxFormComponent<NoNetworkHelper, NoNetworkState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _noNetworkHelper: NoNetworkHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _noNetworkHelper);

  
  }

  override doPreInit(){
  }

}
