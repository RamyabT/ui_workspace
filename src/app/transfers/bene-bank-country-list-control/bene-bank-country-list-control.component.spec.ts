import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneBankCountryListControlComponent } from './bene-bank-country-list-control.component';

describe('BeneBankCountryListControlComponent', () => {
  let component: BeneBankCountryListControlComponent;
  let fixture: ComponentFixture<BeneBankCountryListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneBankCountryListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneBankCountryListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
