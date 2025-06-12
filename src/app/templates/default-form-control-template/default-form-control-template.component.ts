import { Component, OnInit, inject } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxTemplateProjection } from '@fpx/core';

@Component({
  selector: 'default-form-control-template',
  templateUrl: './default-form-control-template.component.html'
})
export class DefaultFormControlTemplateComponent extends BaseFpxTemplateProjection {
  protected _appConfig: AppConfigService = inject(AppConfigService);

  constructor() { 
    super();
  }
  override doPreInit(): void {
    this.setTemplateType('default');
  }

}
