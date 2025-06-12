import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteracProfileCreateStartFormComponent } from './interac-profile-create-start-form.component';

describe('InteracProfileCreateStartFormComponent', () => {
  let component: InteracProfileCreateStartFormComponent;
  let fixture: ComponentFixture<InteracProfileCreateStartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteracProfileCreateStartFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteracProfileCreateStartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
