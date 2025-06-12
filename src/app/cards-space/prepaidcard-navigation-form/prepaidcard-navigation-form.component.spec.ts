import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrepaidcardNavigationFormComponent } from './prepaidcard-navigation-form.component';


describe('PrepaidcardNavigationFormComponent', () => {
  let component: PrepaidcardNavigationFormComponent;
  let fixture: ComponentFixture<PrepaidcardNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidcardNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidcardNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
