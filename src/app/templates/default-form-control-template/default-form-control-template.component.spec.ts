import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFormControlTemplateComponent } from './default-form-control-template.component';

describe('DefaultFormControlTemplateComponent', () => {
  let component: DefaultFormControlTemplateComponent;
  let fixture: ComponentFixture<DefaultFormControlTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultFormControlTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultFormControlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
