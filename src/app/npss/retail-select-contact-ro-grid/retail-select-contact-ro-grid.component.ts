import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { NpsscontactviewingService } from '../npsscontactviewing-service/npsscontactviewing.service';
import { RetailSelectContactROGRIDHelper } from './retail-select-contact-ro-grid.helper';

@Component({
 selector: 'app-retail-select-contact-ro-grid',
  templateUrl: './retail-select-contact-ro-grid.component.html',
  styleUrls: ['./retail-select-contact-ro-grid.component.scss'],
   providers : [ RetailSelectContactROGRIDHelper]
 })
export class RetailSelectContactROGRIDComponent extends BaseFpxROGridComponent< RetailSelectContactROGRIDHelper, RetailSelectContactROGRIDHelper> {
 constructor(
    protected retailSelectContactROGRIDHelper: RetailSelectContactROGRIDHelper,
    protected npsscontactviewingrogridService: NpsscontactviewingService
  ) {
    super(retailSelectContactROGRIDHelper);
  }
                               
  protected override doPreInit(): void {
    this.addGridDataService(this.npsscontactviewingrogridService);
  }
}
