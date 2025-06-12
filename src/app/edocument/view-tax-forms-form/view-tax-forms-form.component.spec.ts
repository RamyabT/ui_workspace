import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTaxFormsFormComponent } from './view-tax-forms-form.component';



describe('ViewTaxFormsFormComponent', () => {
  let component: ViewTaxFormsFormComponent;
  let fixture: ComponentFixture<ViewTaxFormsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTaxFormsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaxFormsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
