import { Component, OnInit, Optional } from '@angular/core';

import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UnauthorizedHelper, UnauthorizedState } from './unauthorized.helper';
import { MainHeaderComponent } from 'src/app/layout/components/main-header/main-header.component';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  providers: [ UnauthorizedHelper ]
})

export class UnauthorizedComponent extends BaseFpxFormComponent<UnauthorizedHelper, UnauthorizedState> {
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _unauthorizedHelper: UnauthorizedHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, _unauthorizedHelper);

  
  }

  override doPreInit(){
  }

}
