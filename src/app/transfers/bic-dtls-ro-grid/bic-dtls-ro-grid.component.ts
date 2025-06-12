import { Component, OnInit } from '@angular/core';
import { BicDtlsRoGridHelper } from './bic-dtls-ro-grid.helper';
import { BaseFpxROGridComponent } from '@fpx/core';
import { BicBranchService } from '../bicBranch-service/bicBranch.service';

@Component({
  selector: 'app-bic-dtls-ro-grid',
  templateUrl: './bic-dtls-ro-grid.component.html',
  styleUrls: ['./bic-dtls-ro-grid.component.scss'],
  providers: [BicDtlsRoGridHelper, BicBranchService]
})
export class BicDtlsRoGridComponent extends BaseFpxROGridComponent< any, BicDtlsRoGridHelper> {

  constructor(
    protected bicDtlsRoGridHelper: BicDtlsRoGridHelper,
    private bicBranchService: BicBranchService
  ) {
    super(bicDtlsRoGridHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders([]);
    this.setGridIdentifiers([]);
    this.setGridColumnTypes([]);
    this.addGridDataService(this.bicBranchService);
    this.setGridTitle('');
  }

}
