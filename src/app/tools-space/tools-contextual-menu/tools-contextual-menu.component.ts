import { Component, OnInit, Optional } from '@angular/core';
import { ToolsContextualMenuHelper, ToolsContextualMenuState } from './tools-contextual-menu.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools-contextual-menu',
  templateUrl: './tools-contextual-menu.component.html',
  styleUrls: ['./tools-contextual-menu.component.scss'],
  providers: [ToolsContextualMenuHelper]
})
export class ToolsContextualMenuComponent extends BaseFpxFormComponent<ToolsContextualMenuHelper, ToolsContextualMenuState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _toolsContextualmenuService: ToolsContextualMenuHelper,
  ) { 
    super(formBuilder, router,controlContainer, _toolsContextualmenuService);
  }

}