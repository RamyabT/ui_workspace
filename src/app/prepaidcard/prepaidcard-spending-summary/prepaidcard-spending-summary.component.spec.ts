import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidcardSpendingSummaryComponent } from './prepaidcard-spending-summary.component';

describe('PrepaidcardSpendingSummaryComponent', () => {
  let component: PrepaidcardSpendingSummaryComponent;
  let fixture: ComponentFixture<PrepaidcardSpendingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidcardSpendingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidcardSpendingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
