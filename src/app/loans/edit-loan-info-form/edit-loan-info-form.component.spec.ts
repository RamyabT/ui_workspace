import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLoanInfoFormFormComponent } from './edit-loan-info-form.component';

describe('EditLoanInfoFormFormComponent', () => {
  let component: EditLoanInfoFormFormComponent;
  let fixture: ComponentFixture<EditLoanInfoFormFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLoanInfoFormFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoanInfoFormFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
