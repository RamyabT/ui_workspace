import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAccountDtlListControlComponent } from './deposit-account-dtl-list-control.component';

describe('DepositAccountDtlListControlComponent', () => {
  let component: DepositAccountDtlListControlComponent;
  let fixture: ComponentFixture<DepositAccountDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositAccountDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositAccountDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
