import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailloansBreakupFormComponent } from './loans-breakup.component';

describe('DepositBreakupComponent', () => {
  let component: RetailloansBreakupFormComponent;
  let fixture: ComponentFixture<RetailloansBreakupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailloansBreakupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailloansBreakupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
