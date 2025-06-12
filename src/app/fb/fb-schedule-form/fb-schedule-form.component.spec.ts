import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbScheduleFormComponent } from './fb-schedule-form.component';

describe('FbScheduleFormComponent', () => {
  let component: FbScheduleFormComponent;
  let fixture: ComponentFixture<FbScheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbScheduleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
