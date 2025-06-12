import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGoalsComponent } from './member-goals.component';

describe('MemberGoalsComponent', () => {
  let component: MemberGoalsComponent;
  let fixture: ComponentFixture<MemberGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
