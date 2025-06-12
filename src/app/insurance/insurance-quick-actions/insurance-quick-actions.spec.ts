import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceQuickActionsComponent } from './insurance-quick-actions.component';

describe('InsuranceQuickActionsComponent', () => {
  let component: InsuranceQuickActionsComponent;
  let fixture: ComponentFixture<InsuranceQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
