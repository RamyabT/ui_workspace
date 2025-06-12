import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { SettingsContextualMenuHelper, SettingsContextualMenuState } from './settings-contextual-menu.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-contextual-menu',
  templateUrl: './settings-contextual-menu.component.html',
  styleUrls: ['./settings-contextual-menu.component.scss'],
  providers: [SettingsContextualMenuHelper]
})
export class SettingsContextualMenuComponent extends BaseFpxFormComponent<SettingsContextualMenuHelper, SettingsContextualMenuState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _otherServiceRequestService: SettingsContextualMenuHelper,
  ) { 
    super(formBuilder, router,controlContainer, _otherServiceRequestService);
  }

}
