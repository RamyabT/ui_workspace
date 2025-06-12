import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGoalViewDetailsComponent } from './member-goal-view-details.component';

describe('MemberGoalViewDetailsComponent', () => {
  let component: MemberGoalViewDetailsComponent;
  let fixture: ComponentFixture<MemberGoalViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberGoalViewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberGoalViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
