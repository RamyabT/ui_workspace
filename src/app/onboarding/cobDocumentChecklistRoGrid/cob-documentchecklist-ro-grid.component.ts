import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {CobDocumentChecklistRoGridHelper } from './cob-documentchecklist-ro-grid.helper';
import { DocumentchecklistService } from '../documentchecklist-service/documentchecklist.service';
import { Documentchecklist } from '../documentchecklist-service/documentchecklist.model';

@Component({
 selector: 'app-cob-documentchecklist-ro-grid',
  templateUrl: './cob-documentchecklist-ro-grid.component.html',
  styleUrls: ['./cob-documentchecklist-ro-grid.component.scss'],
   providers : [ CobDocumentChecklistRoGridHelper]
 })
export class CobDocumentChecklistRoGridComponent extends BaseFpxROGridComponent< Documentchecklist, CobDocumentChecklistRoGridHelper> {
 constructor(
    protected cobDocumentChecklistRoGridHelper: CobDocumentChecklistRoGridHelper,
    protected documentchecklistService: DocumentchecklistService
  ) {
    super(cobDocumentChecklistRoGridHelper);
  }
               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','CobDocumentChecklistRoGrid.documents.label']);
    this.setGridIdentifiers(['SELECT','documents']);
    this.setGridColumnTypes(['Checkbox','String']);
    this.addGridDataService(this.documentchecklistService);
    this.setGridTitle('CobDocumentChecklistRoGrid.title');
  }
}
