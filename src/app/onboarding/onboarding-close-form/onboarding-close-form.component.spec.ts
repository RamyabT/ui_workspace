import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingCloseFormComponent } from './onboarding-close-form.component';



describe('OnboardingCloseFormComponent', () => {
  let component: OnboardingCloseFormComponent;
  let fixture: ComponentFixture<OnboardingCloseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingCloseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingCloseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
