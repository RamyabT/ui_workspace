import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { PfmMonthsService } from '../pfmmonths-service/pfm-months.service';

@Component({
  selector: 'app-pfm-months-list-control',
  templateUrl: './pfm-months-list-control.component.html',
  styleUrls: ['./pfm-months-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PfmMonthsListControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfmMonthsListControlComponent extends BaseFpxControlComponent {

  constructor(
    private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef,
    private _pfmMonthsService: PfmMonthsService
  ) {
    super(controlContainer, changeDetectorRef);
  }
  
  protected override doPreInit(): void {
    this.setDataSource(this._pfmMonthsService);
  }

}
