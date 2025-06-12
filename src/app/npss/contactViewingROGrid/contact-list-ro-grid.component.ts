import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {NPSSContactViewingROGRIDHelper } from './contact-list-ro-grid.helper';
import { NpsscontactviewingService } from '../npsscontactviewing-service/npsscontactviewing.service';

@Component({
 selector: 'contact-list-ro-grid',
  templateUrl: './contact-list-ro-grid.component.html',
  styleUrls: ['./contact-list-ro-grid.component.scss'],
   providers : [ NPSSContactViewingROGRIDHelper]
 })
export class NPSSContactViewingROGRIDComponent extends BaseFpxROGridComponent< NPSSContactViewingROGRIDHelper, NPSSContactViewingROGRIDHelper> {
 constructor(
    protected nPSSContactViewingROGRIDHelper: NPSSContactViewingROGRIDHelper,
    protected npsscontactviewingrogridService: NpsscontactviewingService
  ) {
    super(nPSSContactViewingROGRIDHelper);
  }
                               
  protected override doPreInit(): void {
    this.addGridDataService(this.npsscontactviewingrogridService);
  }
}
