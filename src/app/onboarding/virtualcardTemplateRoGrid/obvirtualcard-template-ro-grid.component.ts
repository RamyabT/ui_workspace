import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {obvirtualcardTemplateRoGridHelper } from './obvirtualcard-template-ro-grid.helper';
import { ObvirtualcardtemplateService } from '../obvirtualcardtemplate-service/obvirtualcardtemplate.service';
import { Obvirtualcardtemplate } from '../obvirtualcardtemplate-service/obvirtualcardtemplate.model';

@Component({
 selector: 'app-obvirtualcard-template-ro-grid',
  templateUrl: './obvirtualcard-template-ro-grid.component.html',
  styleUrls: ['./obvirtualcard-template-ro-grid.component.scss'],
   providers : [ obvirtualcardTemplateRoGridHelper]
 })
export class obvirtualcardTemplateRoGridComponent extends BaseFpxROGridComponent< Obvirtualcardtemplate, obvirtualcardTemplateRoGridHelper> {
 constructor(
    protected obvirtualcardTemplateRoGridHelper: obvirtualcardTemplateRoGridHelper,
    protected obvirtualcardtemplateService: ObvirtualcardtemplateService
  ) {
    super(obvirtualcardTemplateRoGridHelper);
  }
                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','obvirtualcardTemplateRoGrid.templateId.label','obvirtualcardTemplateRoGrid.cardtype.label','obvirtualcardTemplateRoGrid.cardform.label','obvirtualcardTemplateRoGrid.cardimage.label','obvirtualcardTemplateRoGrid.cardvalidity.label']);
    this.setGridIdentifiers(['SELECT','templateId','cardtype','cardform','cardimage','cardvalidity']);
    this.setGridColumnTypes(['Checkbox','String','String','String','String','String']);
    this.addGridDataService(this.obvirtualcardtemplateService);
    this.setGridTitle('obvirtualcardTemplateRoGrid.title');
  }
}
