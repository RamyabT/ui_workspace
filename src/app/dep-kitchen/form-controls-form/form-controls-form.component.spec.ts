import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlsFormComponent } from './form-controls-form.component';

describe('FormControlsFormComponent', () => {
  let component: FormControlsFormComponent;
  let fixture: ComponentFixture<FormControlsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormControlsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
