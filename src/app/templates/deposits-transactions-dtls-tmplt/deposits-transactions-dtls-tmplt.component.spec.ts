import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsTransactionsDtlsTmpltComponent } from './deposits-transactions-dtls-tmplt.component';

describe('DepositsTransactionsDtlsTmpltComponent', () => {
  let component: DepositsTransactionsDtlsTmpltComponent;
  let fixture: ComponentFixture<DepositsTransactionsDtlsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsTransactionsDtlsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsTransactionsDtlsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
