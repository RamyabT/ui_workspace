import { ComponentFixture, TestBed } from '@angular/core/testing';
import { radioButtonTemplateComponent } from './radio-button-template.component';

describe('radioButtonTemplateComponent', () => {
  let component: radioButtonTemplateComponent;
  let fixture: ComponentFixture<radioButtonTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ radioButtonTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(radioButtonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
