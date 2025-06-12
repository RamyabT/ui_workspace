import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewChoresComponent } from './member-view-chores.component';

describe('MemberViewChoresComponent', () => {
  let component: MemberViewChoresComponent;
  let fixture: ComponentFixture<MemberViewChoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberViewChoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberViewChoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
