import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { SelectedContactROGRIDHelper } from './selected-contact-ro-grid.helper';
import { NpsscontactviewingService } from '../npsscontactviewing-service/npsscontactviewing.service';

@Component({
 selector: 'selected-contact-ro-grid',
  templateUrl: './selected-contact-ro-grid.component.html',
  styleUrls: ['./selected-contact-ro-grid.component.scss'],
   providers : [ SelectedContactROGRIDHelper]
 })
export class SelectedContactROGRIDComponent extends BaseFpxROGridComponent< SelectedContactROGRIDHelper, SelectedContactROGRIDHelper> {
 constructor(
    protected selectedContactROGridHelper: SelectedContactROGRIDHelper,
    protected selectedContactROGridService: NpsscontactviewingService
  ) {
    super(selectedContactROGridHelper);
  }
                               
  protected override doPreInit(): void {
    this.addGridDataService(this.selectedContactROGridService);
  }
}
