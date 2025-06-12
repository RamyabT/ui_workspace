import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanTransactionFormComponent } from './view-loan-transaction-form.component';

describe('ViewLoanTransactionFormComponent', () => {
  let component: ViewLoanTransactionFormComponent;
  let fixture: ComponentFixture<ViewLoanTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLoanTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
