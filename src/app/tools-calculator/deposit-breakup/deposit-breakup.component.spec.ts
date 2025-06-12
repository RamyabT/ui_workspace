import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBreakupComponent } from './deposit-breakup.component';

describe('DepositBreakupComponent', () => {
  let component: DepositBreakupComponent;
  let fixture: ComponentFixture<DepositBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositBreakupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
