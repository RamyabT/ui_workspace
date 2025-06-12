import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPendingChoresComponent } from './member-pending-chores.component';

describe('MemberPendingChoresComponent', () => {
  let component: MemberPendingChoresComponent;
  let fixture: ComponentFixture<MemberPendingChoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPendingChoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPendingChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
