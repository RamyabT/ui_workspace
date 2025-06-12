import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChequeDepositHelpComponent } from './cheque-deposit-help.component';


describe('ChequeDepositHelpComponent', () => {
  let component: ChequeDepositHelpComponent;
  let fixture: ComponentFixture<ChequeDepositHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequeDepositHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequeDepositHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});