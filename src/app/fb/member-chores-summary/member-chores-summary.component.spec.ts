import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberChoresSummaryComponent } from './member-chores-summary.component';

describe('MemberChoresSummaryComponent', () => {
  let component: MemberChoresSummaryComponent;
  let fixture: ComponentFixture<MemberChoresSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberChoresSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberChoresSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
