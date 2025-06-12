import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { NpsscontactviewingService } from '../npsscontactviewing-service/npsscontactviewing.service';
import { NPSSRequestContactViewingROGRIDHelper } from './request-contact-list-ro-grid.helper';

@Component({
 selector: 'request-contact-list-ro-grid',
  templateUrl: './request-contact-list-ro-grid.component.html',
  styleUrls: ['./request-contact-list-ro-grid.component.scss'],
   providers : [ NPSSRequestContactViewingROGRIDHelper]
 })
export class NPSSRequestContactViewingROGRIDComponent extends BaseFpxROGridComponent< NPSSRequestContactViewingROGRIDHelper, NPSSRequestContactViewingROGRIDHelper> {
 constructor(
    protected nPSSContactViewingROGRIDHelper: NPSSRequestContactViewingROGRIDHelper,
    protected npsscontactviewingrogridService: NpsscontactviewingService
  ) {
    super(nPSSContactViewingROGRIDHelper);
  }
                               
  protected override doPreInit(): void {
    this.addGridDataService(this.npsscontactviewingrogridService);
  }
}
