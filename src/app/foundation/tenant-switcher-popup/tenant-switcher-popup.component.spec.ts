import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSwitcherPopupComponent } from './tenant-switcher-popup.component';

describe('TenantSwitcherPopupComponent', () => {
  let component: TenantSwitcherPopupComponent;
  let fixture: ComponentFixture<TenantSwitcherPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantSwitcherPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSwitcherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
