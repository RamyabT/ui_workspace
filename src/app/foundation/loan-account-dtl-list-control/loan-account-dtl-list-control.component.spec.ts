import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountDtlListControlComponent } from './loan-account-dtl-list-control.component';

describe('LoanAccountDtlListControlComponent', () => {
  let component: LoanAccountDtlListControlComponent;
  let fixture: ComponentFixture<LoanAccountDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccountDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAccountDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
