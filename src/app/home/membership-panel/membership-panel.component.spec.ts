import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipPanelComponent } from './membership-panel.component';

describe('MembershipPanelComponent', () => {
  let component: MembershipPanelComponent;
  let fixture: ComponentFixture<MembershipPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
