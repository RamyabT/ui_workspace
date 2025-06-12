import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailScheduleBillsFormComponent } from './retail-schedule-bills-form.component';

describe('ViewCasaTransactionFormComponent', () => {
  let component: RetailScheduleBillsFormComponent;
  let fixture: ComponentFixture<RetailScheduleBillsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailScheduleBillsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailScheduleBillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
