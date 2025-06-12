import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNextAllowanceRoGridComponent } from './member-next-allowance-ro-grid.component';

describe('MemberNextAllowanceRoGridComponent', () => {
  let component: MemberNextAllowanceRoGridComponent;
  let fixture: ComponentFixture<MemberNextAllowanceRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberNextAllowanceRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberNextAllowanceRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
