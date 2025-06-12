import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanTransactionsDtlsTmpltComponent } from './loan-transactions-dtls-tmplt.component';


describe('LoanTransactionsDtlsTmpltComponent', () => {
  let component: LoanTransactionsDtlsTmpltComponent;
  let fixture: ComponentFixture<LoanTransactionsDtlsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanTransactionsDtlsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanTransactionsDtlsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
