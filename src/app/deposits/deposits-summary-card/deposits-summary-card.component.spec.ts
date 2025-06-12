import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsSummaryCardComponent } from './deposits-summary-card.component';

describe('DepositsSummaryCardComponent', () => {
  let component: DepositsSummaryCardComponent;
  let fixture: ComponentFixture<DepositsSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
