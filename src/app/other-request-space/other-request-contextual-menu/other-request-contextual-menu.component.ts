import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { OtherRequestContextualMenuHelper, OtherRequestContextualMenuState } from './other-request-contextual-menu.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-request-contextual-menu',
  templateUrl: './other-request-contextual-menu.component.html',
  styleUrls: ['./other-request-contextual-menu.component.scss'],
  providers: [OtherRequestContextualMenuHelper]
})
export class OtherRequestContextualMenuComponent extends BaseFpxFormComponent<OtherRequestContextualMenuHelper, OtherRequestContextualMenuState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _otherServiceRequestService: OtherRequestContextualMenuHelper,
  ) { 
    super(formBuilder, router,controlContainer, _otherServiceRequestService);
  }

}
