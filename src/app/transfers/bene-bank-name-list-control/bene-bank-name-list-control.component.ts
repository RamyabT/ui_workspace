import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { BicBankService } from '../bicBank-service/bicBank.service';

@Component({
  selector: 'app-bene-bank-name-list-control',
  templateUrl: './bene-bank-name-list-control.component.html',
  styleUrls: ['./bene-bank-name-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BeneBankNameListControlComponent),
      multi: true,
    },
    BicBankService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneBankNameListControlComponent extends BaseFpxControlComponent {

  constructor(private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef,
    private bicBankService: BicBankService
  ) {
    super(controlContainer, changeDetectorRef);
  }

  protected override doPreInit(): void {
    this.addDependencies(['country']);
    this.addPKList(['country']);
    this.setDataSource(this.bicBankService);
    this.setDropdownMode('SEARCHABLE');
  }

}
