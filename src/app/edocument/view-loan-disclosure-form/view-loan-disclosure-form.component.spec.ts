import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLoanDisclosureFormComponent } from './view-loan-disclosure-form.component';



describe('ViewLoanDisclosureFormComponent', () => {
  let component: ViewLoanDisclosureFormComponent;
  let fixture: ComponentFixture<ViewLoanDisclosureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanDisclosureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLoanDisclosureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
