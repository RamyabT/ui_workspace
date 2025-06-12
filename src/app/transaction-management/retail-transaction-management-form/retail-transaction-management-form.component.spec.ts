import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetailTransactionManagementForm } from './retail-transaction-management-form.component';


describe('ViewCasaTransactionFormComponent', () => {
  let component: RetailTransactionManagementForm;
  let fixture: ComponentFixture<RetailTransactionManagementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailTransactionManagementForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailTransactionManagementForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
