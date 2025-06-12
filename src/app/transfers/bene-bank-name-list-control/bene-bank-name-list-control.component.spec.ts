import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneBankNameListControlComponent } from './bene-bank-name-list-control.component';

describe('BeneBankNameListControlComponent', () => {
  let component: BeneBankNameListControlComponent;
  let fixture: ComponentFixture<BeneBankNameListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneBankNameListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneBankNameListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
