import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailStopChequeDisplayFormComponent } from './retail-stopcheque-display-form.component';

describe('ViewCasaTransactionFormComponent', () => {
  let component: RetailStopChequeDisplayFormComponent;
  let fixture: ComponentFixture<RetailStopChequeDisplayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailStopChequeDisplayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailStopChequeDisplayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
