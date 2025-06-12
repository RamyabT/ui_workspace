import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGridTemplateComponent } from './display-grid-template.component';

describe('DisplayGridTemplateComponent', () => {
  let component: DisplayGridTemplateComponent;
  let fixture: ComponentFixture<DisplayGridTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayGridTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayGridTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
