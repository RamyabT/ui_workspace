import { Component, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BadGatewayComponentHelper, BadGatewayComponentState } from './bad-gateway.helper';

@Component({
  selector: 'app-bad-gateway',
  templateUrl: './bad-gateway.component.html',
  styleUrls: ['./bad-gateway.component.scss'],
  providers: [ BadGatewayComponentHelper ]
})

export class BadGatewayComponent extends BaseFpxFormComponent<BadGatewayComponentHelper, BadGatewayComponentState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _badGatewayComponentHelper: BadGatewayComponentHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _badGatewayComponentHelper);

  
  }

  override doPreInit(){
  }

}
