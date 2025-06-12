import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMemberAllowanceComponent } from './manage-member-allowance.component';

describe('ManageMemberAllowanceComponent', () => {
  let component: ManageMemberAllowanceComponent;
  let fixture: ComponentFixture<ManageMemberAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMemberAllowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMemberAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
