import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNextAllowanceComponent } from './member-next-allowance.component';

describe('MemberNextAllowanceComponent', () => {
  let component: MemberNextAllowanceComponent;
  let fixture: ComponentFixture<MemberNextAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberNextAllowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberNextAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
