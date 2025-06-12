import { Component, inject, OnInit } from '@angular/core';
import { SkinManager } from '@dep/ui';
import { BaseFpxTemplateProjection } from '@fpx/core';

@Component({
  selector: 'dropdown-template',
  templateUrl: './dropdown-template.component.html'
})
export class DropdownTemplateComponent extends BaseFpxTemplateProjection {
    
  constructor(
    protected skinManager:SkinManager
  ) { 
    super();
  }

  override doPreInit(): void {
    this.setTemplateType('dropdown');
  }

}
