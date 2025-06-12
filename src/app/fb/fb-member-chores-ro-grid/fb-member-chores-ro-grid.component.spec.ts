import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbMemberChoresRoGridComponent } from './fb-member-chores-ro-grid.component';

describe('FbMemberChoresRoGridComponent', () => {
  let component: FbMemberChoresRoGridComponent;
  let fixture: ComponentFixture<FbMemberChoresRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbMemberChoresRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbMemberChoresRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
