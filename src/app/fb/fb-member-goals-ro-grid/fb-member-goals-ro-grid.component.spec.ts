import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbMemberGoalsRoGridComponent } from './fb-member-goals-ro-grid.component';

describe('FbMemberGoalsRoGridComponent', () => {
  let component: FbMemberGoalsRoGridComponent;
  let fixture: ComponentFixture<FbMemberGoalsRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbMemberGoalsRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbMemberGoalsRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
