import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowHomeComponent } from './workflow-home.component';

describe('WorkflowHomeComponent', () => {
  let component: WorkflowHomeComponent;
  let fixture: ComponentFixture<WorkflowHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
