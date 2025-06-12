import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTranDtlsTmpltComponent } from './membership-tran-dtls-tmplt.component';

describe('MembershipTranDtlsTmpltComponent', () => {
  let component: MembershipTranDtlsTmpltComponent;
  let fixture: ComponentFixture<MembershipTranDtlsTmpltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipTranDtlsTmpltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipTranDtlsTmpltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
