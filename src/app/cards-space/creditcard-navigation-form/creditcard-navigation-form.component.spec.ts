import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditcardNavigationFormComponent } from './creditcard-navigation-form.component';


describe('CreditcardNavigationFormComponent', () => {
  let component: CreditcardNavigationFormComponent;
  let fixture: ComponentFixture<CreditcardNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
