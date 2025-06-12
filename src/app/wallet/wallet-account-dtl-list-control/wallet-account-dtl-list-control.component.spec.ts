import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAccountDtlListControlComponent } from './wallet-account-dtl-list-control.component';

describe('WalletAccountDtlListControlComponent', () => {
  let component: WalletAccountDtlListControlComponent;
  let fixture: ComponentFixture<WalletAccountDtlListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletAccountDtlListControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletAccountDtlListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
