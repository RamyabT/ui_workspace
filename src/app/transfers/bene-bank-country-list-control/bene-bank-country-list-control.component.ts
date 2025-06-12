import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { BicCountryService } from '../bicCountry-service/bicCountry.service';

@Component({
  selector: 'app-bene-bank-country-list-control',
  templateUrl: './bene-bank-country-list-control.component.html',
  styleUrls: ['./bene-bank-country-list-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BeneBankCountryListControlComponent),
      multi: true,
    },
    BicCountryService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneBankCountryListControlComponent extends BaseFpxControlComponent {

  @Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
  
  constructor(private controlContainer: ControlContainer,
    changeDetectorRef: ChangeDetectorRef,
    private bicCountryService: BicCountryService
  ) {
    super(controlContainer, changeDetectorRef);
  }

  protected override doPreInit(): void {
    this.addPKList(['countryCode']);
    this.setDataSource(this.bicCountryService);
    this.setDropdownMode('SEARCHABLE');
  }

}
