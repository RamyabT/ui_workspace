import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepositsTransactionFormComponent } from './view-deposits-transaction-form.component';

describe('ViewDepositsTransactionFormComponent', () => {
  let component: ViewDepositsTransactionFormComponent;
  let fixture: ComponentFixture<ViewDepositsTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepositsTransactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDepositsTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
