import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAccountSummaryTmpltComponent } from './deposit-account-summary-tmplt.component';

describe('DepositAccountSummaryTmpltComponent', () => {
  let component: DepositAccountSummaryTmpltComponent;
  let fixture: ComponentFixture<DepositAccountSummaryTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositAccountSummaryTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositAccountSummaryTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
