import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewGoalsComponent } from './member-view-goals.component';

describe('MemberViewGoalsComponent', () => {
  let component: MemberViewGoalsComponent;
  let fixture: ComponentFixture<MemberViewGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberViewGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberViewGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
