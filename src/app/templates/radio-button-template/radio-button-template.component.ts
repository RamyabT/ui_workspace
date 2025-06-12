import { Component, inject, OnInit } from '@angular/core';
import { SkinManager } from '@dep/ui';
import { BaseFpxTemplateProjection } from '@fpx/core';

@Component({
  selector: 'radio-button-template',
  templateUrl: './radio-button-template.component.html'
})
export class radioButtonTemplateComponent extends BaseFpxTemplateProjection {
    
  constructor(
    protected skinManager:SkinManager
  ) { 
    super();
  }

  override doPreInit(): void {
    this.setTemplateType('radio');
  }

}
