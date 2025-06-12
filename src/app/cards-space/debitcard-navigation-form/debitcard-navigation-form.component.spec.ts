import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebitcardNavigationFormComponent } from './debitcard-navigation-form.component';


describe('DebitcardNavigationFormComponent', () => {
  let component: DebitcardNavigationFormComponent;
  let fixture: ComponentFixture<DebitcardNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
