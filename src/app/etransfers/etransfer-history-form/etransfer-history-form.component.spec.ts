import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferSummaryFormComponent } from './transfer-summary-form.component';

describe('ViewCasaTransactionFormComponent', () => {
  let component: TransferSummaryFormComponent;
  let fixture: ComponentFixture<TransferSummaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferSummaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferSummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
